'use client';

import { asset } from '@/lib/config';
import TiltCard from './TiltCard';
import Marquee from './Marquee';

export default function PlatformPanel({ platform, reduce }) {
  return (
    <div role="tabpanel" aria-label={platform.name}>
      {platform.sections.map((s, i) => (
        <Section key={i} s={s} reduce={reduce} />
      ))}
    </div>
  );
}

function Section({ s, reduce }) {
  return (
    <section className="lst-section">
      {s.bg && (
        <div
          className={`lst-section-bg${reduce ? '' : ' kb'}`}
          aria-hidden="true"
          style={{ backgroundImage: `url(${asset(s.bg)})` }}
        />
      )}
      <div className="lst-section-inner">
        <div className="lst-reveal">
          {s.kicker && <p className="lst-kicker">{s.kicker}</p>}
          <h2 className="lst-h2">
            {s.title} {s.titleAccent && <span className="accent">{s.titleAccent}</span>}
          </h2>
          {s.lead && <p className="lst-lead">{s.lead}</p>}
        </div>

        {s.type === 'priceGroups' && <PriceGroups s={s} reduce={reduce} />}
        {(s.type === 'packs' || s.type === 'cards') && (
          <>
            <Grid cols2={s.cards.length <= 2}>
              {s.cards.map((c, i) => (
                <PriceCard key={i} c={c} reduce={reduce} />
              ))}
            </Grid>
            {s.note && <p className="lst-note lst-reveal">{s.note}</p>}
            {s.panel && <Panel panel={s.panel} />}
            {s.extra && <Extra extra={s.extra} reduce={reduce} />}
          </>
        )}
        {s.type === 'network' && <Network s={s} reduce={reduce} />}
      </div>
    </section>
  );
}

function PriceGroups({ s, reduce }) {
  return (
    <>
      {s.groups.map((g, gi) => (
        <div key={gi}>
          <p className="lst-subgroup lst-reveal">
            <span className="handle">{g.handle}</span>
            <span className="reach">{g.reach}</span>
          </p>
          <Grid>
            {g.cards.map((c, i) => (
              <PriceCard key={i} c={c} reduce={reduce} />
            ))}
          </Grid>
        </div>
      ))}
      {s.panel && <Panel panel={s.panel} />}
    </>
  );
}

function Network({ s, reduce }) {
  return (
    <>
      <Marquee items={s.chips} reduce={reduce} />
      {s.note && <p className="lst-note lst-reveal">{s.note}</p>}
      {s.extra && <Extra extra={s.extra} reduce={reduce} />}
    </>
  );
}

function Extra({ extra, reduce }) {
  return (
    <>
      <h3 className="lst-h3 lst-reveal">{extra.title}</h3>
      <Grid cols2={extra.cards.length <= 2}>
        {extra.cards.map((c, i) => (
          <PriceCard key={i} c={c} reduce={reduce} />
        ))}
      </Grid>
    </>
  );
}

function PriceCard({ c, reduce }) {
  return (
    <TiltCard className={`lst-card${c.featured ? ' featured' : ''}`} reduce={reduce}>
      {c.badge && <span className="lst-badge">{c.badge}</span>}
      {c.tier && <p className="lst-tier">{c.tier}</p>}

      <div className="lst-price">
        {c.from && <span className="lst-from">{c.from}</span>}
        {c.price}
        <span className="cur">€</span>
        {c.unit && <span className="unit">{c.unit}</span>}
      </div>

      {(c.desc || c.highlight || c.alt) && (
        <p className="lst-desc">
          {c.desc}
          {c.highlight && <span className="hl">{c.highlight}</span>}
          {c.alt && <span className="lst-alt">{c.alt}</span>}
        </p>
      )}

      {c.pages && (
        <ul className="lst-pages">
          {c.pages.map((pg, i) => (
            <li key={i}>{pg}</li>
          ))}
        </ul>
      )}

      {c.list && (
        <ul className="lst-ul">
          {c.list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )}

      {c.chips && (
        <div className="lst-chips-wrap" style={{ marginTop: 14 }}>
          {c.chips.map((ch, i) => (
            <span className="lst-chip" key={i}>{ch}</span>
          ))}
        </div>
      )}
    </TiltCard>
  );
}

function Panel({ panel }) {
  const isChips = !Array.isArray(panel);
  return (
    <div className="lst-panel lst-reveal">
      {isChips ? (
        <>
          <p className="panel-title">{panel.title}</p>
          <div className="lst-chips-wrap">
            {panel.chips.map((ch, i) => (
              <span className="lst-chip" key={i}>{ch}</span>
            ))}
          </div>
        </>
      ) : (
        panel.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)
      )}
    </div>
  );
}

function Grid({ children, cols2 }) {
  return <div className={`lst-grid lst-reveal${cols2 ? ' cols-2' : ''}`}>{children}</div>;
}
