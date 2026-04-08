import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Origin Studios privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main id="main" className="min-h-screen bg-bg text-primary px-8 md:px-16 py-32 max-w-3xl mx-auto">
      <h1 className="font-clash text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
        Privacy Policy
      </h1>
      <div className="font-satoshi text-sm text-[#FFFBF4]/70 leading-relaxed space-y-6">
        <p><strong>Last updated:</strong> April 2026</p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Information We Collect</h2>
        <p>
          When you contact us via email or our contact form, we collect your name, email address, and any information
          you choose to share about your project. We do not use cookies for tracking. Our site uses Vercel Analytics
          for anonymous, aggregated performance metrics only.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">How We Use Your Information</h2>
        <p>
          We use the information you provide solely to respond to your inquiry, prepare project proposals, and deliver
          our services. We do not sell, rent, or share your personal information with third parties except as required
          to deliver our services (e.g., hosting providers, payment processors).
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Data Retention</h2>
        <p>
          We retain your contact information for the duration of our business relationship and for a reasonable period
          afterward for follow-up purposes. You may request deletion of your data at any time by emailing{" "}
          <a href="mailto:talk@originstudios.dev" className="text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors">
            talk@originstudios.dev
          </a>.
        </p>

        <h2 className="font-clash text-xl font-bold uppercase tracking-tight text-[#D8CFBC] mt-8">Contact</h2>
        <p>
          For any privacy-related questions, contact us at{" "}
          <a href="mailto:talk@originstudios.dev" className="text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors">
            talk@originstudios.dev
          </a>.
        </p>
      </div>
    </main>
  );
}
