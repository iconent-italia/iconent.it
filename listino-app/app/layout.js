import { Anton, Sora, Space_Mono } from 'next/font/google';
import './globals.css';

// Display oversized uppercase (prezzi, titoli) — vibe poster/zine urban
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Body tecnico/premium
const sora = Sora({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Label / numeri — feel holografico/terminale
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Servizi di Marketing & Comunicazione — ICONENT AGENCY',
  description: 'Listino servizi di marketing musicale ICONENT: Instagram, Spotify, YouTube, TikTok, Ufficio Stampa & Radio.',
  // Pagina privata: fuori dagli indici
  robots: { index: false, follow: false, nocache: true },
};

export const viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${anton.variable} ${sora.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
