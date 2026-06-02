// Slug pubblico dell'app (deve combaciare con basePath in next.config.mjs
// e con il rewrite in vercel.json del sito statico).
export const BASE_PATH = '/servizi-marketing';

// next/image applica il basePath da solo; gli sfondi in CSS inline NO,
// quindi per i background-image va usato questo helper.
export const asset = (p) => `${BASE_PATH}${p}`;

export const EASE = [0.16, 1, 0.3, 1];
