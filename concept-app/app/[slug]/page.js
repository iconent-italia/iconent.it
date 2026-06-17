import { notFound } from 'next/navigation';
import { getArtist, allArtistSlugs } from '@/config/artists';
import ConceptSite from '@/components/ConceptSite';

export function generateStaticParams() {
  return allArtistSlugs().map((slug) => ({ slug }));
}

export const metadata = { robots: { index: false, follow: false } };

export default function Page({ params }) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();
  return <ConceptSite artist={artist} />;
}
