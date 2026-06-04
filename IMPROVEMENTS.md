# AfEONet — Spec améliorations : Carte interactive + Overview + Dashboard

> Branche : `feature/interactive-map-countries`
> Objectif : carte Afrique interactive (choropleth statut), ajout de 27 pays manquants,
> source de données unique, filtres dashboard fonctionnels, mise en page améliorée.
>
> Ce document est l'instruction de travail complète pour un agent. Suivre les phases dans l'ordre.

---

## Contexte technique

- **Stack** : Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + shadcn/ui
- **Package manager** : npm (`package-lock.json`)
- **Statuts civic space** (5) : `open` → `narrowed` → `obstructed` → `repressed` → `closed`
- **Couleurs statut** : variables CSS dans `app/globals.css` (lignes ~40-44 et ~95-112)
  ```
  --status-open: 120 100% 35%;      .status-open
  --status-narrowed: 45 100% 50%;   .status-narrowed   (texte NOIR, fond jaune)
  --status-obstructed: 30 100% 50%; .status-obstructed
  --status-repressed: 30 100% 30%;  .status-repressed
  --status-closed: 0 100% 50%;      .status-closed
  ```
- **Déploiement** : Netlify `lucky-marzipan-06fcb4`, `images: { unoptimized: true }` dans `next.config.ts`

### Fichiers concernés (état AVANT)

| Fichier | Rôle actuel | Problème |
|---|---|---|
| `components/africa-map.tsx` | 20 pays hardcodés + grille régions | Carte = placeholder texte (lignes 105-112), pas interactive |
| `components/country-selector.tsx` | 10 pays hardcodés (liste séparée) | Désynchro avec africa-map ; `onSelect` ignoré en dashboard |
| `components/status-legend.tsx` | 5 statuts (légende) | OK, à étendre avec statut `unknown` |
| `app/page.tsx` (§156-179) | Section "Overview of Civic Space in Africa" | Carte placeholder, pas de stats |
| `app/dashboard/page.tsx` | 8 dimensions hardcodées + filtres | Filtres MORTS (`onSelect={() => {}}`, state non câblé) |

---

## Phase 1 — Source unique de données : `lib/countries.ts`

Créer `lib/countries.ts`. Remplace les listes de `africa-map.tsx` et `country-selector.tsx`.

```ts
export type CivicStatus = "open" | "narrowed" | "obstructed" | "repressed" | "closed"
export type Region =
  | "West Africa"
  | "East Africa"
  | "North Africa"
  | "Central Africa"
  | "Southern Africa"

export interface Country {
  iso2: string                  // minuscule, clé UI existante (ex "sn")
  iso3: string                  // MAJUSCULE, jointure topojson (ex "SEN")
  name: string
  region: Region
  status: CivicStatus | null    // null = pays non encore évalué → gris
}
```

### Liste exacte des 47 pays (iso2, iso3, name, region, status)

**20 pays existants — REPRENDRE le statut actuel de `africa-map.tsx` :**

| iso2 | iso3 | name | region | status |
|---|---|---|---|---|
| dz | DZA | Algeria | North Africa | narrowed |
| eg | EGY | Egypt | North Africa | closed |
| ng | NGA | Nigeria | West Africa | obstructed |
| za | ZAF | South Africa | Southern Africa | narrowed |
| ke | KEN | Kenya | East Africa | repressed |
| gh | GHA | Ghana | West Africa | open |
| ci | CIV | Ivory Coast | West Africa | repressed |
| cm | CMR | Cameroon | Central Africa | repressed |
| ml | MLI | Mali | West Africa | closed |
| bf | BFA | Burkina Faso | West Africa | closed |
| tz | TZA | Tanzania | East Africa | obstructed |
| et | ETH | Ethiopia | East Africa | repressed |
| cd | COD | DR Congo | Central Africa | closed |
| ma | MAR | Morocco | North Africa | repressed |
| tn | TUN | Tunisia | North Africa | narrowed |
| ug | UGA | Uganda | East Africa | repressed |
| rw | RWA | Rwanda | East Africa | repressed |
| zw | ZWE | Zimbabwe | Southern Africa | repressed |
| mz | MOZ | Mozambique | Southern Africa | obstructed |
| sn | SEN | Senegal | West Africa | open |

**27 pays NOUVEAUX — `status: null` (non évalués) :**

| iso2 | iso3 | name | region | status |
|---|---|---|---|---|
| so | SOM | Somalia | East Africa | null |
| ss | SSD | South Sudan | East Africa | null |
| bi | BDI | Burundi | East Africa | null |
| dj | DJI | Djibouti | East Africa | null |
| er | ERI | Eritrea | East Africa | null |
| sl | SLE | Sierra Leone | West Africa | null |
| ne | NER | Niger | West Africa | null |
| gw | GNB | Guinea-Bissau | West Africa | null |
| gn | GIN | Guinea | West Africa | null |
| tg | TGO | Togo | West Africa | null |
| bj | BEN | Benin | West Africa | null |
| zm | ZMB | Zambia | Southern Africa | null |
| bw | BWA | Botswana | Southern Africa | null |
| na | NAM | Namibia | Southern Africa | null |
| ao | AGO | Angola | Southern Africa | null |
| mg | MDG | Madagascar | Southern Africa | null |
| ls | LSO | Lesotho | Southern Africa | null |
| km | COM | Comoros | Southern Africa | null |
| mu | MUS | Mauritius | Southern Africa | null |
| mw | MWI | Malawi | Southern Africa | null |
| sz | SWZ | Eswatini | Southern Africa | null |
| sc | SYC | Seychelles | Southern Africa | null |
| td | TCD | Chad | Central Africa | null |
| ga | GAB | Gabon | Central Africa | null |
| cf | CAF | Central African Republic | Central Africa | null |
| cg | COG | Republic of the Congo | Central Africa | null |
| gq | GNQ | Equatorial Guinea | Central Africa | null |

> **Note** : Africa = 54 pays. 7 encore absents (Liberia/LBR, Gambia/GMB, Mauritania/MRT,
> Cape Verde/CPV, São Tomé/STP, Sudan/SDN, Libya/LBY). Hors périmètre actuel mais
> la carte doit les afficher en gris (statut inconnu) si le topojson les contient.

### Helpers à exporter

```ts
export const countries: Country[] = [ /* 47 ci-dessus */ ]

export const REGIONS: Region[] = [
  "West Africa", "East Africa", "North Africa", "Central Africa", "Southern Africa",
]

export function byRegion(region: Region): Country[]
export function byIso3(iso3: string): Country | undefined   // jointure carte
export function byIso2(iso2: string): Country | undefined

// Couleur choropleth : retourne la classe CSS OU la valeur hsl()
// status null → gris neutre (voir Phase 2 : ajouter --status-unknown)
export function statusClass(status: CivicStatus | null): string
export function statusLabel(status: CivicStatus | null): string      // ex "Open/free/secure", null → "Not assessed"
export function statusDescription(status: CivicStatus | null): string

// Stats Overview (Phase 3)
export function statusCounts(): Record<CivicStatus | "unknown", number>
```

Reprendre `getStatusLabel`/`getStatusDescription` existants de `africa-map.tsx` (lignes 57-89) dans ces helpers.

---

## Phase 2 — Carte interactive (react-simple-maps)

### 2.1 Installer

```bash
npm i react-simple-maps d3-geo --legacy-peer-deps
npm i -D @types/react-simple-maps @types/d3-geo --legacy-peer-deps
```

> `--legacy-peer-deps` requis : react-simple-maps v3 déclare peer React ≤18, mais
> fonctionne en runtime avec React 19 (rendu SVG only). Vérifier que le build Netlify
> passe (ajouter `legacy-peer-deps=true` dans `.npmrc` à la racine pour que Netlify l'applique).

**Créer `.npmrc`** à la racine :
```
legacy-peer-deps=true
```

### 2.2 Données géo

Ajouter un topojson Afrique dans `public/data/africa.topojson`.
- Source recommandée : world-atlas (`countries-110m.json`) filtré sur l'Afrique,
  OU un topojson Afrique dédié avec propriété ISO_A3 par feature.
- **Critère** : chaque feature doit exposer un code ISO_A3 (`properties.ISO_A3` ou `id`)
  pour la jointure avec `byIso3()`.
- Charger via `fetch("/data/africa.topojson")` ou import statique.
- Vérifier les codes ISO_A3 du fichier (certains datasets utilisent `-99` pour des
  territoires) — logguer les features non matchées en dev.

### 2.3 Réécrire `components/africa-map.tsx`

Garder l'API publique : `export function AfricaMap()`, utilisée par `app/page.tsx` ET `app/dashboard/page.tsx`.

Ajouter des props optionnelles pour le câblage dashboard (Phase 4) :

```ts
interface AfricaMapProps {
  selectedIso2?: string | null
  onSelectCountry?: (iso2: string | null) => void
  // si non fournis → composant gère son propre state interne (comportement homepage)
}
```

Structure :
```tsx
"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { geoCentroid } from "d3-geo" // si besoin labels
import { countries, byIso3, statusClass, statusLabel } from "@/lib/countries"

// projection geoMercator OU geoEqualEarth, center sur Afrique (~[20, 0]), scale adapté
// <Geography> fill = couleur statut via byIso3(feature ISO3)
//   - hover  → tooltip (nom + statut)  [garder simple : title SVG ou tooltip shadcn]
//   - click  → onSelectCountry(iso2) OU state interne ; panneau détail (réutiliser
//              bloc lignes 144-167 de l'actuel)
//   - pays sans data (null) → gris ; pays hors-périmètre → gris clair
//   - selected → stroke/ring visible
```

**Conserver la grille régions** sous la carte comme fallback accessible + vue mobile
(reprendre lignes 115-142 actuelles, mais alimentées par `byRegion()` depuis `lib/countries.ts`).
Supprimer la boîte placeholder (lignes 104-113) et la note "detailed interactive SVG map…" (lignes 169-171).

### 2.4 Statut `unknown` (gris)

Ajouter dans `app/globals.css` :
```css
--status-unknown: 220 9% 75%;   /* gris neutre */
.status-unknown { @apply bg-[hsl(var(--status-unknown))]; }
```
Et l'inclure dans `statusClass(null)` → `"status-unknown"`.

---

## Phase 3 — Overview homepage (`app/page.tsx`)

Section §156-179 ("Overview of Civic Space in Africa").

- Carte interactive (mode state interne, pas de props dashboard).
- Ajouter une **bande stats live** sous le titre, dérivée de `statusCounts()` :
  - 1 carte/compteur par statut : `X Open`, `Y Narrowed`, … `Z Not assessed`
  - + total pays couverts (`status != null`) / 54
- Légende compacte (`StatusLegend`) sous la carte — étendre `status-legend.tsx`
  avec l'entrée "Not assessed" (gris).
- Garder le CTA "View full dashboard".

**Layout cible** : carte 2/3 + panneau stats latéral 1/3 sur `lg`, empilé sur mobile
(cohérent avec le grid du dashboard).

---

## Phase 4 — Dashboard (`app/dashboard/page.tsx`)

### 4.1 `country-selector.tsx` → consommer `lib/countries.ts`
Remplacer la liste hardcodée de 10 pays par les 47 de `countries` (mapper `iso2`→value, `name`→label).

### 4.2 Câbler les filtres (actuellement MORTS)
- `app/dashboard/page.tsx` : ajouter state `selectedCountry` (iso2), garder `selectedYear`, ajouter `selectedDimension`.
- `CountrySelector onSelect` → setSelectedCountry (ligne 151 : actuellement `() => {}`).
- Synchroniser carte ↔ selector : passer `selectedIso2` + `onSelectCountry` à `<AfricaMap>`.
- Filtre dimension (`Select` lignes 168-183) → filtrer `dimensionsData` affiché (lignes 215-237).
- Bouton "Apply filters" → applique le filtre (ou filtrage live, retirer le bouton si live).

### 4.3 Export data
- "Export data" (lignes 188-190) → générer CSV des dimensions filtrées (client-side blob download).
- Si non implémenté → **retirer le bouton** (ne pas laisser un bouton trompeur mort).

---

## Phase 5 — Mise en page / polish

- Overview : grid carte 2/3 + stats 1/3 (`lg:grid-cols-3`).
- Carte SVG responsive : `preserveAspectRatio`, hauteur fluide, grille fallback `< md`.
- Dark mode : vérifier contraste statut `narrowed` (jaune → texte noir, déjà géré ligne 131 actuelle) et `unknown` (gris) sur fond `slate-800`.
- Tooltip carte : composant `Tooltip` shadcn déjà dispo (`components/ui/tooltip.tsx`).

---

## Vérification finale

```bash
npm run build          # doit passer (vérifier legacy-peer-deps via .npmrc)
npm run dev            # vérifier carte interactive, hover, click, filtres dashboard
```

Checklist :
- [ ] `lib/countries.ts` = 47 pays, helpers exportés
- [ ] `africa-map.tsx` carte choropleth + grille fallback, plus de placeholder
- [ ] homepage : carte + bande stats live + légende étendue
- [ ] dashboard : 47 pays dans selector, filtres câblés, carte↔selector sync
- [ ] export CSV OU bouton retiré
- [ ] statut `unknown` gris (CSS + légende)
- [ ] `.npmrc` `legacy-peer-deps=true` commité (build Netlify)
- [ ] `npm run build` OK

## Commits (style projet : PAS de Co-Authored-By)
Conventional commits. Suggéré 1 commit/phase :
- `feat(data): add lib/countries.ts with 47 African countries`
- `feat(map): interactive choropleth Africa map via react-simple-maps`
- `feat(home): live status stats in civic space overview`
- `feat(dashboard): wire country/dimension filters + map sync`
- `style: responsive layout polish + unknown status`
