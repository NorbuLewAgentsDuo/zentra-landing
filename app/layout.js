import './globals.css';

// Sora + DM Mono are self-hosted via @font-face in globals.css. The newest
// design also uses Archivo (the .z-disp display face), which isn't bundled —
// it's loaded from Google Fonts via the <link> in the layout head below.

// Production URL drives canonical + Open Graph absolute image URLs.
// Override in Vercel via NEXT_PUBLIC_SITE_URL. TODO: bake the real domain here.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentra-landing.vercel.app';
const title = 'Zentra MY: Never lose another lead';
const description =
  'Done-for-you AI lead system for Malaysian property agents. Every enquiry answered in 60 seconds, qualified, and followed up automatically — you just close.';

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
    images: [{ url: '/assets/zentralogo.png', width: 512, height: 512, alt: 'Zentra MY' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/zentralogo.png'],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
