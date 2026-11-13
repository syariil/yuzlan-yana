// app/layout.js
import './globals.css';
import { weddingData } from '@/data/weddingData';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: `The Wedding of ${weddingData.bride.nickname} & ${weddingData.groom.nickname}`,
  description: `Undangan Pernikahan ${weddingData.bride.fullName} & ${weddingData.groom.fullName} - ${weddingData.weddingDateDisplay}`,
  icons: {
    icon: '/images/cover.webp',
  },
  openGraph: {
    title: `The Wedding of ${weddingData.bride.nickname} & ${weddingData.groom.nickname}`,
    description: `Kami mengundang Anda untuk hadir di hari bahagia pernikahan kami.`,
    images: [weddingData.coverPhoto],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-wedding-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
