import './globals.css';

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
  // Font: stesso stack di sistema del sito iconent.it (definito in globals.css)
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
