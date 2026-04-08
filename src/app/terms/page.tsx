import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Origin Studios terms of service — engagement terms, intellectual property, and liability.",
};

export default function TermsPage() {
  return (
    <main id="main" className="min-h-screen bg-bg text-primary px-8 md:px-16 py-32 max-w-3xl mx-auto">
      <h1 className="font-clash text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
        Terms of Service
      </h1>
      <div className="font-satoshi text-sm text-[#FFFBF4]/70 leading-relaxed space-y-6">
        <p><strong>Last updated:</strong> April 2026</p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Services</h2>
        <p>
          Origin Studios provides custom website development, SaaS platform development, motion design, 3D web
          development, and AI search optimization (GEO/AEO) services. All project scopes, timelines, and deliverables
          are defined in individual project agreements.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Intellectual Property</h2>
        <p>
          Upon full payment, all custom code, designs, and assets created for your project are transferred to you.
          Origin Studios retains the right to showcase the work in our portfolio unless otherwise agreed in writing.
          Third-party libraries and tools used in your project retain their respective licenses.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Payment Terms</h2>
        <p>
          Projects require a 50% deposit before work begins, with the remaining 50% due upon delivery. All prices
          are quoted in INR unless otherwise specified. Late payments may incur a hold on project deliverables.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Limitation of Liability</h2>
        <p>
          Origin Studios is not liable for any indirect, incidental, or consequential damages arising from the use
          of our services or deliverables. Our total liability is limited to the amount paid for the specific
          project in question.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:talk@originstudios.dev" className="text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors">
            talk@originstudios.dev
          </a>.
        </p>
      </div>
    </main>
  );
}
