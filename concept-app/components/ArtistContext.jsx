'use client';
import { createContext, useContext } from 'react';
const Ctx = createContext(null);
export function ArtistProvider({ value, children }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useArtist() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useArtist must be used within ArtistProvider');
  return v;
}
