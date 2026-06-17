import { describe, it, expect } from 'vitest';
import { validateArtistConfig } from '@/config/schema';

const base = {
  slug: 'tony-effe', name: 'Tony Effe', accent: '#c9a44a', theme: 'dark',
  object3D: 'diamond', manifesto: 'UNCOMPROMISING.',
  hero: { image: '/concept/artists/tony-effe/hero.jpg' },
  portrait: '/concept/artists/tony-effe/portrait.jpg',
  music: { title: 'Drop', cover: '/x.jpg', links: {} },
  tour: [{ city: 'Milano', date: '2026-09-12', status: 'onsale' }],
  merch: [{ name: 'Tee', price: '€45', image: '/x.jpg' }],
  visuals: [], fanWorld: { newsletter: true },
};

describe('validateArtistConfig', () => {
  it('accepts a valid config', () => {
    expect(() => validateArtistConfig(base)).not.toThrow();
  });
  it('throws when slug is missing', () => {
    const { slug, ...bad } = base;
    expect(() => validateArtistConfig(bad)).toThrow(/slug/);
  });
  it('throws when accent is not a hex color', () => {
    expect(() => validateArtistConfig({ ...base, accent: 'gold' })).toThrow(/accent/);
  });
  it('throws when theme is not dark or light', () => {
    expect(() => validateArtistConfig({ ...base, theme: 'blue' })).toThrow(/theme/);
  });
  it('throws when a tour item lacks a city', () => {
    expect(() => validateArtistConfig({ ...base, tour: [{ date: '2026-09-12' }] })).toThrow(/city/);
  });
});
