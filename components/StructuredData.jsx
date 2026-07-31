import { siteUrl, whatsappBase } from '@/lib/config';

// FAQ content mirrors the on-page FAQ section (keep in sync if the copy changes).
const FAQS = [
  {
    q: "Isn’t this just a chatbot?",
    a: "A chatbot answers questions. This qualifies on budget, area, type and timeline, keeps following up for months while a buyer decides, works your dormant leads back into the pipeline, books the viewing, and hands you a summary. The auto-reply is the smallest part of it.",
  },
  {
    q: "Why not just hire an assistant or VA?",
    a: "A VA is inconsistent, off at night, needs training and eventually leaves — and you have to manage them. The bigger issue is that follow-up over a six-month buying window is exactly the kind of work humans quietly drop. This is repeatable, always on, and reports back what actually happened.",
  },
  {
    q: "I already use a WhatsApp AI tool. Do I scrap it?",
    a: "Not necessarily. The tool was never really the problem — several Malaysian tools connect to WhatsApp now. Configuring it, running it daily, and knowing whether it’s working is the problem. That’s what we take over, plus the dormant-lead revival and the measured report they don’t give you.",
  },
  {
    q: "Will it sound robotic to my leads?",
    a: "We build the knowledge base from your listings, your FAQs and your actual past WhatsApp answers — including your never-say rules. And you tell us on the call what you’d never trust an AI to say to a client. Anything in that list gets escalated to you instead of answered.",
  },
  {
    q: "Is my WhatsApp and client data safe? Will my number get banned?",
    a: "It runs on your own number and accounts, and your data stays yours. On dormant-lead revival specifically: messages go out from your number under your consent rules and at a controlled pace, precisely because blasting a fresh number is what gets numbers banned. You can step into any conversation at any moment.",
  },
  {
    q: "What if it doesn’t work?",
    a: "Then it costs us, not you. Late to launch, half the implementation fee comes back. Any agreed lead that got no response and no follow-up in the 30-day report, that month is free. At 200+ valid leads, no qualified viewing in 30 days and we keep running it at no monthly fee until there is one. What we don’t guarantee is closed deals — we improve the process, you still have to sell.",
  },
  {
    q: "Why is there a 200-lead minimum?",
    a: "Because below that, this genuinely won’t pay for itself and we’d rather say so now than take your money. The system recovers value from leads you already have. If you don’t have the volume yet, your problem is lead generation, not lead handling — different problem, different fix.",
  },
  {
    q: "How much of my time does this take?",
    a: "Access, your property info, calendar availability, and a human to pick up when a lead is escalated. You build nothing and configure nothing. The two-week hybrid tuning period after go-live is us watching and adjusting, not you doing homework.",
  },
];


export default function StructuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zentra MY',
    description:
      'Done-for-you lead-to-viewing system for Malaysian property agents. Zentra replies on WhatsApp, qualifies, follows up across the full decision cycle, revives dormant leads, and books viewings.',
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
