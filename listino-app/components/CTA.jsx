'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/config';

export default function CTA({ cta }) {
  return (
    <section className="lst-cta" id="contatti">
      {/* Blocco: campagna su misura in base al budget */}
      <motion.div
        className="lst-budget"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span className="lst-budget-k">Su misura</span>
        <p className="lst-budget-t">
          Costruiamo la campagna sul <span className="accent">tuo budget</span>
        </p>
        <p className="lst-budget-d">
          Qualunque sia il tuo budget, progettiamo una strategia personalizzata per
          ottenere il massimo risultato dal tuo progetto — senza pacchetti imposti e
          senza alcun obbligo.
        </p>
      </motion.div>

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
        Raccontaci il tuo progetto: ti rispondiamo con una proposta chiara e senza impegno.
      </motion.p>

      <div className="lst-cta-row">
        <a className="btn btn-primary" href={cta.whatsapp} target="_blank" rel="noopener noreferrer">
          Contattaci su WhatsApp
        </a>
        <a className="btn btn-secondary" href={cta.call} target="_blank" rel="noopener noreferrer">
          Prenota una call
        </a>
      </div>
    </section>
  );
}
