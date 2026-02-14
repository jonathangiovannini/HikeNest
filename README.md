# HikeNest

HikeNest è un'applicazione web pensata per connettere gli appassionati di escursionismo. Gli utenti possono scoprire sentieri, unirsi o creare gruppi di escursionismo e condividere recensioni e resoconti sui percorsi.

## Stack Tecnologico

- **Framework:** React 19 con TypeScript
- **Build Tool:** Vite
- **Stile:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Client HTTP:** Axios
- **Mappe:** Leaflet / React Leaflet
- **Componenti UI:** MUI (Material UI)
- **Animazioni:** Framer Motion

## Prerequisiti

- Node.js >= 20.19.0
- npm >= 8.0.0

## Installazione

```bash
git clone https://github.com/jonathangiovannini/HikeNest.git
cd HikeNest
npm install
```

## Configurazione

Creare un file `.env` nella directory principale del progetto basandosi su `.env.example`:

```
VITE_API_URL=https://url-del-backend
```

## Sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile all'indirizzo `http://localhost:5173`.

## Build

```bash
npm run build
```

L'output verrà generato nella directory `dist/`.

## Deploy

Il progetto è configurato per il deploy su GitHub Pages:

```bash
npm run deploy
```

## Struttura del Progetto

```
src/
├── components/    # Componenti UI riutilizzabili
├── hooks/         # Hook React personalizzati
├── pages/         # Componenti a livello di pagina
├── types/         # Definizioni dei tipi TypeScript
└── utils/         # Funzioni e helper di utilità
```

## Autori

- Jonathan Giovannini - Sviluppatore Front-End
- Alessandro Balasso - Sviluppatore Back-End
- Nicolas Ciocozan - Sviluppatore Full Stack

Università di Trento
