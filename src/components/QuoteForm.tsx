"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, FileUp, Loader2, Lock, Send, X } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";
import { deadlineOptions, serviceOptions } from "@/lib/content";

const noop = () => () => {};
const readServiceParam = () => {
  const s = new URLSearchParams(window.location.search).get("service") ?? "";
  return serviceOptions.includes(s) ? s : "";
};

type Errors = Partial<Record<"name" | "email" | "service" | "details" | "files", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const MAX_FILES = 5;
const MAX_TOTAL_MB = 20;
const ACCEPT = ".pdf,.dwg,.dxf,.dwf,.zip,.ifc,.png,.jpg,.jpeg";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  // A service passed as ?service=… (from service CTAs) is pre-selected until the user picks one.
  const urlService = useSyncExternalStore(noop, readServiceParam, () => "");
  const [picked, setPicked] = useState<string | null>(null);
  const service = picked ?? urlService;
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, MAX_FILES);
    const total = next.reduce((s, f) => s + f.size, 0) / 1024 / 1024;
    if (total > MAX_TOTAL_MB) {
      setErrors((e) => ({ ...e, files: `Files exceed ${MAX_TOTAL_MB} MB total — paste a Dropbox / Drive link instead.` }));
      return;
    }
    setErrors((e) => ({ ...e, files: undefined }));
    setFiles(next);
  };

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    if (!String(fd.get("name") ?? "").trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email") ?? ""))) e.email = "Please enter a valid email";
    if (!fd.get("service")) e.service = "Please choose a service";
    if (String(fd.get("details") ?? "").trim().length < 10) e.details = "Tell us a little about the project";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) return;

    fd.delete("files");
    files.forEach((f) => fd.append("files", f));
    fd.set("source", compact ? "home-quick-quote" : "contact-page");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const reset = () => {
    formRef.current?.reset();
    setFiles([]);
    setPicked("");
    setErrors({});
    setStatus("idle");
  };

  const field =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-ink outline-none transition placeholder:text-mist focus:border-signal focus:ring-4 focus:ring-signal/20";
  const border = (k: keyof Errors) => (errors[k] ? "border-flare" : "border-line");

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 80 80" className="h-24 w-24">
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#14e0c4" strokeWidth="4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
              <motion.path d="M24 41 L35 52 L57 29" fill="none" stroke="#14e0c4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
            </svg>
            <h3 className="font-display mt-6 text-2xl font-bold text-ink">Request Received!</h3>
            <p className="mt-3 max-w-sm text-muted">
              A senior estimator will reply with your flat quote within 1 business hour. Check your inbox (and spam folder,
              just in case).
            </p>
            <button onClick={reset} className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-signal">
              Send Another Request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="space-y-5"
          >
            {/* honeypot */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required error={errors.name}>
                <input name="name" autoComplete="name" placeholder="John Carter" className={`${field} ${border("name")}`} />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input name="email" type="email" autoComplete="email" placeholder="john@company.com" className={`${field} ${border("email")}`} />
              </Field>
              <Field label="Phone">
                <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 123 4567" className={`${field} border-line`} />
              </Field>
              <Field label="Service Needed" required error={errors.service}>
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setPicked(e.target.value)}
                  className={`${field} ${border("service")} ${service ? "" : "text-mist"}`}
                >
                  <option value="">Select a service…</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o} className="text-ink">
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              {!compact && (
                <Field label="Bid Deadline" group className="sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {deadlineOptions.map((d, i) => (
                      <label key={d} className="cursor-pointer">
                        <input type="radio" name="deadline" value={d} defaultChecked={i === 2} className="peer sr-only" />
                        <span className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-signal/30">
                          {d}
                        </span>
                      </label>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            {!compact && (
              <Field label="Upload Plans (Optional)" group error={errors.files}>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  onClick={() => fileInput.current?.click()}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInput.current?.click()}
                  role="button"
                  tabIndex={0}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-7 text-center transition ${
                    drag ? "scale-[1.01] border-signal bg-signal/10" : "border-line bg-paper hover:border-signal/60"
                  }`}
                >
                  <motion.span
                    animate={drag ? { y: -6, scale: 1.1 } : { y: [0, -4, 0] }}
                    transition={drag ? { type: "spring" } : { duration: 2.4, repeat: Infinity }}
                    className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-ink text-signal"
                  >
                    <FileUp className="h-5 w-5" />
                  </motion.span>
                  <p className="mt-3 font-semibold text-ink">Click or drag & drop files</p>
                  <p className="mt-1 text-xs text-muted">
                    PDF, DWG, DXF, ZIP, IFC — up to {MAX_FILES} files / {MAX_TOTAL_MB} MB. Or paste a Dropbox / Drive link below.
                  </p>
                  <input
                    ref={fileInput}
                    type="file"
                    name="files"
                    multiple
                    accept={ACCEPT}
                    className="hidden"
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-3 space-y-2 overflow-hidden">
                      {files.map((f, i) => (
                        <motion.li
                          key={f.name + i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between rounded-xl bg-paper px-4 py-2.5 text-sm"
                        >
                          <span className="truncate font-medium text-ink">{f.name}</span>
                          <span className="ml-3 flex shrink-0 items-center gap-3 text-xs text-muted">
                            {(f.size / 1024 / 1024).toFixed(1)} MB
                            <button
                              type="button"
                              onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))}
                              aria-label={`Remove ${f.name}`}
                              className="grid h-6 w-6 place-items-center rounded-full hover:bg-flare hover:text-white"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </Field>
            )}

            <Field label="Project Details" required error={errors.details}>
              <textarea
                name="details"
                rows={compact ? 3 : 5}
                placeholder="Project type, location, approximate size, plan link (Procore / Dropbox / Drive)…"
                className={`${field} ${border("details")} resize-y`}
              />
            </Field>

            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl bg-flare/10 px-4 py-3 text-sm text-flare">
                <AlertCircle className="h-4 w-4 shrink-0" /> {message}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-4 font-semibold text-white transition hover:shadow-[0_0_40px_-8px_var(--color-signal)] disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-signal to-signal-deep transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2 group-hover:text-ink">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    {compact ? "Get My Free Quote" : "Send Request"} <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </span>
            </button>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-deep" />
              By submitting, you agree to be contacted about your quote. Your plans and data stay 100% confidential — NDA
              available on request.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  group = false,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  /** wraps several controls (radios, dropzone) — rendered without a <label> so clicks don't get re-targeted */
  group?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const caption = (
    <>
      {label} {required && <span className="text-flare">*</span>}
    </>
  );
  return (
    <div className={className}>
      {group ? (
        <div role="group" aria-label={label} className="mb-2 text-sm font-semibold text-ink">
          {caption}
          <div className="mt-2 font-normal">{children}</div>
        </div>
      ) : (
        <label className="mb-2 block text-sm font-semibold text-ink">
          {caption}
          <span className="mt-2 block font-normal">{children}</span>
        </label>
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-xs font-medium text-flare"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
