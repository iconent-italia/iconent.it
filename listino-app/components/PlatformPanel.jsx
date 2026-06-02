'use client';

import { motion } from 'framer-motion';
import { asset } from '@/lib/config';
import TiltCard from './TiltCard';
import CountUpPrice from './CountUpPrice';
import Marquee from './Marquee';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const cardVar = {
  hidden: { opacity: 0, y: 46, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 14 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

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
      <Reveal reduce={reduce}>
        {s.kicker && <p className="lst-kicker">{s.kicker}</p>}
        <h2 className="lst-h2">
          {s.title} {s.titleAccent && <span className="accent">{s.titleAccent}</span>}
        </h2>
        {s.lead && <p className="lst-lead">{s.lead}</p>}
      </Reveal>

      {s.type === 'priceGroups' && <PriceGroups s={s} reduce={reduce} />}
      {(s.type === 'packs' || s.type === 'cards') && (
        <>
          <Grid reduce={reduce} cols2={s.cards.length <= 2}>
            {s.cards.map((c, i) => (
              <PriceCard key={i} c={c} reduce={reduce} />
            ))}
          </Grid>
          {s.note && <Reveal reduce={reduce}><p className="lst-note">{s.note}</p></Reveal>}
          {s.panel && <Panel panel={s.panel} reduce={reduce} />}
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
          <Reveal reduce={reduce}>
            <p className="lst-subgroup">
              <span className="handle">{g.handle}</span>
              <span className="reach">{g.reach}</span>
            </p>
          </Reveal>
          <Grid reduce={reduce}>
            {g.cards.map((c, i) => (
              <PriceCard key={i} c={c} reduce={reduce} />
            ))}
          </Grid>
        </div>
      ))}
      {s.panel && <Panel panel={s.panel} reduce={reduce} />}
    </>
  );
}

function Network({ s, reduce }) {
  return (
    <>
      <Marquee items={s.chips} reduce={reduce} />
      {s.note && <Reveal reduce={reduce}><p className="lst-note">{s.note}</p></Reveal>}
      {s.extra && <Extra extra={s.extra} reduce={reduce} />}
    </>
  );
}

function Extra({ extra, reduce }) {
  return (
    <>
      <Reveal reduce={reduce}><h3 className="lst-h3">{extra.title}</h3></Reveal>
      <Grid reduce={reduce} cols2={extra.cards.length <= 2}>
        {extra.cards.map((c, i) => (
          <PriceCard key={i} c={c} reduce={reduce} />
        ))}
      </Grid>
    </>
  );
}

function PriceCard({ c, reduce }) {
  return (
    <TiltCard className={`lst-card${c.featured ? ' featured' : ''}`} reduce={reduce} variants={cardVar}>
      {c.badge && <span className="lst-badge">{c.badge}</span>}
      {c.tier && <p className="lst-tier">{c.tier}</p>}

      <div className="lst-price">
        {c.from && <span className="lst-from">{c.from}</span>}
        <CountUpPrice value={c.price} reduce={reduce} />
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

function Panel({ panel, reduce }) {
  // playlist panel { title, chips } oppure array di paragrafi (HTML)
  const isChips = !Array.isArray(panel);
  return (
    <Reveal reduce={reduce}>
      <div className="lst-panel">
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
          panel.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))
        )}
      </div>
    </Reveal>
  );
}

function Grid({ children, cols2, reduce }) {
  return (
    <motion.div
      className={`lst-grid${cols2 ? ' cols-2' : ''}`}
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, reduce }) {
  return (
    <motion.div
      variants={fadeUp}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      {children}
    </motion.div>
  );
}
