# Instructions pour l'Agent Code — AfEONet

## Contexte

**Projet:** AfEONet Platform (AHEAD Africa)
**Stack:** Next.js 15 + TypeScript + Tailwind + MDX + Decap CMS
**Déploiement:** https://afeonetweb.netlify.app/

**Source de données:** Rapport Abel Eseru 2025 — "Eyes on the Ballot Watchers"
- 21 pays évalués sur 8 dimensions (scores 0-10)
- 5 catégories: Closed | Repressed | Obstructed | Restricted | Open

---

## Fichiers de données préparés

1. **`data/country-scores.json`** — Scores des 21 pays × 8 dimensions
2. **`data/alerts.json`** — 12 alertes extraites du rapport
3. **`IMPROVEMENTS-AfeONet.md`** — Analyse complète et propositions

---

## Workflow Git

**Branche:** `feat/data-update-2025`
**Base:** `main`

```bash
git checkout -b feat/data-update-2025

# Commit régulier (conventional commits)
git commit -m "feat(data): add country scores JSON with 21 countries"
git commit -m "feat(reports): create 21 country report MDX files"
git commit -m "feat(alerts): add 12 new alerts from 2025 report"
git commit -m "feat(components): add radar chart and heatmap components"
git commit -m "feat(dashboard): implement global and country dimension views"
git commit -m "feat(cms): update Decap CMS config for new collections"
git commit -m "fix(countries): update country statuses with 2025 scores"

git push origin feat/data-update-2025
```

---

## Plan de travail (5 phases)

### Phase 1: Données (1-2 jours)
- [ ] Lire `data/country-scores.json` et `data/alerts.json`
- [ ] Mettre à jour `lib/countries.ts` avec les nouveaux scores et catégories
- [ ] Créer les 21 MDX reports dans `content/reports/` (un par pays)
- [ ] Créer les 12 MDX alerts dans `content/alerts/` (nouvelles alertes)
- [ ] Créer `content/data/` pour les données structurées

### Phase 2: Components (1-2 jours)
- [ ] **`ScoreCard`** — Carte résumé pays avec score composite
- [ ] **`CountryRadarChart`** — Radar chart des 8 dimensions (utiliser recharts ou chart.js)
- [ ] **`DimensionHeatmap`** — Heatmap pays × dimensions
- [ ] **`ComparisonTool`** — Comparer 2 pays côte à côte
- [ ] Mettre à jour **`AfricaMap`** — Couleurs par catégorie (pas par statut simple)
- [ ] Mettre à jour **`CountrySelector`** — 47 pays avec scores

### Phase 3: Pages (2-3 jours)
- [ ] **`/reports`** — Grille avec vrais reports (filtrable par région, status)
- [ ] **`/reports/[slug]`** — Fiche pays détaillée avec:
  - Score composite + catégorie
  - Radar chart des 8 dimensions
  - Résumé du rapport
  - Recommandations
  - **Alertes liées** (filtrage par country)
  - **News liées** (filtrage par country)
  - **Filtre d'actualité** par type (reports, alerts, news)
- [ ] **`/countries/[iso2]`** — Page pays dédiée (optionnel, peut rediriger vers `/reports/[slug]`)
  - Tous les contenus liés à ce pays (reports, alerts, news)
  - Filtre par type de contenu
  - Radar chart des 8 dimensions
  - Score composite
- [ ] **`/dashboard`** — Dashboard complet avec:
  - **Vue Globale:** Moyennes des 8 dimensions sur 21 pays
  - **Vue par Pays:** Sélection via carte ou dropdown
  - **Comparaison:** Sélectionner 2 pays pour comparer
  - **Filtres:** Pays, Année, Dimension, Région, Status
  - **URL State:** `/dashboard?country=ghana&compare=kenya&dimension=all`
- [ ] **`/alerts`** — Liste des alertes avec filtres (sévérité, type, pays)
- [ ] **`/alerts/[id]`** — Détail d'une alerte
- [ ] **Homepage** — Stats dynamiques + overview + carte interactive

### Phase 4: CMS (1 jour)
- [ ] Configurer Decap CMS dans `public/admin/config.yml`
- [ ] Reports collection — champs dimension scores (8 champs number 0-10)
- [ ] Alerts collection — champs sévérité (select), type (select), dimension (select)
- [ ] News collection — champs liés pays (relation avec country-scores)
- [ ] Ajouter collection "Country Scores" pour les données brutes (editable via CMS)
- [ ] Vérifier que le CMS peut créer/éditer les nouveaux types de contenu

### Phase 5: Tests & Polish (1 jour)
- [ ] Vérifier `npm run build`
- [ ] Vérifier responsive (mobile)
- [ ] Vérifier dark mode
- [ ] Vérifier les liens internes
- [ ] Vérifier les données JSON
- [ ] Vérifier le CMS (créer un test report via `/admin`)

---

## Architecture des données

### Vue Globale (défaut du dashboard)
```typescript
const globalDimensions = {
  regulatory: 5.4,      // moyenne dim1 des 21 pays
  administrative: 5.1,
  embRelationship: 5.6,
  security: 4.5,
  dataAccess: 5.5,
  funding: 4.4,
  dialogue: 5.5,
  perception: 5.6,
  composite: 5.2
}
```

### Vue par Pays
```typescript
const countryDimensions = {
  regulatory: country.scores.dimension1,     // 0-10
  administrative: country.scores.dimension2,
  embRelationship: country.scores.dimension3,
  security: country.scores.dimension4,
  dataAccess: country.scores.dimension5,
  funding: country.scores.dimension6,
  dialogue: country.scores.dimension7,
  perception: country.scores.dimension8,
  composite: country.scores.composite         // moyenne
}
```

### Composant `DimensionCard` adaptatif
```typescript
interface DimensionCardProps {
  dimension: Dimension        // { id, title, description }
  score: number              // 0-10
  context: 'global' | 'country' | 'comparison'
  countryName?: string
  globalAverage?: number      // pour comparaison
  trend?: 'improving' | 'deteriorating' | 'stable'
}
```

---

## Règles importantes

1. **Ne pas coder sans consulter les données** — Toujours lire `country-scores.json` et `alerts.json`
2. **Les scores sont des estimations** — Utiliser les valeurs du JSON, les mettre à jour quand Abel fournit les exacts
3. **Carte couleur par catégorie** — Pas par statut simple: Closed=rouge, Repressed=rouge foncé, Obstructed=orange, Restricted=jaune, Open=vert
4. **Dashboard double vue** — Globale (moyennes) + Pays (individuel) + Comparaison
5. **URL State** — Le dashboard doit refléter les filtres dans l'URL
6. **Responsive** — Mobile-first, grille adaptable
7. **Dark mode** — Vérifier les contrastes
8. **Build** — Toujours vérifier `npm run build` avant de commit

---

## Fichiers à ne PAS modifier

- `app/globals.css` (sauf ajouter `--status-unknown`)
- `components/ui/*` (shadcn/ui components)
- `public/data/world-110m.json` (carte TopoJSON)
- `.npmrc` (déjà configuré avec `legacy-peer-deps=true`)

---

## Fichiers à créer/modifier

### Nouveaux fichiers
```
content/data/country-scores.json    → Copier depuis data/country-scores.json
content/data/alerts.json            → Copier depuis data/alerts.json
content/reports/*.mdx               → 21 fiches pays
content/alerts/*.mdx                → 12 alertes
components/score-card.tsx
components/country-radar-chart.tsx
components/dimension-heatmap.tsx
components/comparison-tool.tsx
lib/reports-data.ts
lib/alerts-data.ts
```

### Fichiers à modifier
```
lib/countries.ts                    → Ajouter scores
lib/reports.ts                      → Lire les nouveaux MDX
components/africa-map.tsx           → Couleurs par catégorie
components/country-selector.tsx     → 47 pays avec scores
app/dashboard/page.tsx              → Filtres fonctionnels + double vue
app/reports/page.tsx                → Grille avec vrais reports
app/reports/[slug]/page.tsx         → Fiche pays détaillée
app/alerts/page.tsx                 → Liste avec filtres
app/page.tsx                        → Stats dynamiques
public/admin/config.yml             → CMS collections
```

---

## Liens entre contenus

### Architecture des liens
```
Country (Ghana)
  ├── Reports
  │   └── ghana-2025.mdx (country: "Ghana")
  ├── Alerts
  │   └── ghana-2025-funding.mdx (country: "Ghana")
  └── News
      └── ghana-election-2025.mdx (country: "Ghana")
```

### Champs de liaison dans les MDX
```mdx
# Reports
country: "Ghana"  # clé de liaison
relatedAlerts: ["ghana-2025-funding"]
relatedNews: ["ghana-election-2025"]

# Alerts
country: "Ghana"
relatedReports: ["ghana-2025"]
relatedNews: ["ghana-election-2025"]

# News
country: "Ghana"
relatedReports: ["ghana-2025"]
relatedAlerts: ["ghana-2025-funding"]
```

### Helpers pour les liens
```typescript
// lib/links.ts
export function getRelatedReports(country: string): Report[]
export function getRelatedAlerts(country: string): Alert[]
export function getRelatedNews(country: string): NewsArticle[]
```

### Filtre par pays
```typescript
// Sur chaque page (news, alerts, reports)
const filterByCountry = (items, country) => 
  items.filter(item => item.country === country)
```

---

## Questions ?

Consulter:
1. `IMPROVEMENTS-AfeONet.md` — Analyse complète
2. `data/country-scores.json` — Données brutes
3. `data/alerts.json` — Données alertes
4. Rapport PDF dans le dossier — pour référence

---

**Date:** 2026-06-11
**Préparé par:** kocc
**Pour:** Agent Code (AfEONet Development)
