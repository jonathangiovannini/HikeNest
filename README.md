# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler# 🏔️ HikeNest

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Find Your Hike Mates** - Connetti con altri escursionisti, unisciti ad avventure di gruppo e scopri nuovi sentieri insieme.

## 📖 Descrizione

HikeNest è una piattaforma web che facilita la connessione tra appassionati di escursionismo. L'applicazione permette di creare gruppi, trovare compagni di avventura e condividere esperienze sui sentieri di montagna.

### ✨ Caratteristiche Principali

- 🗺️ **Esplora Percorsi** - Visualizza e scopri nuovi sentieri
- 👥 **Crea Gruppi** - Organizza escursioni di gruppo
- 🔐 **Autenticazione** - Sistema di login e registrazione
- 📱 **Responsive Design** - Ottimizzato per desktop, tablet e mobile
- 🎨 **UI Moderna** - Interfaccia pulita e intuitiva con animazioni fluide

## 🚀 Demo

[🔗 Visualizza il sito live](https://jonathangiovannini.github.io/Progetti)

## 🛠️ Tecnologie Utilizzate

### Core
- **React 19.2.0** - Libreria UI
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool e dev server

### Styling & UI
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Material-UI 7.3.5** - Component library
- **Emotion** - CSS-in-JS
- **Framer Motion 12.23.25** - Libreria per animazioni

### Routing & Forms
- **React Router DOM 7.9.6** - Client-side routing
- **React Hook Form 7.67.0** - Form management

### Development Tools
- **ESLint** - Linting
- **TypeScript ESLint** - TypeScript linting
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installazione

### Prerequisiti

- Node.js >= 20.0.0
- npm >= 8.0.0

### Steps

1. **Clona il repository**
   ```bash
   git clone https://github.com/jonathangiovannini/Progetti.git
   cd Progetti
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

4. **Apri il browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Struttura del Progetto

```
hikenest/
├── public/
│   └── images/           # Immagini statiche
├── src/
│   ├── components/       # Componenti React riutilizzabili
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── FormGruppo.tsx
│   │   ├── Navbar.tsx
│   │   ├── Section.tsx
│   │   └── Separator.tsx
│   ├── pages/            # Pagine dell'applicazione
│   │   ├── About.tsx
│   │   ├── Groups.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── SignUp.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind-config.js
```

## 📜 Script Disponibili

```bash
# Sviluppo
npm run dev              # Avvia dev server con HMR

# Build
npm run build            # Build per produzione
npm run preview          # Preview della build

# Linting
npm run lint             # Esegue ESLint

# Deploy
npm run predeploy        # Build prima del deploy
npm run deploy           # Deploy su GitHub Pages
```

## 🎨 Componenti Principali

### Navbar
Barra di navigazione responsive con menu hamburger per mobile.

### FormGruppo
Modal per la creazione di nuovi gruppi escursionistici con validazione.

### Card
Componente per visualizzare informazioni sui membri del team.

### Section
Sezione hero con immagine di background e testo sovrapposto.

## 🌐 Pagine

- **Home** (`/`) - Landing page con hero section
- **About** (`/about`) - Informazioni sul team e la missione
- **Groups** (`/groups`) - Visualizzazione e creazione gruppi
- **Login** (`/login`) - Autenticazione utente
- **Sign Up** (`/signup`) - Registrazione nuovo utente

## 🎨 Design System

### Colori (Mine Shaft Palette)
- **Primary**: `#2b2b2b` (mine-shaft-950)
- **Background**: `#f0f0f3` (mine-shaft-50)
- **Borders**: `#d1d1d1` (mine-shaft-200)

### Typography
- Font Family: Roboto, Helvetica, sans-serif

### Border Radius
- Buttons: `4rem` (rounded-buttons)
- Large elements: `2rem` (rounded-large)

## 🚢 Deployment

Il progetto è configurato per il deploy automatico su GitHub Pages.

```bash
npm run deploy
```

Questo comando:
1. Esegue il build di produzione
2. Pusha i file nella branch `gh-pages`
3. Rende il sito disponibile su GitHub Pages

## 👥 Team

- **Jonathan Giovannini** - Front-End Developer
- **Alessandro Balasso** - Lead Developer
- **Nicolas Ciocozan** - Multi-Functional Developer

**Università degli Studi di Trento**

## 🤝 Contributing

Le contribuzioni sono benvenute! Per favore:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 License

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 📧 Contatti

- 📧 Email: team@hikenest.com
- 🔗 GitHub: [jonathangiovannini](https://github.com/jonathangiovannini)

## 🙏 Riconoscimenti

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Material-UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

⭐ **Se questo progetto ti è stato utile, lascia una stella su GitHub!**

Made with ❤️ by HikeNest Team

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
