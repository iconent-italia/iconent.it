'use client';
import PanelShell from '@/components/PanelShell';

export default function CtaPanel() {
  return (
    <PanelShell id="cta" kicker="07 · ICONENT">
      <h2 className="display" style={{ fontSize: 'clamp(1.6rem,6vw,4rem)', maxWidth: '18ch' }}>
        VUOI UN SITO COSÌ PER IL TUO PROGETTO?
      </h2>
      <a href="https://iconent.it/contatti/" className="accent"
        style={{ marginTop: 24, border: '1px solid var(--accent)', padding: '14px 22px', alignSelf: 'flex-start' }}>
        ICONENT · CONTATTACI →
      </a>
      <p style={{ marginTop: 40, fontSize: 11, color: 'var(--muted)' }}>
        CONCEPT DEMO · non affiliato · realizzato da ICONENT
      </p>
    </PanelShell>
  );
}
