import './globals.css';

export const metadata = {
  title: 'ICONENT · Concept',
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
