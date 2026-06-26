import './globals.css';

// Fonts (Sora + DM Mono) are self-hosted via @font-face in globals.css,
// shipped with the design export — no next/font needed.

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
      <body>{children}</body>
    </html>
  );
}
