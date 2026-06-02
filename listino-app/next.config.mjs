/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tutte le route e gli asset vivono sotto /servizi-marketing.
  // Il sito statico (Vercel project A) fa da proxy via rewrite su questo path.
  basePath: '/servizi-marketing',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Le foto sono già leggere e low-res: disattiviamo l'ottimizzatore così
    // non c'è alcun endpoint /_next/image da far passare per il proxy Vercel.
    // next/image continua a dare lazy-load + dimensioni (no CLS).
    unoptimized: true,
  },
};

export default nextConfig;
