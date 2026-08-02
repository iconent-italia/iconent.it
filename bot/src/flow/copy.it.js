/**
 * Tutti i testi che il bot dice al lead, in un solo file.
 * Modifica qui: non c'è copy sparso negli handler.
 *
 * I segnaposto {{...}} sono in config.js e vanno riempiti prima del go-live:
 *   BONUS_LEAD           quanto riceve il lead OLTRE al rimborso
 *   TETTO_RIMBORSO       massimo rimborsabile — senza questo sei esposto a qualsiasi cifra
 *   DEPOSITO_CONSIGLIATO 120 € (non 100: serve margine sul cambio EUR→USD)
 *   LINK_REFERRAL        il link etoro.tw
 *   GIORNI_PAGAMENTO     entro quanto paghi dopo la conferma
 */

const R = (s) => s.trim()

export const copy = {
  // ─────────────────────────────────────────── S1 · ingresso e disclaimer

  benvenuto: () => R(`
Ciao 👋

Ti seguo io passo passo nell'apertura del conto eToro tramite il programma referral, fino all'accredito del bonus.

Prima di iniziare devi sapere **come funziona davvero**, senza giri di parole:

1️⃣ Apri il conto dal nostro link e completi la verifica dei documenti
2️⃣ Depositi almeno {{DEPOSITO_CONSIGLIATO}} sul **tuo** conto — restano soldi tuoi, sul tuo conto, non li tocca nessuno
3️⃣ Apri una posizione da almeno 100 $
4️⃣ eToro ci conferma il referral (di norma entro 5 giorni lavorativi)
5️⃣ **Solo a quel punto** ti rimborsiamo il deposito e ti versiamo {{BONUS_LEAD}} sul tuo PayPal o IBAN

⚠️ **Il punto 5 dipende dal punto 4.** Se eToro non conferma il referral, non possiamo rimborsarti. I casi in cui succede sono elencati nella prossima schermata: leggili, perché se rientri in uno di quelli è inutile che tu inizi.

Investire comporta rischi, incluso perdere il capitale. Non è consulenza finanziaria e non è un guadagno garantito.
`),

  disclaimer: () => R(`
📋 **Prima di procedere, le condizioni**

Il rimborso e il bonus **non scattano** se:
• hai già avuto un account eToro in passato (anche solo l'app scaricata con i tuoi dati)
• la verifica dei documenti viene respinta
• il deposito o l'operazione non rispettano i minimi richiesti
• eToro non riconosce il referral per qualunque motivo legato ai suoi termini

Cosa rimborsiamo: **il deposito effettuato, fino a un massimo di {{TETTO_RIMBORSO}}**, più {{BONUS_LEAD}} di bonus.
Quando: entro {{GIORNI_PAGAMENTO}} dalla conferma di eToro.
Come: PayPal o bonifico, sul conto intestato **alla stessa persona** del conto eToro.

Depositare più di {{TETTO_RIMBORSO}} è una tua scelta e la parte eccedente non rientra nel rimborso.

Procedendo dichiari di avere almeno 18 anni, di aver capito che il rimborso è condizionato alla conferma di eToro, e di sapere che il trading comporta il rischio di perdere denaro.
`),

  disclaimerBottoni: ['✅ Ho capito, procedi', '❌ Non mi interessa'],

  // ─────────────────────────────────────────── S2 · pre-qualifica

  prequal: {
    intro: () => R(`
Quattro domande veloci. Servono a capire **subito** se il bonus ti spetta: se rispondi in modo sbagliato adesso, arrivi in fondo e resti a mani vuote.
`),
    domande: [
      {
        key: 'mai_etoro',
        testo: 'Hai mai aperto un account eToro, anche anni fa, anche solo scaricando l\'app con i tuoi dati?',
        risposte: [
          { label: 'No, mai', ok: true },
          { label: 'Sì / non sono sicuro', ok: false },
        ],
        // È la causa numero uno di referral respinti. Nessun rimedio: se c'è
        // già un account, eToro non riconosce il referral e basta.
        motivoKo: 'Un account eToro già esistente esclude il referral: eToro lo rileva dai dati anagrafici e non riconosce il bonus. Non c\'è modo di aggirarlo e non vogliamo farti depositare per niente.',
      },
      {
        key: 'maggiorenne_it',
        testo: 'Hai almeno 18 anni e risiedi in Italia?',
        risposte: [
          { label: 'Sì', ok: true },
          { label: 'No', ok: false },
        ],
        motivoKo: 'Il programma che gestiamo copre i residenti in Italia maggiorenni.',
      },
      {
        key: 'documenti',
        testo: 'Hai un documento in corso di validità (carta d\'identità o passaporto) **e** una prova di residenza recente — bolletta, estratto conto o certificato, emessa negli ultimi 3 mesi, intestata a te?',
        risposte: [
          { label: 'Sì, ho entrambi', ok: true },
          { label: 'Mi manca qualcosa', ok: false },
        ],
        motivoKo: 'Senza entrambi i documenti la verifica eToro non passa. Torna quando li hai: scrivi /start e riprendiamo da qui.',
      },
      {
        key: 'liquidita',
        testo: 'Puoi depositare {{DEPOSITO_CONSIGLIATO}} nei prossimi giorni, con una carta o un conto **intestati a te**?',
        risposte: [
          { label: 'Sì', ok: true },
          { label: 'Ora no', ok: false },
        ],
        motivoKo: 'Nessun problema. Il deposito è la condizione del programma, quindi ti aspettiamo: scrivi /start quando sei pronto.',
      },
    ],
    superata: () => R(`
✅ Perfetto, rientri nei requisiti.

Ti mando il link e la guida. Da qui in poi ti seguo io: a ogni passo mi dici quando hai finito e ti spiego il successivo.
`),
  },

  // ─────────────────────────────────────────── S3 · link e registrazione

  link: () => R(`
🔗 **Passo 1 di 4 — Apertura del conto**

Apri il conto **esclusivamente da questo link**, altrimenti il referral non viene tracciato e il bonus non arriva:

{{LINK_REFERRAL}}

Mentre ti registri:
• usa **dati reali**, identici a quelli sul documento — se non coincidono la verifica viene respinta
• usa un'email a cui accedi davvero, ti servirà per confermare
• il questionario iniziale (lavoro, esperienza, obiettivi) va compilato **in modo veritiero**: serve a eToro per valutare il tuo profilo di rischio, e le risposte le puoi modificare anche dopo

Quando hai finito la registrazione, premi il bottone qui sotto.
`),
  linkBottoni: ['✅ Registrazione completata', '❓ Ho un problema'],

  chiediDati: () => R(`
Per poter verificare il referral con eToro mi servono tre informazioni:

1. Il tuo **username eToro**
2. L'**email** che hai usato per registrarti
3. La **data** di registrazione

Scrivimeli in un unico messaggio, in questo formato:

\`mario_rossi90 · mario.rossi@email.it · 14/07\`
`),

  // ─────────────────────────────────────────── S5 · KYC

  kyc: () => R(`
📄 **Passo 2 di 4 — Verifica identità (KYC)**

Dentro eToro carica:
• **Documento d'identità** — carta d'identità o passaporto, in corso di validità, foto intera e leggibile, senza angoli tagliati
• **Prova di residenza** — bolletta, estratto conto, certificato di residenza o documento fiscale: intestato a te, con indirizzo completo, emesso negli ultimi 3 mesi

🔒 **Non inviare questi documenti a me.** Vanno caricati solo su eToro, dentro l'app. Io non li chiedo, non li ricevo e non li conservo.

Errori che fanno respingere la verifica: foto sfocate o tagliate, documento scaduto, bolletta più vecchia di 3 mesi, indirizzo diverso da quello dichiarato in registrazione.

Premi qui sotto quando li hai caricati.
`),
  kycBottoni: ['✅ Documenti caricati', '❓ Ho un problema'],

  kycInAttesa: () => R(`
Ricevuto. eToro di solito verifica entro 24-48 ore, a volte meno.

Appena vedi la verifica approvata dentro l'app, premi il bottone: passiamo al deposito.
`),
  kycOkBottoni: ['✅ Verifica approvata', '❌ Verifica respinta'],

  // ─────────────────────────────────────────── S6 · deposito

  deposito: () => R(`
💳 **Passo 3 di 4 — Deposito**

Deposita **{{DEPOSITO_CONSIGLIATO}}**.

Perché {{DEPOSITO_CONSIGLIATO}} e non 100 €: il conto eToro è in **dollari**, e sulla conversione da euro c'è una commissione. Depositando 100 € esatti ti ritrovi con circa 102-104 $, e al passo successivo devi aprire una posizione da **oltre** 100 $ — resti senza margine e rischi che il requisito non venga considerato valido. Con {{DEPOSITO_CONSIGLIATO}} stai tranquillo.

Sono comunque **soldi tuoi sul tuo conto**: dopo la conferma te li rimborsiamo, e a prescindere puoi prelevarli quando vuoi.

Metodo di pagamento:
• carta di debito o credito intestata a te (evita le prepagate, danno più problemi in verifica)
• bonifico solo se non hai alternative, impiega giorni

⚠️ Il metodo deve essere **intestato alla stessa persona** del conto eToro, altrimenti il deposito viene bloccato.

Quando il deposito risulta accreditato, mandami uno **screenshot della conferma**.
`),

  depositoScreenshot: () => R(`
Mandami lo screenshot del deposito accreditato.

Prima di inviarlo **oscura** numero di carta, IBAN e saldo complessivo: mi serve solo vedere importo e data dell'operazione.
`),

  // ─────────────────────────────────────────── S7 · operazione

  trade: () => R(`
📈 **Passo 4 di 4 — Prima operazione**

Apri una posizione da **almeno 100 $**. Puoi scegliere quello che vuoi: azioni, ETF, crypto.

Due cose da controllare:
• l'importo dell'operazione deve superare i 100 $, non essere esattamente 100
• la posizione deve risultare **eseguita**, non in attesa

Ricorda che è un investimento reale: il valore può salire o scendere, e la scelta di cosa comprare è tua.

Quando la posizione è aperta, mandami uno **screenshot** in cui si vedono strumento, importo e stato eseguito.
`),

  // ─────────────────────────────────────────── S8-S9 · verifica

  inVerifica: () => R(`
✅ Ho tutto: registrazione, verifica, deposito e operazione.

Ora tocca a noi. Controlliamo che il referral risulti correttamente tracciato da eToro e ti aggiorno appena ho una risposta — di solito entro 24-48 ore.

Non devi fare altro. Ti scrivo io.
`),

  verificato: () => R(`
🎯 **Referral confermato.**

Risulti correttamente tracciato lato eToro e tutti i requisiti sono soddisfatti.

Adesso si aspetta l'accredito da parte di eToro: di norma entro 5 giorni lavorativi. Appena arriva ti scrivo e partiamo con il rimborso e il bonus.
`),

  // ─────────────────────────────────────────── S10-S11 · payout

  bonusArrivato: () => R(`
💰 **Confermato: l'accredito è arrivato.**

Come da accordo ti spettano:
• il rimborso del deposito che hai effettuato (fino a {{TETTO_RIMBORSO}})
• {{BONUS_LEAD}} di bonus

Dimmi come preferisci ricevere il pagamento.
`),
  bonusBottoni: ['PayPal', 'Bonifico (IBAN)'],

  chiediPaypal: () => R(`
Mandami l'**email del tuo account PayPal**.

Dev'essere intestato alla stessa persona del conto eToro: se i nomi non coincidono il pagamento non parte.
`),

  chiediIban: () => R(`
Mandami **IBAN e intestatario**, in un unico messaggio.

L'intestatario dev'essere la stessa persona del conto eToro: se i nomi non coincidono il pagamento non parte.
`),

  payoutRicevuto: () => R(`
Ricevuto ✅

Procediamo con il pagamento entro {{GIORNI_PAGAMENTO}}. Ti mando la conferma appena è partito.
`),

  pagato: ({ importo, metodo, riferimento }) => R(`
✅ **Pagamento inviato.**

Importo: **${importo}**
Metodo: ${metodo}
Riferimento: \`${riferimento}\`

Se entro 3 giorni lavorativi non lo vedi arrivare, scrivimi qui e controllo.

Grazie di aver completato tutto senza intoppi 🤝
Se hai qualcuno a cui può interessare, mandagli pure questo bot.
`),

  // ─────────────────────────────────────────── uscite

  nonIdoneo: (motivo) => R(`
Grazie per la sincerità, meglio saperlo ora.

${motivo}

Se la situazione cambia scrivi /start e ripartiamo.
`),

  ko: (motivo) => R(`
Ho un aggiornamento sulla tua pratica.

${motivo}

Se pensi ci sia un errore scrivimi pure qui: controllo di persona.
`),

  koMotivi: {
    non_tracciato: 'Il referral non risulta tracciato lato eToro. Succede quando la registrazione non è partita dal nostro link — per esempio se l\'app era già installata o il browser aveva una sessione aperta. Purtroppo non è recuperabile a posteriori e il bonus non può essere riconosciuto.',
    account_esistente: 'Dai controlli risulta un account eToro precedente collegato ai tuoi dati. Il programma è riservato ai nuovi iscritti, quindi il referral non viene riconosciuto.',
    requisiti: 'Uno dei requisiti non risulta soddisfatto (importo del deposito o dell\'operazione sotto le soglie). Se pensi sia un errore mandami di nuovo gli screenshot e ricontrollo.',
    kyc_respinto: 'La verifica dei documenti è stata respinta da eToro. Puoi ricaricarli corretti dall\'app: quando è approvata scrivimi e riprendiamo da dove eravamo.',
  },

  // ─────────────────────────────────────────── solleciti

  solleciti: {
    S3_LINK_CONSEGNATO: [
      'Ti sei bloccato sulla registrazione? Dimmi dove e ti do una mano 👇',
      'Ricorda di aprire il conto **solo dal link che ti ho mandato**, altrimenti il referral non viene tracciato. Se hai già provato in altro modo dimmelo subito, prima di andare avanti.',
      'Ultimo promemoria: se non hai ancora aperto il conto, il link è sempre valido. Scrivimi se ti serve aiuto, altrimenti ti lascio in pace 🙂',
    ],
    S4_REGISTRATO: [
      'Hai caricato i documenti per la verifica? È il passaggio che blocca più persone, ma è veloce.',
      'La verifica dei documenti è ferma. Se eToro ti ha respinto qualcosa dimmi cosa e vediamo come sistemarla.',
    ],
    S5_KYC_INVIATO: [
      'Novità sulla verifica dei documenti? Appena è approvata passiamo al deposito.',
      'La verifica di solito richiede 24-48 ore. Se è passato più tempo conviene riaprire l\'app e controllare se ti hanno chiesto di ricaricare qualcosa.',
    ],
    S6_DEPOSITO: [
      'Sei a due passi dalla fine: manca il deposito e poi l\'operazione.',
      'Ti ricordo che il deposito resta sul tuo conto ed è tuo. Se hai dubbi sul metodo di pagamento chiedimi pure.',
      'Se hai cambiato idea nessun problema, dimmelo e chiudo la pratica. Altrimenti sono qui.',
    ],
    S7_TRADE: [
      'Manca solo l\'ultima cosa: la posizione da oltre 100 $. Poi ci penso io.',
      'Hai già aperto l\'operazione? Mandami lo screenshot e mando tutto in verifica.',
    ],
  },

  scadenzaVicina: (giorni) => R(`
⏳ Restano **${giorni} giorni** per completare il deposito: oltre questo termine il referral scade e il bonus non è più riconoscibile.

Se vuoi procedere è il momento. Se preferisci lasciar perdere dimmelo e chiudo la pratica.
`),

  // ─────────────────────────────────────────── varie

  aiuto: () => R(`
Scrivi pure la tua domanda: leggo tutto e ti rispondo di persona, di solito in giornata.

Se vuoi ripartire da capo: /start
Per sapere a che punto sei: /stato
`),

  nonHoCapito: () => R(`
Non ho capito 🤔 Usa i bottoni qui sotto, oppure scrivimi la domanda a parole tue e ti risponde una persona.
`),
}
