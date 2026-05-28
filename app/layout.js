import { Sora, DM_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Zentra — Done-for-you AI Lead Conversion System',
  description:
    'Zentra contacts new leads in under 60 seconds, qualifies them, and books appointments — automatically. Built for B2C service businesses.',
  icons: { icon: '/assets/zentralogo.png' },
};

export const viewport = {
  themeColor: '#040043',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
