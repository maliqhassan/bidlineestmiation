import nodemailer from "nodemailer";
import { serviceOptions } from "@/lib/content";
import { site } from "@/lib/site";

const MAX_FILES = 5;
// Vercel rejects request bodies over ~4.5 MB, so keep attachments under that
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid submission." }, 400);
  }

  // Bots fill the hidden field; pretend success so they don't retry.
  if (String(fd.get("company_website") ?? "")) return json({ ok: true });

  const get = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 5000);
  const data = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    service: get("service"),
    deadline: get("deadline"),
    details: get("details"),
    source: get("source"),
  };

  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !serviceOptions.includes(data.service) || data.details.length < 10) {
    return json({ ok: false, error: "Please complete the required fields." }, 422);
  }

  const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const total = files.reduce((s, f) => s + f.size, 0);
  if (files.length > MAX_FILES || total > MAX_TOTAL_BYTES) {
    return json({ ok: false, error: "Attachments are too large — please share a Dropbox / Drive link instead." }, 413);
  }

  // Trimmed: values pasted into the Vercel dashboard often carry stray spaces/newlines
  const env = (key: string) => process.env[key]?.trim() || undefined;
  const [SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM] = [
    "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO", "CONTACT_FROM",
  ].map(env);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Names only — never log secret values. Shows up in Vercel → Logs.
    const missing = (["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const).filter((k) => !env(k));
    console.error(`[contact] Missing environment variable(s): ${missing.join(", ")}. Add them for the Production environment in Vercel and redeploy.`);
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] SMTP not configured — submission logged only:", { ...data, files: files.map((f) => f.name) });
      return json({ ok: true, dev: true });
    }
    return json({ ok: false, error: `Our form is temporarily unavailable — please call ${site.phone} or email ${site.emails[0]}.` }, 503);
  }

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Service", data.service],
    ["Deadline", data.deadline || "—"],
    ["Form", data.source || "—"],
  ];

  const html = `
    <h2 style="font-family:sans-serif">New quote request</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px;color:#5f6b77">${k}</td><td style="padding:6px 12px"><b>${escape(v)}</b></td></tr>`).join("")}
    </table>
    <h3 style="font-family:sans-serif">Project details</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escape(data.details)}</p>`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      // Hostinger (and most providers) require the sender to be the authenticated mailbox
      from: CONTACT_FROM || { name: `${site.name} Website`, address: SMTP_USER },
      to: CONTACT_TO || site.emails[0],
      replyTo: { name: data.name, address: data.email },
      subject: `Quote request: ${data.service} — ${data.name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${data.details}`,
      html,
      attachments: await Promise.all(
        files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) })),
      ),
    });

    return json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return json({ ok: false, error: `We couldn't send your request. Please call ${site.phone} or email ${site.emails[0]}.` }, 502);
  }
}
