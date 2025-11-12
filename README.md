# CityPulse

CityPulse est une application **Vue 3 + TypeScript + Vite** qui affiche des **données urbaines en temps réel** (météo, qualité de l’air, etc.) avec **Leaflet** (carte) et **Chart.js** (graphiques).  
Objectif : fournir un front moderne, performant et accessible, prêt à connecter des APIs publiques.

---

## 🧱 Stack technique

- **Vue 3** (Composition API) + **Vite**
- **TypeScript** strict
- **Pinia** (state) + **Vue Router**
- **TailwindCSS** (via PostCSS)
- **Leaflet** (cartes OpenStreetMap)
- **Chart.js** (dataviz) + **vue-chartjs**
- **Axios** + **Zod** (HTTP + validation de schémas)
- Tests : **Vitest** (+ Playwright optionnel pour e2e)
- CI : GitHub Actions (lint, test, build)

---

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm i

# Copier l'exemple d'environnement
cp .env.example .env

# Lancer le serveur de dev
npm run dev
```

Par défaut, Vite démarre sur **http://localhost:5173/**.

> Sous Windows PowerShell, la commande `cp` peut être remplacée par :
> ```powershell
> Copy-Item ".env.example" ".env"
> ```

---

## ⚙️ Scripts NPM

- `npm run dev` – Lance le serveur Vite (développement)
- `npm run build` – Build production
- `npm run preview` – Prévisualise le build prod
- `npm run test` – Exécute Vitest (unitaires)

---

## 🔑 Variables d’environnement

Fichier **`.env.example`** :

```env
# Base URL pour un proxy (facultatif). Laisser "/" pour appels directs.
VITE_API_BASE="/"

# Tuile de carte Leaflet (OpenStreetMap)
VITE_MAP_TILE_URL="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
```

Copier ce fichier en `.env` et adapter selon vos besoins.

---

## 🗂️ Structure de base (front)

```
src/
  components/
    city/
    charts/
    common/
  features/
    search/
  pages/
    Home.vue
    City.vue
    Compare.vue
    Favorites.vue
  router/
    index.ts
  services/
    http.ts
    geo.service.ts
    weather.service.ts
    air.service.ts
  stores/
  styles/
    index.css
    theme.css
  types/
    city.ts
    weather.ts
    air.ts
```

---

## 🧭 Roadmap (extrait)

- **P1 (MVP)** : recherche de ville (autocomplete), météo actuelle + 7j, air (AQI), carte Leaflet, comparaison 2 villes, responsive, erreurs réseau gérées.
- **P2 (UX/Data)** : graphiques (températures, pollution), favoris, cache IndexedDB (SWR), scores Teleport.
- **P3 (Prod)** : PWA (SW + manifest), partage d’URL compare, export PDF, CI/CD + déploiement.

---

## 🆘 Dépannage – Erreur Tailwind/PostCSS

Si, lors du `npm run dev`, vous voyez :

```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

Cela signifie que Tailwind **doit** maintenant être chargé via le **plugin PostCSS dédié**.

### ✅ Correctif

1) **Installer le plugin PostCSS officiel** :

```bash
npm i -D @tailwindcss/postcss autoprefixer
```

2) **Mettre à jour `postcss.config.js`** au format ESM :

```js
// postcss.config.js
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};
```

> Remplacez l’ancienne config :
> ```js
> export default {
>   plugins: {
>     tailwindcss: {},
>     autoprefixer: {},
>   },
> }
> ```
> par la nouvelle ci-dessus.

3) **Vérifier vos styles** : conservez les directives dans `src/styles/theme.css` / `index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4) **Relancer le serveur** :
```bash
npm run dev
```

> Si l’erreur persiste, supprimez le cache Vite/Node et réinstallez :
> ```bash
> rm -rf node_modules .vite
> npm i
> npm run dev
> ```
> Sous Windows PowerShell :
> ```powershell
> Remove-Item "node_modules" -Recurse -Force
> Remove-Item "node_modules/.vite" -Recurse -Force -ErrorAction SilentlyContinue
> npm i
> npm run dev
> ```

---

## 🧪 Tests

```bash
# Unitaires
npm run test

# E2E (optionnel si Playwright est configuré)
# npx playwright install
# npm run test:e2e
```

---

## 🔒 Qualité & CI

- ESLint + Prettier + TypeScript strict
- GitHub Actions : lint → test → build
- Lighthouse (cibles 90+ sur Performance / A11y / Best Practices / SEO)

---

## 📄 Licence

MIT
