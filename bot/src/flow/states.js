/**
 * Macchina a stati del funnel.
 *
 * Regola generale: il lead avanza da solo fino a S8_VERIFICA.
 * Da lì in poi si muove solo quando un admin preme un bottone.
 * Ogni transizione viene scritta in `events` (append-only) — è la
 * ricostruzione della pratica in caso di contestazione sul rimborso.
 */

export const S = {
  START: 'S0_START',
  DISCLAIMER: 'S1_DISCLAIMER',
  PREQUAL: 'S2_PREQUALIFICA',
  LINK: 'S3_LINK_CONSEGNATO',
  REGISTRATO: 'S4_REGISTRATO',
  KYC: 'S5_KYC_INVIATO',
  DEPOSITO: 'S6_DEPOSITO',
  TRADE: 'S7_TRADE',
  VERIFICA: 'S8_IN_VERIFICA',
  VERIFICATO: 'S9_VERIFICATO',
  BONUS: 'S10_BONUS_ACCREDITATO',
  PAYOUT: 'S11_PAYOUT',
  CHIUSO: 'S12_CHIUSO',
  // uscite
  ATTESA: 'X_LISTA_ATTESA',
  NON_IDONEO: 'X_NON_IDONEO',
  KO: 'X_KO',
  FREDDO: 'X_FREDDO',
  BLOCCATO: 'X_BLOCCATO',
}

/**
 * Slot: il numero di posti è un tetto di esposizione, non una leva di
 * marketing. Ogni posto impegnato vale un rimborso da pagare, quindi il
 * bot non manda a depositare più lead di quanti se ne possano onorare.
 *
 * Un posto si considera impegnato da quando il lead riceve il link
 * (da lì in poi può depositare in qualsiasi momento) e si libera solo
 * se esce dall'imbuto senza aver depositato.
 */
export const OCCUPA_SLOT = new Set([
  S.LINK, S.REGISTRATO, S.KYC, S.DEPOSITO, S.TRADE,
  S.VERIFICA, S.VERIFICATO, S.BONUS, S.PAYOUT, S.CHIUSO,
])

/** Stati oltre i quali il lead non si muove senza un admin. */
export const GATE_ADMIN = new Set([S.VERIFICA, S.VERIFICATO])

/** Stati terminali: niente più solleciti, niente più automazione. */
export const TERMINALI = new Set([
  S.CHIUSO, S.NON_IDONEO, S.KO, S.FREDDO, S.BLOCCATO,
])

/**
 * Transizioni ammesse. Qualsiasi salto non elencato qui viene rifiutato
 * e loggato: impedisce che un doppio tap su un bottone vecchio riporti
 * indietro un lead già pagato.
 */
export const TRANSIZIONI = {
  [S.START]:      [S.DISCLAIMER, S.NON_IDONEO],
  [S.DISCLAIMER]: [S.PREQUAL, S.NON_IDONEO],
  [S.PREQUAL]:    [S.LINK, S.ATTESA, S.NON_IDONEO],
  [S.LINK]:       [S.REGISTRATO, S.FREDDO, S.NON_IDONEO],
  [S.REGISTRATO]: [S.KYC, S.FREDDO, S.KO],
  [S.KYC]:        [S.DEPOSITO, S.FREDDO, S.KO],
  [S.DEPOSITO]:   [S.TRADE, S.FREDDO, S.KO],
  [S.TRADE]:      [S.VERIFICA, S.KO],
  [S.VERIFICA]:   [S.VERIFICATO, S.KO],          // gate admin #1
  [S.VERIFICATO]: [S.BONUS, S.KO],               // gate admin #2
  [S.BONUS]:      [S.PAYOUT],
  [S.PAYOUT]:     [S.CHIUSO],
  [S.CHIUSO]:     [],
  [S.ATTESA]:     [S.LINK, S.NON_IDONEO],        // si libera un posto
  [S.NON_IDONEO]: [],
  [S.KO]:         [S.VERIFICA],                  // riapertura manuale
  [S.FREDDO]:     [S.REGISTRATO, S.KYC, S.DEPOSITO, S.TRADE],
  [S.BLOCCATO]:   [],
}

export function puoPassare(da, a) {
  return (TRANSIZIONI[da] ?? []).includes(a)
}

/**
 * Solleciti per stato. `dopoOre` è calcolato dall'ingresso nello stato.
 * Dopo l'ultimo sollecito senza risposta il lead va in X_FREDDO: smette
 * di ricevere messaggi ma resta recuperabile a mano dal pannello.
 */
export const SOLLECITI = {
  [S.LINK]:       [6, 24, 72],
  [S.REGISTRATO]: [24, 72],
  [S.KYC]:        [24, 96],
  [S.DEPOSITO]:   [24, 72, 168],
  [S.TRADE]:      [12, 48],
}

/**
 * Scadenza del programma: il deposito va fatto entro 90 giorni dalla
 * registrazione. Avvisiamo con anticipo crescente invece che il giorno prima.
 */
export const SCADENZA_DEPOSITO_GG = 90
export const ALERT_SCADENZA_GG = [7, 30, 60, 80]
