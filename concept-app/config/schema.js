const HEX = /^#[0-9a-fA-F]{6}$/;

export function validateArtistConfig(c) {
  const req = (cond, msg) => { if (!cond) throw new Error(`Invalid artist config: ${msg}`); };

  req(typeof c?.slug === 'string' && c.slug.length, 'slug is required');
  req(typeof c.name === 'string' && c.name.length, 'name is required');
  req(HEX.test(c.accent || ''), 'accent must be a #rrggbb hex color');
  req(c.theme === 'dark' || c.theme === 'light', 'theme must be "dark" or "light"');
  req(typeof c.object3D === 'string' && c.object3D.length, 'object3D key is required');
  req(typeof c.manifesto === 'string' && c.manifesto.length, 'manifesto is required');
  req(c.hero && typeof c.hero.image === 'string', 'hero.image is required');
  req(typeof c.portrait === 'string', 'portrait is required');
  req(c.music && typeof c.music.title === 'string', 'music.title is required');
  req(c.music.audioLoop === undefined || typeof c.music.audioLoop === 'string',
    'music.audioLoop must be a string when present');
  req(Array.isArray(c.tour), 'tour must be an array');
  c.tour.forEach((t, i) => {
    req(typeof t.city === 'string' && t.city.length, `tour[${i}].city is required`);
    req(typeof t.date === 'string' && t.date.length, `tour[${i}].date is required`);
  });
  req(Array.isArray(c.merch), 'merch must be an array');
  req(Array.isArray(c.visuals), 'visuals must be an array');
  return c;
}
