# AfEONet — Proposition d'améliorations basée sur le rapport 2025

## Contexte

**Source :** Rapport Abel Eseru — "Eyes on the Ballot Watchers: The State of Civic Space for Citizen Election Observers in Africa" (Draft 2025)
- **21 pays** couverts sur 8 dimensions
- **Scores 0-10** par pays et par dimension
- **Catégories :** Closed (0-2) | Repressed/Threatened (3-4) | Obstructed (5-6) | Restricted (7-8) | Open/Free (9-10)

**Projet actuel :** https://github.com/AfricTivistes/AfEONet
- Stack: Next.js 15 + TypeScript + Tailwind + MDX
- Déployé: https://afeonetweb.netlify.app/
- CMS: Decap (ex-Netlify CMS) pour les contenus

---

## Problèmes identifiés

### 1. Données statiques et obsolètes
- Les `countries` dans `lib/countries.ts` ont des statuts qui ne correspondent PAS au rapport 2025
- Exemple: Ghana est `open` dans la plateforme mais le rapport le place comme `narrowed` (5-6) à cause du financement
- Le dashboard affiche des données "démonstration" (message jaune d'alerte)

### 2. Structure Reports vide
- `content/reports/` existe dans le code mais est vide
- La page `/reports` montre une grille vide ou placeholder
- Les reports devraient contenir les fiches pays du rapport

### 3. Alerts insuffisantes
- Seulement 3 alertes (Burkina Faso, Mali, Tanzania) — datées 2023
- Le rapport contient des cas d'alertes récentes dans 21 pays
- Pas de système de sévérité standardisé

### 4. News — incohérence des données
- Le frontmatter `country: Ghana` dans l'article Cameroon (erreur copié-collé)
- Les articles sont des copies du rapport global, pas des analyses spécifiques
- Pas de liens entre les news et les données de la carte

### 5. Dashboard — filtres morts
- Le filtre "Country" dans le dashboard ne fonctionne pas (onSelect vide)
- Les 8 dimensions sont hardcodées avec des statuts globaux, pas par pays
- Pas de filtre par année ou par région
- Les données ne sont pas liées aux pays réels

### 6. Homepage — Overview statique
- Les stats (54 pays, 1000+ observers, 250+ reports) sont en dur
- La carte n'affiche pas les données réelles du rapport
- Le compteur "X countries assessed" est basé sur les `status !== null` mais les statuts sont obsolètes

### 7. Manque de granularité
- Le rapport évalue par dimension (8) mais la plateforme montre un seul statut global
- Pas de visualisation par dimension par pays
- Pas de comparaison pays à pays
- Pas de tendances temporelles

---

## Propositions d'amélioration

### A. Structure de données (Priorité: CRITIQUE)

#### 1. Mettre à jour `lib/countries.ts` avec les scores réels du rapport

```typescript
// Nouvelle interface avec scores
export interface CountryScores {
  dimension1: number  // 0-10
  dimension2: number
  dimension3: number
  dimension4: number
  dimension5: number
  dimension6: number
  dimension7: number
  dimension8: number
  composite: number    // moyenne
}

export interface Country {
  iso2: string
  iso3: string
  isoNum: string
  name: string
  region: Region
  status: CivicStatus | null
  scores: CountryScores | null  // NOUVEAU
  reportYear: number | null     // 2025
  lastAssessment: string | null // date
}
```

**Données à extraire du rapport pour les 21 pays:**

| Pays | Score Composite | Catégorie | Notes |
|------|----------------|-----------|-------|
| Ghana | ~6.5 (narrowed) | EMB-CSO collaboration 9, mais funding 5 → moyenne 6.5 | |
| Nigeria | ~5.5 (obstructed) | IReV present mais funding limité, dialogue 6 | |
| Kenya | ~7.5 (restricted) | Innovation technologique mais contestation politique | |
| Botswana | ~9.0 (open) | Open/Free, accès transparent | |
| Eswatini | ~4.5 (repressed) | Public legitimacy mais constrained civic space | |
| Somalia | ~4.0 (repressed) | Fragility + external dependence | |
| Cameroon | ~5.0 (obstructed) | Selective openness, filtering politique | |
| Liberia | ~7.0 (restricted) | Post-conflict constraints, progressive | |
| South Sudan | ~3.5 (repressed) | Fragility, hostile environment | |
| Somaliland | ~8.0 (restricted) | Non-recognized but functional, progressive | |
| South Africa | ~8.0 (restricted) | Robust mais sustainability pressures | |
| Tanzania | ~4.5 (repressed) | Accreditation procedures restrictive | |
| Uganda | ~3.0 (repressed) | Hostile environment, mass arrests | |
| Zambia | ~6.0 (obstructed) | Déclin progressif, funding challenges | |
| Madagascar | ~5.0 (obstructed) | Instabilité politique, fragile | |
| Tunisia | ~6.5 (narrowed) | Transition post-révolution, dialogue ouvert | |
| Côte d'Ivoire | ~5.5 (obstructed) | Post-conflict, selective openness | |
| Chad | ~3.0 (repressed) | Transition militaire, hostile | |
| Congo Brazzaville | ~2.0 (closed) | Closed environment, virtually nonexistent | |
| Ethiopia | ~4.5 (repressed) | Reforming mais constraints persistent | |
| Zimbabwe | ~3.0 (repressed) | Repression, police raids | |

> **Note:** Les scores sont des estimations basées sur les descriptions du rapport. Un fichier JSON séparé permettra d'updater facilement sans toucher le code. Chaque dimension a un score 0-10, le composite est la moyenne.

> **Note:** Les scores exacts par dimension ne sont pas facilement extractibles du PDF. Il faudra les demander à Abel ou les estimer depuis le texte. Cette proposition utilise les indices trouvés dans le rapport.

#### 2. Nouveau fichier `lib/reports-data.ts`
Stocker les métadonnées des rapports pays:
```typescript
export interface CountryReport {
  slug: string           // ghana-2025
  countryIso2: string
  year: number
  title: string
  date: string
  status: CivicStatus
  compositeScore: number
  dimensions: number[]  // 8 scores
  summary: string
  keyFindings: string[]
  recommendations: string[]
  tags: string[]
}
```

### B. Reports — Fiches pays (Priorité: HAUTE)

**Structure MDX par pays:**
```mdx
---
slug: "ghana-2025"
country: "Ghana"
year: 2025
status: "narrowed"
compositeScore: 6.2
dimensions:
  regulatory: 8
  administrative: 7
  embRelationship: 9
  security: 6
  dataAccess: 7
  funding: 5
  dialogue: 8
  perception: 8
---

# Ghana: A Model of Institutionalized Civic Trust (2025)

## Overall Score: 6.2/10 — Narrowed

### Executive Summary
Long-standing EMB-CSO collaboration but heavy reliance on external funding...

### Dimension Breakdown
...

### Key Findings
- CODEO integrated since 2000
- National Civic Engagement Fund needed

### Recommendations
1. Establish National Civic Engagement Fund
2. Multi-year funding frameworks
3. Public-private partnerships

### Data Source
AfEONet Research Team, 2025
```

### C. Alerts — Système standardisé (Priorité: HAUTE)

**Structure MDX améliorée:**
```mdx
---
id: "UG-2025-001"
title: "Mass Arrests of Election Observers in Uganda"
date: "2025-01-15"
country: "Uganda"
region: "East Africa"
status: "repressed"
severity: "critical"  // critical | high | medium | low
dimension: 4  // Security
alertType: "arrest"  // arrest | threat | restriction | closure | other
affectedObservers: 27
sources: ["AfEONet Report 2025"]
relatedReports: ["uganda-2025"]
---

# Alert: Uganda — 27 Observers Arrested

## Summary
Mass arrests of election observers in January 2025...

## Impact
- Suspension of field activities
- Relocation of observer offices
- Cancellation of training programs

## Response
- Government response
- International reactions
- Observer adaptation

## Status: ACTIVE

## Related Reports
- [Uganda Full Report 2025](/reports/uganda-2025)
```

### D. News — Articles contextualisés (Priorité: MOYENNE)

**Améliorations:**
- Lier chaque article à un pays et un score
- Ajouter des tags dimensionnels
- Créer des articles de synthèse par région
- Ajouter une section "Trends" avec les données du rapport
- **CMS:** Collection News avec champs `country` (relation), `dimensionTags` (list), `score` (number)

### E. Dashboard — Filtres fonctionnels (Priorité: CRITIQUE)

**Améliorations:**
1. **Filtres réels:**
   - Country: dropdown avec les 21 pays évalués
   - Year: 2025 (2024, 2023 historiques)
   - Dimension: les 8 dimensions
   - Region: 5 régions
   - Status: 5 catégories

2. **Vue par pays:**
   - Radar chart ou bar chart des 8 dimensions
   - Score composite
   - Comparaison avec moyenne régionale
   - Tendance temporelle

3. **Vue par dimension:**
   - Heatmap des pays pour une dimension
   - Classement des pays
   - Tendances

4. **Export:**
   - CSV des données filtrées
   - PDF du rapport

### F. Homepage — Overview dynamique (Priorité: HAUTE)

**Améliorations:**
1. **Stats réelles:**
   - 21 pays évalués (pas 54)
   - 8 dimensions mesurées
   - X pays en détérioration
   - Y alertes actives

2. **Carte interactive:**
   - Couleurs par catégorie (pas par statut)
   - Hover: score composite + nom
   - Click: lien vers fiche pays
   - Zoom par région

3. **Section "Latest Insights":**
   - 3 derniers rapports
   - 3 alertes récentes
   - 1 tendance majeure

4. **Section "Countries at Risk":**
   - Liste des pays "Closed" et "Repressed"
   - Alertes en cours
   - Appel à action

### G. CMS — Configuration Decap (Priorité: CRITIQUE)

**Collections à ajouter/modifier:**

```yaml
# Collection Reports (avec scores dimensionnels)
- name: "reports"
  label: "Reports"
  folder: "content/reports"
  fields:
    - { name: "slug", label: "Slug", widget: "string" }
    - { name: "title", label: "Title", widget: "string" }
    - { name: "country", label: "Country", widget: "select", options: [...47 pays] }
    - { name: "year", label: "Year", widget: "number", value_type: "int" }
    - { name: "status", label: "Status", widget: "select", options: ["open", "narrowed", "obstructed", "repressed", "closed"] }
    - { name: "compositeScore", label: "Composite Score", widget: "number", value_type: "float", min: 0, max: 10 }
    - { name: "dimensions", label: "Dimensions", widget: "object", fields: [
        { name: "regulatory", label: "Regulatory Framework", widget: "number", min: 0, max: 10 },
        { name: "administrative", label: "Administrative", widget: "number", min: 0, max: 10 },
        { name: "embRelationship", label: "EMB Relationship", widget: "number", min: 0, max: 10 },
        { name: "security", label: "Security", widget: "number", min: 0, max: 10 },
        { name: "dataAccess", label: "Data Access", widget: "number", min: 0, max: 10 },
        { name: "funding", label: "Funding", widget: "number", min: 0, max: 10 },
        { name: "dialogue", label: "Dialogue", widget: "number", min: 0, max: 10 },
        { name: "perception", label: "Perception", widget: "number", min: 0, max: 10 }
    ]}
    - { name: "summary", label: "Summary", widget: "text" }
    - { name: "keyFindings", label: "Key Findings", widget: "list" }
    - { name: "recommendations", label: "Recommendations", widget: "list" }
    - { name: "tags", label: "Tags", widget: "list" }
    - { name: "body", label: "Content", widget: "markdown" }

# Collection Alerts (standardisée)
- name: "alerts"
  label: "Alerts"
  folder: "content/alerts"
  fields:
    - { name: "id", label: "Alert ID", widget: "string" }
    - { name: "title", label: "Title", widget: "string" }
    - { name: "date", label: "Date", widget: "datetime" }
    - { name: "country", label: "Country", widget: "select", options: [...47 pays] }
    - { name: "region", label: "Region", widget: "select", options: ["West Africa", "East Africa", "North Africa", "Central Africa", "Southern Africa"] }
    - { name: "status", label: "Status", widget: "select", options: ["open", "narrowed", "obstructed", "repressed", "closed"] }
    - { name: "severity", label: "Severity", widget: "select", options: ["critical", "high", "medium", "low"] }
    - { name: "dimension", label: "Dimension", widget: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8"] }
    - { name: "alertType", label: "Alert Type", widget: "select", options: ["arrest", "raid", "threat", "restriction", "closure", "other"] }
    - { name: "affectedObservers", label: "Affected Observers", widget: "number", required: false }
    - { name: "sources", label: "Sources", widget: "list" }
    - { name: "relatedReports", label: "Related Reports", widget: "list" }
    - { name: "body", label: "Content", widget: "markdown" }

# Collection Country Scores (données brutes)
- name: "country-scores"
  label: "Country Scores"
  folder: "content/data"
  create: false
  fields:
    - { name: "iso2", label: "ISO2", widget: "string" }
    - { name: "name", label: "Country Name", widget: "string" }
    - { name: "composite", label: "Composite Score", widget: "number", min: 0, max: 10 }
    - { name: "dimensions", label: "Dimensions", widget: "object" ... }
```

### G. Visualisations (Priorité: MOYENNE)

**Nouveaux composants:**
- `CountryRadarChart` — 8 dimensions en radar
- `DimensionHeatmap` — pays × dimensions
- `TrendChart` — évolution temporelle
- `ComparisonTool` — comparer 2 pays
- `ScoreCard` — carte résumé d'un pays

### H. Pages par Pays (Priorité: CRITIQUE)

**Nouvelle page `/countries/[iso2]` ou `/reports/[slug]` :**

Chaque pays évalué doit avoir une page dédiée avec:

```typescript
interface CountryPageProps {
  params: {
    iso2: string  // ex: "gh", "ng", "ke"
  }
}
```

**Sections de la page pays:**
1. **Header** — Nom, drapeau, score composite, catégorie
2. **Radar Chart** — 8 dimensions avec scores
3. **Score Card** — Détail des 8 dimensions avec barres
4. **Résumé** — Texte du rapport pour ce pays
5. **Key Findings** — Points clés (liste)
6. **Recommandations** — Recommandations spécifiques
7. **Alertes liées** — Alertes pour ce pays (filtrage par country)
8. **News liées** — Articles liés à ce pays (filtrage par country)
9. **Comparaison** — Bouton "Comparer avec un autre pays"

**Lien avec les autres contenus:**
- Reports → lié via `country` field
- Alerts → lié via `country` field  
- News → lié via `country` field
- Dashboard → lien vers le pays spécifique

### I. Filtrage par Pays (Priorité: HAUTE)

**Filtre d'actualité par pays:**
```typescript
// Sur la page /news
const newsByCountry = getAllNewsArticles().filter(
  article => article.country === selectedCountry
)

// Sur la page /alerts
const alertsByCountry = getAlerts().filter(
  alert => alert.country === selectedCountry
)

// Sur la page /reports
const reportsByCountry = getReports().filter(
  report => report.country === selectedCountry
)
```

**Composant `CountryFilter` :**
```typescript
interface CountryFilterProps {
  countries: Country[]
  selectedCountry: string | null
  onSelect: (iso2: string | null) => void
  showAllOption: boolean
}
```

### J. Liens entre contenus (Priorité: HAUTE)

**Architecture des liens:**
```
Country (Ghana)
  ├── Reports
  │   └── ghana-2025.mdx (country: "Ghana")
  ├── Alerts
  │   └── ghana-2025-funding.mdx (country: "Ghana")
  └── News
      └── ghana-election-2025.mdx (country: "Ghana")
```

**Champs de liaison dans les MDX:**
```mdx
---
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
---
```

**Helpers pour les liens:**
```typescript
// lib/links.ts
export function getRelatedReports(country: string): Report[]
export function getRelatedAlerts(country: string): Alert[]
export function getRelatedNews(country: string): NewsArticle[]
```

---

## Structure de fichiers proposée

```
content/
  reports/                    # 21 fiches pays (MDX)
    ghana-2025.mdx
    nigeria-2025.mdx
    ...
  alerts/                     # Alertes standardisées
    uganda-2025-arrests.mdx
    ...
  news/                       # Articles contextualisés
    civic-space-trends-2025.mdx
    ...
  data/                       # Données structurées
    country-scores.json       # Scores bruts
    alerts-registry.json      # Registre des alertes
    
lib/
  countries.ts                # Mise à jour avec scores
  reports-data.ts             # Métadonnées reports
  alerts-data.ts              # Métadonnées alertes
  
components/
  country-radar-chart.tsx     # Radar chart
  dimension-heatmap.tsx       # Heatmap
  score-card.tsx              # Carte résumé
  comparison-tool.tsx         # Comparaison
  
app/
  reports/[slug]/             # Fiche pays détaillée
  dashboard/                  # Dashboard avec vrais filtres
  page.tsx                    # Homepage dynamique
```

---

## Workflow Git (Feature Branch)

**Branche de travail:** `feat/data-update-2025`
**Base:** `main`

```bash
# Créer la branche
git checkout -b feat/data-update-2025

# Travailler sur les modifications...

# Commit régulier (conventional commits)
git commit -m "feat(data): add country scores JSON with 21 countries"
git commit -m "feat(reports): create 21 country report MDX files"
git commit -m "feat(alerts): add 12 new alerts from 2025 report"
git commit -m "feat(components): add radar chart and heatmap components"
git commit -m "feat(dashboard): implement global and country dimension views"
git commit -m "feat(cms): update Decap CMS config for new collections"
git commit -m "fix(countries): update country statuses with 2025 scores"

# Push et créer PR
git push origin feat/data-update-2025
```

---

## Plan d'action pour l'agent code

### Phase 1: Données (1-2 jours)
- [ ] Créer `country-scores.json` avec les 21 pays et 8 dimensions
- [ ] Mettre à jour `lib/countries.ts` avec les nouveaux scores
- [ ] Créer les 21 MDX reports
- [ ] Créer les alertes à partir du rapport

### Phase 2: Components (1-2 jours)
- [ ] `ScoreCard` — carte résumé pays
- [ ] `CountryRadarChart` — radar chart
- [ ] `DimensionHeatmap` — heatmap
- [ ] Mise à jour `AfricaMap` avec couleurs par catégorie

### Phase 3: Pages (2-3 jours)
- [ ] `/reports` — grille avec vrais reports
- [ ] `/reports/[slug]` — fiche pays détaillée
- [ ] `/dashboard` — filtres fonctionnels + visualisations
- [ ] `/alerts` — liste avec sévérité
- [ ] Homepage — stats dynamiques + overview

### Phase 4: CMS (1 jour)
- [ ] Configurer Decap CMS pour les nouvelles collections
- [ ] Reports collection — champs dimension scores
- [ ] Alerts collection — champs sévérité, type, dimension
- [ ] News collection — champs liés pays
- [ ] Ajouter collection "Country Scores" pour les données brutes

### Phase 5: Tests (1 jour)
- [ ] Vérifier le build
- [ ] Vérifier les données
- [ ] Vérifier les liens
- [ ] Vérifier le responsive

---

## Réponses aux questions

1. **Scores exacts** ✅ → Valeurs estimées dans un fichier JSON séparé, facilement updatable
2. **Alertes** ✅ → Créer de nouvelles alertes basées sur les événements du rapport
3. **Dashboard dimensions** ✅ → Double vue: dimension globale (moyenne) + dimension par pays (individuel)

---

## Architecture Dashboard — Dimensions Global + Pays

### Vue Globale (défaut)
Affiche la moyenne des 21 pays évalués pour chaque dimension:
```typescript
const globalDimensions = {
  regulatory: moyenne(dim1 des 21 pays),
  administrative: moyenne(dim2 des 21 pays),
  embRelationship: moyenne(dim3 des 21 pays),
  security: moyenne(dim4 des 21 pays),
  dataAccess: moyenne(dim5 des 21 pays),
  funding: moyenne(dim6 des 21 pays),
  dialogue: moyenne(dim7 des 21 pays),
  perception: moyenne(dim8 des 21 pays),
}
```

### Vue par Pays
Quand un pays est sélectionné (via carte ou dropdown):
```typescript
const countryDimensions = {
  regulatory: country.scores.dimension1,
  administrative: country.scores.dimension2,
  embRelationship: country.scores.dimension3,
  security: country.scores.dimension4,
  dataAccess: country.scores.dimension5,
  funding: country.scores.dimension6,
  dialogue: country.scores.dimension7,
  perception: country.scores.dimension8,
}
```

### Composant `DimensionCard` adaptatif
```typescript
interface DimensionCardProps {
  dimension: Dimension
  score: number        // 0-10
  context: 'global' | 'country' | 'comparison'
  countryName?: string
  trend?: 'improving' | 'deteriorating' | 'stable'
}
```

### Filtre Dashboard
- **Pays sélectionné** = "none" → Vue globale
- **Pays sélectionné** = "Ghana" → Vue Ghana + comparaison avec moyenne globale
- **Comparaison** = sélectionner 2 pays → Radar chart comparatif

### URL State
```
/dashboard?country=ghana&compare=kenya&dimension=all
```

---

## Notes techniques

- Le rapport 2025 est le "Draft" — il pourrait y avoir des changements
- Les scores du rapport sont des moyennes composites (0-10)
- Les 5 catégories du rapport correspondent aux 5 statuts existants
- La carte TopoJSON utilise `isoNum` pour la jointure
- Le CMS (Decap) nécessite une mise à jour des collections pour les nouvelles structures

---

**Date:** 2026-06-11
**Préparé par:** kocc
**Basé sur:** Rapport Abel Eseru 2025 + Audit codebase AfEONet
