import './globals.css';
import Script from 'next/script';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-display' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

// Analytics stays off unless a production deployment explicitly supplies an ID.
const clarityId = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CLARITY_ID : '';

// Production URL drives canonical + Open Graph absolute image URLs.
// Override in Vercel via NEXT_PUBLIC_SITE_URL. TODO: bake the real domain here.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentra-landing.vercel.app';
const title = 'Zentra MY | Free Enquiry Audit for businesses running Meta ads';
const description =
  'We mystery-shopped 18 Klang Valley businesses: 13 never followed up. Get a free Enquiry Audit, then let Zentra Relay reply, chase and book your ad enquiries.';

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
  themeColor: '#F7F5FC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
