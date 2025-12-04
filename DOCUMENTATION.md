# 📚 Documentazione Tecnica - HikeNest

## 📑 Indice

1. [Architettura del Progetto](#architettura)
2. [Configurazioni](#configurazioni)
3. [Componenti](#componenti)
4. [Pagine](#pagine)
5. [Styling](#styling)
6. [Routing](#routing)
7. [State Management](#state-management)
8. [Performance](#performance)
9. [Best Practices](#best-practices)

---

## 🏗️ Architettura del Progetto {#architettura}

### Stack Tecnologico

```
Frontend Framework: React 19.2.0 con TypeScript
Build Tool: Vite 7.2.4
CSS Framework: TailwindCSS 4.1.17
Component Library: Material-UI 7.3.5
Animation: Framer Motion 12.23.25
Routing: React Router DOM 7.9.6
```

### Struttura delle Cartelle

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Card.tsx        # Card per membri del team
│   ├── Footer.tsx      # Footer globale
│   ├── FormGruppo.tsx  # Modal per creazione gruppi
│   ├── Navbar.tsx      # Navigazione principale
│   ├── Section.tsx     # Sezione hero riutilizzabile
│   └── Separator.tsx   # Separatore decorativo
├── pages/              # Pagine dell'applicazione
│   ├── About.tsx       # Pagina team e missione
│   ├── Groups.tsx      # Gestione gruppi
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Autenticazione
│   └── SignUp.tsx      # Registrazione
├── types/              # Type definitions
│   └── index.ts        # Interfacce TypeScript
├── App.tsx             # Root component con routing
├── main.tsx            # Entry point
└── index.css           # Stili globali e variabili CSS
```

---

## ⚙️ Configurazioni {#configurazioni}

### Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),           // Support per React
    tailwindcss()      // Plugin Vite per TailwindCSS
  ],
})
```

### TypeScript Configuration

#### `tsconfig.app.json`
- **Target**: ES2022
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict Mode**: Abilitato
- Linting rigoroso con `noUnusedLocals` e `noUnusedParameters`

#### `tsconfig.node.json`
- Configurazione per file di configurazione Node.js
- Target: ES2023

### TailwindCSS Configuration

```javascript
// tailwind-config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors, spacing, ecc. definiti in index.css
    },
  },
  plugins: [],
}
```

### ESLint Configuration

```javascript
// eslint.config.js
- React Hooks plugin
- React Refresh plugin
- TypeScript ESLint
- Strict rules per qualità del codice
```

---

## 🧩 Componenti {#componenti}

### 1. Navbar (`components/Navbar.tsx`)

**Funzionalità:**
- Navigazione responsive
- Menu hamburger per mobile
- Link attivi con animazioni
- Logo cliccabile

**Props:** Nessuna

**Stati Interni:**
```typescript
const [isMenuOpen, setMenuOpen] = useState(false)
```

**Caratteristiche:**
- Griglia responsive (2 colonne mobile, 3 colonne desktop)
- Menu drawer laterale per mobile
- Animazioni CSS su hover per i link
- Backdrop blur quando il menu è aperto

**Esempio di utilizzo:**
```tsx

```

---

### 2. FormGruppo (`components/FormGruppo.tsx`)

**Funzionalità:**
- Modal per creare nuovi gruppi
- Form con validazione
- Animazioni di apertura/chiusura
- Backdrop con dismiss

**Props:**
```typescript
interface FormGruppoProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Campi del Form:**
- `partenza`: Percorso (text input)
- `data`: Data escursione (datetime input)
- `esperienza`: Livello esperienza (radio buttons)

**Animazioni:**
```typescript
// Framer Motion
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
```

**Esempio di utilizzo:**
```tsx
const [isOpen, setIsOpen] = useState(false)

<button onClick={() => setIsOpen(true)}>
  Crea Gruppo


<FormGruppo 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

---

### 3. Card (`components/Card.tsx`)

**Funzionalità:**
- Visualizzazione informazioni membri del team
- Avatar circolare
- Badge con ruolo
- Link social

**Props:**
```typescript
interface CardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  roleColor: string;
  email: string;
}
```

**Layout:**
- Stripe colorato superiore (roleColor)
- Avatar con bordo colorato
- Badge ruolo con opacity sul colore
- Descrizione
- Footer con icone social

**Esempio di utilizzo:**
```tsx

```

---

### 4. Section (`components/Section.tsx`)

**Funzionalità:**
- Hero section riutilizzabile
- Background image con gradient overlay
- Responsive height

**Props:**
```typescript
{ children: React.ReactNode }
```

**Caratteristiche:**
- Background: immagine con mask gradient
- Altezze responsive (h-144 mobile, h-96 md, h-72 lg)
- Animazione fade-in automatica

**Esempio di utilizzo:**
```tsx

  Titolo Pagina
  Descrizione

```

---

### 5. Footer (`components/Footer.tsx`)

**Funzionalità:**
- Footer con link legali
- Icone social
- Layout responsive

**Props:** Nessuna

**Sezioni:**
- Link legali (Terms, Privacy, Cookies)
- Social media icons (Facebook, Instagram, Twitter, GitHub)

---

### 6. Separator (`components/Separator.tsx`)

**Funzionalità:**
- Separatore visivo decorativo

**Props:** Nessuna

**Stile:**
- Linea tratteggiata (`border-dashed`)
- Margini verticali automatici
- Max width: 5xl

---

## 📄 Pagine {#pagine}

### 1. Home (`pages/Home.tsx`)

**Route:** `/`

**Struttura:**
```tsx

 // Hero section con background fullscreen
   // Background image
   // Content overlay
    Find Your Hike Mates
     // Logo
  


```

**Caratteristiche:**
- Background fullscreen con parallax
- Animazioni staggered (fast e slow)
- Logo centralo
- Responsive text sizing

---

### 2. About (`pages/About.tsx`)

**Route:** `/about`

**Sezioni:**
1. Hero section con titolo
2. Grid di card membri del team
3. Missione dell'azienda
4. Call-to-action contatti

**Dati:**
```typescript
const teamMembers: TeamMember[] = [...]
const missions: Mission[] = [...]
```

**Animazioni:**
- Framer Motion `whileInView` per rivelazione contenuti
- Viewport trigger: `{ once: true }`

---

### 3. Groups (`pages/Groups.tsx`)

**Route:** `/groups`

**Funzionalità:**
- Visualizzazione gruppi
- Filtri avanzati (mobile e desktop)
- Creazione nuovo gruppo

**Componenti utilizzati:**
- `FormGruppo` - Modal creazione
- `FilterAltIcon` - Icona filtri
- `Slider` (MUI) - Range lunghezza
- `Rating` (MUI) - Filtro valutazione

**Layout Filtri:**
- Desktop: Inline nella barra di ricerca
- Mobile: Drawer dal basso

**Stati:**
```typescript
const [difficolta, setDifficolta] = useState('Facile')
const [FormAperta, setForm] = useState(false)
const [isMenuOpen, setMenuOpen] = useState(false)
```

---

### 4. Login (`pages/Login.tsx`)

**Route:** `/login`

**Form Fields:**
- Username (text)
- Password (password con toggle visibility)
- Remember me (checkbox)

**Caratteristiche:**
- Toggle show/hide password con icone SVG
- Link "Password dimenticata?"
- Separatore "oppure"
- Login con Google (button con logo)
- Link a Sign Up

**Layout:**
- Centrato verticalmente e orizzontalmente
- Card con shadow e border
- Logo in alto

---

### 5. SignUp (`pages/SignUp.tsx`)

**Route:** `/signup`

**Form Fields:**
- Nome e Cognome (grid 2 colonne)
- Username
- Email
- Password e Conferma Password (con toggle visibility)
- Checkbox Terms & Conditions

**Validazione:**
- Controllo corrispondenza password
```typescript
if (password !== confirmPassword) {
  alert("Le password non corrispondono")
  return
}
```

**Layout:**
- Max width: 2xl
- Grid responsive per nome/cognome
- Toggle password separati per ogni campo

---

## 🎨 Styling {#styling}

### TailwindCSS Custom Theme

```css
@theme {
  /* Mine Shaft Color Palette */
  --color-mine-shaft-50: #f0f0f3;
  --color-mine-shaft-100: #e7e7e7;
  /* ... */
  --color-mine-shaft-950: #2b2b2b;
  
  /* Custom Variables */
  --radius-buttons: 4rem;
  --radius-large: 2rem;
  
  /* Animations */
  --animate-slideFadeIn-fast: slideFadeIn 0.6s ease-out 0.2s backwards;
  --animate-slideFadeIn-slow: slideFadeIn 0.6s ease-out 0.4s backwards;
}
```

### Animazioni Custom

#### slideFadeIn
```css
@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Utility Classes Custom

#### Navbar Underline Animation
```css
.navbar-item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: black;
  width: 0;
  transition: width 0.5s ease-out;
}

.navbar-item:hover::after {
  width: 100%;
}
```

#### Hero Section
```css
.sezione-iniziale {
  background: linear-gradient(
    rgba(0, 0, 0, 0), 
    var(--color-mine-shaft-50)
  ),
  url("/images/SfondoTagliato.jpg") center/cover no-repeat;
  min-height: 50vh;
  mask-image: linear-gradient(to bottom, black 83%, transparent 90%);
}
```

### Classi Riutilizzabili

```typescript
// Input text style
const inputTxtStyle = "w-full px-4 py-3 bg-white border border-mine-shaft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all"

// Button styles
const btnStyleDesk = "font-bold text-md text-center w-32 h-12 rounded-(--radius-buttons) flex items-center justify-center transition delay-100 duration-300 ease-in-out hover:translate-y-1"
```

---

## 🛣️ Routing {#routing}

### Router Setup

```tsx
// main.tsx

  

```

**Nota:** Si usa `HashRouter` invece di `BrowserRouter` per compatibilità con GitHub Pages.

### Route Configuration

```tsx
// App.tsx

  } />
  } />
  } />
  } />
  } />

```

### Navigation

Utilizzo di `Link` component di React Router:

```tsx
import { Link } from 'react-router-dom'

About Us
```

---

## 🔄 State Management {#state-management}

Il progetto utilizza principalmente **useState** di React per la gestione dello stato locale.

### Esempi di Stati

#### Form States
```typescript
// Login.tsx
const [showPassword, setShowPassword] = useState(false)
const [password, setPassword] = useState("")
const [rememberMe, setRememberMe] = useState(false)
```

#### UI States
```typescript
// Navbar.tsx
const [isMenuOpen, setMenuOpen] = useState(false)

// Groups.tsx
const [difficolta, setDifficolta] = useState('Facile')
const [FormAperta, setForm] = useState(false)
```

### Future State Management

Per scalare l'applicazione, si potrebbe considerare:
- **Context API** per stato globale (utente autenticato)
- **React Query** per gestione dati server
- **Zustand** o **Redux Toolkit** per state management complesso

---

## ⚡ Performance {#performance}

### Ottimizzazioni Implementate

1. **Vite Build Tool**
   - HMR (Hot Module Replacement)
   - Code splitting automatico
   - Tree shaking

2. **Lazy Loading**
   - Immagini caricate on-demand
   - Componenti ottimizzati per rendering

3. **CSS Optimization**
   - TailwindCSS purge in produzione
   - Critical CSS inline

4. **Animations**
   - Hardware acceleration con `will-change`
   - Framer Motion con `AnimatePresence`

### Build per Produzione

```bash
npm run build
```

Output ottimizzato in `dist/`:
- Minificazione JavaScript e CSS
- Asset hashing per cache busting
- Source maps per debugging

---

## ✅ Best Practices {#best-practices}

### TypeScript

1. **Type Safety**
   ```typescript
   interface TeamMember {
     name: string;
     role: string;
     description: string;
     image: string;
     roleColor: string;
     email: string;
   }
   ```

2. **Props Typing**
   ```typescript
   const Card: React.FC<CardProps> = ({ name, role, ... }) => {
     // ...
   }
   ```

### React

1. **Component Organization**
   - Un componente per file
   - Props interface dichiarata esplicitamente
   - Separazione componenti/pagine

2. **Naming Conventions**
   - PascalCase per componenti
   - camelCase per funzioni e variabili
   - UPPER_CASE per costanti

3. **Event Handlers**
   ```typescript
   const handleSubmit = () => {
     // logic
   }
   ```

### CSS

1. **Utility-First con Tailwind**
   - Priorità a classi utility
   - Custom CSS solo quando necessario
   - Variabili CSS per valori riutilizzabili

2. **Responsive Design**
   ```tsx
   className="text-sm md:text-base lg:text-lg"
   ```

3. **Hover States**
   ```tsx
   className="hover:bg-gray-100 transition-colors"
   ```

### Accessibilità

1. **Semantic HTML**
   ```tsx
   <button aria-label="close menu">
     <CloseIcon />
   </button>
   ```

2. **Form Labels**
   ```tsx
   <label htmlFor="email">Email</label>
   <input id="email" type="email" />
   ```

3. **Focus States**
   - Focus visible su tutti gli elementi interattivi
   - `focus:ring` per indicatori chiari

---

## 🧪 Testing (Futuro)

### Suggested Testing Strategy

1. **Unit Tests**
   - Jest + React Testing Library
   - Test componenti isolati

2. **Integration Tests**
   - Test user flows
   - Test form submissions

3. **E2E Tests**
   - Cypress o Playwright
   - Test critical paths

---

## 🚀 Deployment

### GitHub Pages

1. **Configurazione package.json**
   ```json
   "homepage": "https://jonathangiovannini.github.io/Progetti"
   ```

2. **Scripts**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. **Deploy Process**
   ```bash
   npm run deploy
   ```

### Continuous Integration (Futuro)

- GitHub Actions per CI/CD
- Automated testing su PR
- Automatic deployment su merge to main

---

## 📞 Supporto

Per domande o problemi:
- Apri una [Issue su GitHub](https://github.com/jonathangiovannini/Progetti/issues)
- Contatta il team: team@hikenest.com

---

**Ultimo aggiornamento:** Dicembre 2025
**Versione:** 0.0.0
**Autori:** Team HikeNest - Università di Trento