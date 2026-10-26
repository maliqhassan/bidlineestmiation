import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`${site.legalName} ("we", "us") respects your privacy. This policy explains what we collect when you use our website and how we handle it.`}
      sections={[
        {
          title: "Information we collect",
          body: [
            [
              "Details you submit through our quote form: name, email, phone, service needed, deadline, project details and any plan files or links you provide.",
              "Usage data collected automatically by analytics (e.g. pages viewed, approximate location, device/browser) to improve the site.",
            ],
          ],
        },
        {
          title: "How we use it",
          body: [
            [
              "To prepare and send your quote, communicate about your project, and deliver your estimate.",
              "To operate, secure and improve our website and services.",
            ],
          ],
        },
        {
          title: "Confidentiality & file retention",
          body: [
            "Your plans, pricing and bid strategy are treated as confidential. We sign an NDA on request at no charge, we never sell your information to third parties, and project files are deleted from our servers 30 days after delivery on request.",
          ],
        },
        {
          title: "Sharing",
          body: [
            "We share data only with service providers that help us operate (e.g. email delivery, form processing, analytics) under confidentiality obligations, or where required by law.",
          ],
        },
        {
          title: "Your choices",
          body: [
            `You may request access to, correction of, or deletion of your personal data at any time by emailing ${site.emails.join(" or ")}.`,
          ],
        },
      ]}
    />
  );
}
