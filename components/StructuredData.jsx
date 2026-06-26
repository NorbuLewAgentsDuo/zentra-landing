import { siteUrl, whatsappBase } from '@/lib/config';

// FAQ content mirrors the on-page FAQ section (keep in sync if the copy changes).
const FAQS = [
  {
    q: "Isn't this just a chatbot?",
    a: 'No. A chatbot answers a few canned questions. Zentra is a full lead system — it replies, qualifies, nurtures, alerts you, and shows everything in a live dashboard. The auto-reply is one small part of what you’re getting.',
  },
  {
    q: 'Why not just hire an assistant or VA?',
    a: "A VA sleeps, takes leave, and still can't reply in 60 seconds at 11pm. Zentra runs 24/7, never forgets a follow-up, and costs less than a part-time hire — with none of the managing, training or turnover.",
  },
  {
    q: 'Will it sound robotic to my leads?',
    a: 'We train it on your listings, your tone and the questions you actually get. Most leads assume they’re chatting with your team — it just happens to reply instantly, every time.',
  },
  {
    q: 'Is my WhatsApp and client data safe?',
    a: 'Yes. It runs on your own number and accounts, your data stays yours, and nothing is shared or sold. You keep full control — and can step into any conversation the moment you want to.',
  },
  {
    q: 'I already pay for respond.io / Wati. Do I scrap it?',
    a: 'No — we can build on top of it. The tool was never the problem; running it daily is. We take that off your plate entirely and add the outreach, content and dashboard those tools don’t.',
  },
  {
    q: "What's the catch with the 60-second guarantee?",
    a: 'None. We control reply speed, not you. If we ever miss 60 seconds across a month, that month is free. We can only promise it because the system — not your schedule — does the replying.',
  },
];

export default function StructuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zentra MY',
    description:
      'Done-for-you AI lead system for Malaysian property agents. Every enquiry answered in 60 seconds, qualified, and followed up automatically.',
    url: siteUrl,
    areaServed: { '@type': 'Country', name: 'Malaysia' },
    address: { '@type': 'PostalAddress', addressLocality: 'Kuala Lumpur', addressCountry: 'MY' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: whatsappBase,
      availableLanguage: ['en', 'ms'],
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}
