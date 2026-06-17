'use client';
import { ArtistProvider } from '@/components/ArtistContext';
import { AudioController } from '@/components/AudioController';
import SoundToggle from '@/components/SoundToggle';
import Stage3D from '@/components/stage/Stage3D';
import ScrollController from '@/components/ScrollController';
import PanelIndex from '@/components/PanelIndex';
import IntroPanel from '@/components/panels/IntroPanel';
import ManifestoPanel from '@/components/panels/ManifestoPanel';
import MusicPanel from '@/components/panels/MusicPanel';
import TourPanel from '@/components/panels/TourPanel';
import MerchPanel from '@/components/panels/MerchPanel';
import VisualsPanel from '@/components/panels/VisualsPanel';
import FanWorldPanel from '@/components/panels/FanWorldPanel';
import CtaPanel from '@/components/panels/CtaPanel';

const LABELS = ['INTRO', 'MANIFESTO', 'MUSIC', 'TOUR', 'MERCH', 'VISUALS', 'FAN', 'ICONENT'];

export default function ConceptSite({ artist }) {
  return (
    <ArtistProvider value={artist}>
      <AudioController src={artist.music.audioLoop}>
        <main style={{ '--accent': artist.accent }}>
          <Stage3D objectKey={artist.object3D} accent={artist.accent} />
          <ScrollController panelCount={LABELS.length} />
          <PanelIndex labels={LABELS} />
          <SoundToggle />
          <IntroPanel />
          <ManifestoPanel />
          <MusicPanel />
          <TourPanel />
          <MerchPanel />
          <VisualsPanel />
          <FanWorldPanel />
          <CtaPanel />
        </main>
      </AudioController>
    </ArtistProvider>
  );
}
