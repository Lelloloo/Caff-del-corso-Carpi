# Progetto: sito vetrina di Cosmo

## Contesto
- Sito a pagina singola, in italiano, di un servizio di creazione siti per piccole attività locali.
- Pubblico: titolari di negozi, ristoranti, artigiani, non tecnici. Tono chiaro, diretto, rassicurante, dando del "tu".

## Stack
- HTML5, CSS moderno (variabili, grid, flexbox), JavaScript vanilla. Nessun framework e nessun build step.
- Librerie solo se servono, da CDN con versione fissata (es. GSAP + ScrollTrigger).
- Struttura: index.html, css/style.css, js/main.js, assets/img/

## Design
- Palette in variabili CSS su :root: 3 colori + neutri, contrasto AA.
- Massimo 2 font da Google Fonts (titoli e testo), tipografia fluida con clamp().
- Spaziature su griglia da 8px, contenuto largo max ~1100px, sezioni con molto respiro.
- Mobile-first, breakpoint a 640px e 1024px.
- Evita l'aspetto generico: niente gradienti viola casuali, niente card tutte identiche, niente emoji come icone (usa SVG).

## Animazioni
- Sottili e con uno scopo: comparsa allo scroll, hover su pulsanti e card, transizioni 200-400ms.
- Anima solo transform e opacity. Rispetta prefers-reduced-motion.

## Qualità
- HTML semantico, un solo h1, alt sulle immagini, meta title/description, tag Open Graph.
- Immagini in WebP con lazy loading.
- Dopo ogni modifica apri la pagina nel browser, controlla desktop e mobile e correggi.

## Regole di lavoro
- Modifiche piccole e incrementali, senza riscrivere file interi senza motivo.
- Non inventare dati (prezzi, recensioni, clienti): usa segnaposto [DA COMPILARE].
- Chiedi conferma prima di cambiare l'impostazione grafica, installare pacchetti o eseguire comandi distruttivi.

## Revisione automatica
- Dopo ogni modifica grafica a una pagina, delega al subagente "revisore-design" il controllo su desktop e mobile e correggi i problemi importanti prima di rispondere.
