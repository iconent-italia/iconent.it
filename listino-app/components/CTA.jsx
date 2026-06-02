'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/config';

export default function CTA({ cta }) {
  return (
    <section className="lst-cta" id="contatti">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        Richiedi il tuo <span className="accent">preventivo</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        Scrivici per costruire la campagna su misura per il tuo progetto — nessun obbligo.
      </motion.p>

      <div className="lst-cta-row">
        <a className="btn btn-primary" href={cta.whatsapp} target="_blank" rel="noopener noreferrer">
          Contattaci su WhatsApp
        </a>
        <a className="btn btn-secondary" href={cta.call}>
          Prenota una call
        </a>
      </div>

      <div className="lst-contacts">
        <span>Email: <a href={`mailto:${cta.email[0]}`}>{cta.email[0]}</a></span>
        <span><a href={`mailto:${cta.email[1]}`}>{cta.email[1]}</a></span>
        {cta.ig.map((i) => (
          <span key={i.handle}>
            <a href={i.url} target="_blank" rel="noopener noreferrer">{i.handle}</a>
          </span>
        ))}
      </div>
    </section>
  );
}
