import tonyEffe from './artists/tony-effe';
import { validateArtistConfig } from './schema';

const REGISTRY = { 'tony-effe': tonyEffe };

export function getArtist(slug) {
  const c = REGISTRY[slug];
  if (!c) return null;
  return validateArtistConfig(c);
}
export function allArtistSlugs() {
  return Object.keys(REGISTRY);
}
