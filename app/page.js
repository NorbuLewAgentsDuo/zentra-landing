import LandingPage from '@/components/LandingPage';
import { faqs } from '@/lib/siteContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentra-landing.vercel.app';

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#business`,
        name: 'Zentra MY',
        url: siteUrl,
        areaServed: 'Klang Valley, Malaysia',
        description:
          'Zentra Relay replies to ad enquiries in seconds, follows up with people who go quiet and books them into the calendar, for businesses running Meta ads in Klang Valley.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPage pilotDeadline={process.env.PILOT_APPLICATION_DEADLINE || null} pilotDeadlineLabel={process.env.PILOT_DEADLINE_LABEL || null} />
    </>
  );
}
