import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms govern your use of our website and the estimating services provided by ${site.legalName}. By requesting a quote or engaging our services, you agree to them.`}
      sections={[
        {
          title: "Our services",
          body: [
            "We provide construction cost estimating and quantity takeoff services across all 50 US states & Canada. Every engagement begins with a flat, written quote that you approve before we start work.",
          ],
        },
        {
          title: "Quotes & payment",
          body: [
            [
              "Quotes are based on the scope, plans and deadline you provide. Material changes to scope may change the price and timeline.",
              "Payment terms are stated on your invoice and are due before or on delivery unless otherwise agreed.",
            ],
          ],
        },
        {
          title: "Revisions",
          body: [
            "Free revisions are included as described for your selected package. Revisions arising from plan changes or added scope may be quoted separately.",
          ],
        },
        {
          title: "Accuracy & disclaimer",
          body: [
            "Our estimates are prepared with professional care using industry tools and RSMeans data, and are intended as a decision-making guide. Final bid pricing, market fluctuations and site conditions remain your responsibility. Estimates are provided without warranty of a specific bid outcome.",
          ],
        },
        {
          title: "Confidentiality",
          body: [
            "We keep your plans and pricing confidential and will sign your NDA on request. You are responsible for ensuring you have the right to share any plans or documents you send us.",
          ],
        },
        {
          title: "Intellectual property",
          body: [
            `Deliverables you pay for are yours to use for your project. Website content and branding remain the property of ${site.legalName}.`,
          ],
        },
        {
          title: "Limitation of liability",
          body: [
            "To the extent permitted by law, our total liability for any claim relating to our services is limited to the fees paid for the specific estimate at issue.",
          ],
        },
      ]}
    />
  );
}
