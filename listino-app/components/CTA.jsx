'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/config';
import QuoteCalculator from './QuoteCalculator';

export default function CTA({ cta, calculator }) {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <section className="lst-cta" id="contatti">
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
        <button className="btn btn-calc" onClick={() => setCalcOpen(true)} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="8" y2="10" />
            <line x1="12" y1="10" x2="12" y2="10" />
            <line x1="16" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="8" y2="14" />
            <line x1="12" y1="14" x2="12" y2="14" />
            <line x1="8" y1="18" x2="16" y2="18" />
          </svg>
          Calcola il tuo preventivo
        </button>
      </div>

      <QuoteCalculator open={calcOpen} onClose={() => setCalcOpen(false)} calculator={calculator} cta={cta} />
    </section>
  );
}
