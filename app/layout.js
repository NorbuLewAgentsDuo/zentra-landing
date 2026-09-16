import './globals.css';
import Script from 'next/script';

// Analytics stays off unless a production deployment explicitly supplies an ID.
const clarityId = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CLARITY_ID : '';

// Production URL drives canonical + Open Graph absolute image URLs.
// Override in Vercel via NEXT_PUBLIC_SITE_URL. TODO: bake the real domain here.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentra-landing.vercel.app';
const title = 'Zentra MY | Enquiry-to-Consultation Systems';
const description =
  'Zentra helps businesses in Klang Valley qualify enquiries, follow up consistently, coordinate consultations and track attendance.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  icons: { icon: '/assets/zentralogo.png' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Zentra MY',
    title,
    description,
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export const viewport = {
  themeColor: '#050406',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      {clarityId ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
    </html>
  );
}
