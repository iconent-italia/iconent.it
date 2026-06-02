'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/config';

const OVER_MSG =
  'Hai selezionato troppi servizi rispetto al budget disponibile. Per maggiori chiarimenti contatta il tuo referente.';

export default function QuoteCalculator({ open, onClose, calculator, cta }) {
  const reduce = useReducedMotion();
  const [budget, setBudget] = useState(500);
  const [qty, setQty] = useState({});
  const [budgetOpen, setBudgetOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const groups = calculator.groups;
  const allItems = useMemo(
    () => groups.flatMap((g) => g.items.map((it) => ({ ...it, accent: g.accent }))),
    [groups]
  );

  const selected = allItems.filter((it) => (qty[it.id] || 0) > 0);
  const total = selected.reduce((s, it) => s + it.price * (qty[it.id] || 0), 0);
  const hasFrom = selected.some((it) => it.from);
  const budgetNum = Number(budget) || 0;
  const over = budgetNum > 0 && total > budgetNum;

  const step = (id, d) => {
    // al primo servizio aggiunto, collassa il budget per liberare spazio
    if (d > 0 && budgetOpen && selected.length === 0) setBudgetOpen(false);
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + d) }));
  };

  const pct = budgetNum > 0 ? Math.min(100, (total / budgetNum) * 100) : 0;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="lst-calc-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="lst-calc"
            role="dialog"
            aria-modal="true"
            aria-label="Calcolatore di preventivo"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div className="lst-calc-head">
              <div>
                <span className="lst-calc-k">Preventivo</span>
                <h3 className="lst-calc-title">Calcola il tuo preventivo</h3>
              </div>
              <button className="lst-calc-x" onClick={onClose} aria-label="Chiudi">×</button>
            </div>

            {budgetOpen ? (
              <div className="lst-calc-budget">
                <div className="lst-calc-budget-top">
                  <label htmlFor="calc-budget">Il tuo budget</label>
                  <button type="button" className="lst-calc-budget-done" onClick={() => setBudgetOpen(false)}>
                    Fatto
                  </button>
                </div>
                <div className="lst-calc-budget-row">
                  <input
                    id="calc-budget"
                    type="range"
                    min="0"
                    max="3000"
                    step="10"
                    value={budgetNum}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <div className="lst-calc-num">
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      aria-label="Budget in euro"
                    />
                    <span>€</span>
                  </div>
                </div>
              </div>
            ) : (
              <button type="button" className="lst-calc-budget-chip" onClick={() => setBudgetOpen(true)}>
                Budget: <strong>{budgetNum}€</strong>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </button>
            )}

            <div className="lst-calc-body">
              {groups.map((g) => (
                <div className="lst-calc-group" key={g.platform} style={{ '--gc': g.accent }}>
                  <p className="lst-calc-group-h">
                    <span className="dot" aria-hidden="true" /> {g.name}
                  </p>
                  {g.items.map((it) => {
                    const n = qty[it.id] || 0;
                    return (
                      <div className={`lst-calc-item${n > 0 ? ' on' : ''}`} key={it.id}>
                        <div className="lst-calc-item-info">
                          <span className="lbl">{it.label}</span>
                          <span className="price">
                            {it.from ? 'da ' : ''}
                            {it.price}€
                          </span>
                        </div>
                        <div className="lst-calc-step">
                          <button onClick={() => step(it.id, -1)} disabled={n === 0} aria-label={`Togli ${it.label}`}>−</button>
                          <span>{n}</span>
                          <button onClick={() => step(it.id, +1)} aria-label={`Aggiungi ${it.label}`}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={`lst-calc-foot${over ? ' over' : ''}`}>
              <div className="lst-calc-totrow">
                <span>Totale stimato</span>
                <strong>
                  {hasFrom && !over ? 'da ' : ''}
                  {total}€
                </strong>
              </div>
              {budgetNum > 0 && (
                <div className="lst-calc-bar" aria-hidden="true">
                  <div className="lst-calc-bar-fill" style={{ width: pct + '%' }} />
                </div>
              )}

              {over ? (
                <p className="lst-calc-over">{OVER_MSG}</p>
              ) : selected.length > 0 ? (
                <>
                  <p className="lst-calc-recap">
                    {selected.map((it) => `${it.label} ×${qty[it.id]}`).join('  ·  ')}
                  </p>
                  <div className="lst-calc-cta">
                    <a className="btn btn-primary" href={cta.whatsapp} target="_blank" rel="noopener noreferrer">
                      Richiedi su WhatsApp
                    </a>
                    <a className="btn btn-secondary" href={cta.call} target="_blank" rel="noopener noreferrer">
                      Prenota una call
                    </a>
                  </div>
                </>
              ) : (
                <p className="lst-calc-hint">Imposta il budget e seleziona i servizi per vedere la stima.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
