# AfEONet — Projet AfeoNet

## Contexte

**Projet:** AfEONet Platform (AHEAD Africa)  
**Mission:** Monitoring Civic Space for Citizen Election Observers in Africa  
**Stack:** Next.js 15 + TypeScript + Tailwind + MDX + Decap CMS  
**Déploiement:** https://afeonetweb.netlify.app/  
**GitHub:** https://github.com/AfricTivistes/AfEONet

## Documents préparés

### 1. IMPROVEMENTS-AfeONet.md (14KB)
Analyse complète et propositions d'améliorations:
- 7 problèmes identifiés
- 6 propositions (A à F)
- Structure de fichiers proposée
- Plan d'action (5 phases)
- Architecture Dashboard (Global + Pays)
- Scores estimés des 21 pays
- Configuration CMS Decap complète

### 2. AGENT-INSTRUCTIONS.md (6KB)
Instructions pour l'agent code:
- Plan de travail (5 phases)
- Architecture des données
- Règles importantes
- Fichiers à créer/modifier
- Vue globale + vue par pays
- Workflow Git (feature branch)

### 3. data/country-scores.json (8.6KB)
Scores des 21 pays × 8 dimensions:
- Scores 0-10 par dimension
- Score composite (moyenne)
- Catégorie (Closed | Repressed | Obstructed | Restricted | Open)
- Notes par pays

### 4. data/alerts.json (6.4KB)
12 alertes extraites du rapport:
- Sévérité (critical | high | medium | low)
- Type (arrest | raid | threat | restriction | closure | other)
- Dimension concernée
- Pays, date, description

### 5. Draft Report PDF (1.6MB)
Rapport Abel Eseru 2025 — "Eyes on the Ballot Watchers"

## Données du rapport

### 21 pays évalués
| Pays | Score | Catégorie |
|------|-------|-----------|
| Ghana | 6.5 | Narrowed |
| Nigeria | 5.5 | Obstructed |
| Kenya | 7.5 | Restricted |
| Botswana | 9.0 | Open |
| Eswatini | 4.5 | Repressed |
| Somalia | 4.0 | Repressed |
| Cameroon | 5.0 | Obstructed |
| Liberia | 7.0 | Restricted |
| South Sudan | 3.5 | Repressed |
| Somaliland | 8.0 | Restricted |
| South Africa | 8.0 | Restricted |
| Tanzania | 4.5 | Repressed |
| Uganda | 3.0 | Repressed |
| Zambia | 6.0 | Obstructed |
| Madagascar | 5.0 | Obstructed |
| Tunisia | 6.5 | Narrowed |
| Côte d'Ivoire | 5.5 | Obstructed |
| Chad | 3.0 | Repressed |
| Congo Brazzaville | 2.0 | Closed |
| Ethiopia | 4.5 | Repressed |
| Zimbabwe | 3.0 | Repressed |

### 8 dimensions
1. Regulatory Framework
2. Administrative Constraints
3. EMB Relationship
4. Security and Well-being
5. Access to Electoral Data
6. Access to Funding
7. Dialogue and Consultation
8. Perception of Observers

### 5 catégories
| Score | Catégorie |
|-------|-----------|
| 0-2 | Closed |
| 3-4 | Repressed |
| 5-6 | Obstructed |
| 7-8 | Restricted |
| 9-10 | Open |

## Scores globaux (moyenne des 21 pays)
| Dimension | Score |
|-----------|-------|
| Regulatory | 5.4 |
| Administrative | 5.1 |
| EMB Relationship | 5.6 |
| Security | 4.5 |
| Data Access | 5.5 |
| Funding | 4.4 |
| Dialogue | 5.5 |
| Perception | 5.6 |
| **Composite** | **5.2** |

## Workflow Git

**Branche:** `feat/data-update-2025`

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

## CMS — Decap Configuration

Le fichier `public/admin/config.yml` doit être mis à jour pour supporter les nouvelles collections:

### Collections existantes (à garder)
- **News** — Articles d'actualité
- **About** — Sections "About"
- **Pages** — Pages statiques

### Collections à modifier
- **Reports** — Ajouter champs dimension scores (8 champs number 0-10)
- **Alerts** — Ajouter champs sévérité, type, dimension

### Collections à ajouter
- **Country Scores** — Données brutes des scores (éditable via CMS)
- **News** — Ajouter champs `country` (relation) et `dimensionTags`

### CMS — Détails des collections

#### Reports (modifié)
```yaml
- name: "reports"
  label: "Reports"
  folder: "content/reports"
  create: true
  slug: "{{slug}}"
  extension: "mdx"
  format: "frontmatter"
  fields:
    - { name: "slug", label: "Slug", widget: "string" }
    - { name: "title", label: "Title", widget: "string" }
    - { name: "country", label: "Country", widget: "select", options: ["Ghana", "Nigeria", "Kenya", ...] }
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
    - { name: "tags", label: "Tags", widget: "list", required: false }
    - { name: "body", label: "Content", widget: "markdown" }
```

#### Alerts (modifié)
```yaml
- name: "alerts"
  label: "Security Alerts"
  folder: "content/alerts"
  create: true
  slug: "{{slug}}"
  extension: "mdx"
  format: "frontmatter"
  fields:
    - { name: "id", label: "Alert ID", widget: "string" }
    - { name: "title", label: "Title", widget: "string" }
    - { name: "date", label: "Date", widget: "datetime" }
    - { name: "country", label: "Country", widget: "select", options: ["Ghana", "Nigeria", "Kenya", ...] }
    - { name: "region", label: "Region", widget: "select", options: ["West Africa", "East Africa", "North Africa", "Central Africa", "Southern Africa"] }
    - { name: "status", label: "Status", widget: "select", options: ["open", "narrowed", "obstructed", "repressed", "closed"] }
    - { name: "severity", label: "Severity", widget: "select", options: ["critical", "high", "medium", "low"] }
    - { name: "dimension", label: "Dimension", widget: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8"] }
    - { name: "alertType", label: "Alert Type", widget: "select", options: ["arrest", "raid", "threat", "restriction", "closure", "other"] }
    - { name: "affectedObservers", label: "Affected Observers", widget: "number", required: false }
    - { name: "sources", label: "Sources", widget: "list" }
    - { name: "relatedReports", label: "Related Reports", widget: "list" }
    - { name: "tags", label: "Tags", widget: "list", required: false }
    - { name: "body", label: "Content", widget: "markdown" }
```

#### News (modifié)
```yaml
- name: "news"
  label: "News Articles"
  folder: "content/news"
  create: true
  slug: "{{slug}}"
  extension: "mdx"
  format: "frontmatter"
  fields:
    - { name: "title", label: "Title", widget: "string" }
    - { name: "description", label: "Description", widget: "text" }
    - { name: "date", label: "Date", widget: "datetime" }
    - { name: "category", label: "Category", widget: "string" }
    - { name: "author", label: "Author", widget: "string" }
    - { name: "country", label: "Country", widget: "select", options: ["Ghana", "Nigeria", "Kenya", ...], required: false }
    - { name: "featured", label: "Featured", widget: "boolean", default: false }
    - { name: "image", label: "Image", widget: "image", required: false }
    - { name: "dimensionTags", label: "Dimension Tags", widget: "list", required: false }
    - { name: "tags", label: "Tags", widget: "list", required: false }
    - { name: "body", label: "Content", widget: "markdown" }
```

#### Country Scores (nouveau)
```yaml
- name: "country-scores"
  label: "Country Scores"
  folder: "content/data"
  create: false
  slug: "{{slug}}"
  extension: "json"
  format: "json"
  fields:
    - { name: "iso2", label: "ISO2", widget: "string" }
    - { name: "name", label: "Country Name", widget: "string" }
    - { name: "region", label: "Region", widget: "select", options: ["West Africa", "East Africa", "North Africa", "Central Africa", "Southern Africa"] }
    - { name: "composite", label: "Composite Score", widget: "number", min: 0, max: 10 }
    - { name: "category", label: "Category", widget: "select", options: ["open", "narrowed", "obstructed", "repressed", "closed"] }
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
    - { name: "notes", label: "Notes", widget: "text", required: false }
```

## Prochaines étapes

1. **Phase 1:** Données — Mettre à jour lib/countries.ts + créer MDX
2. **Phase 2:** Components — Radar chart, Heatmap, ScoreCard
3. **Phase 3:** Pages — Dashboard (double vue), Reports, Alerts
4. **Phase 4:** CMS — Configurer Decap pour nouvelles collections
5. **Phase 5:** Tests — Build, responsive, dark mode

## Notes

- Les scores sont des estimations (à updater avec valeurs exactes d'Abel)
- Le rapport est un "Draft" — peut y avoir des changements
- 33 pays non-évalués restent avec status "null" ou "Not in 2025 Report"
- Les alertes existantes (3 de 2023) restent, nouvelles alertes créées
- Le CMS permet d'éditer les nouvelles données sans toucher le code
- Les fichiers JSON dans `content/data/` sont la source de vérité
- Les données du CMS sont versionnées via Git (Decap CMS = Git-based)

---

**Date:** 2026-06-11  
**Préparé par:** kocc (AfEONet Hub)  
**Seddo:** AfeoNet (hub)  
**Gist:** 04bca9c070b2a12272dc7b6a99341052
