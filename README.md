# Portfolio Dynamique (Symfony + Next.js + PostgreSQL)

## Vision
Ce repository pose une base de portfolio dynamique avec:

- Un backend `Symfony` exposant une API JSON.
- Une base `PostgreSQL` pour les projets, templates et technologies.
- Un frontend `Next.js` moderne, SEO-friendly, consommant l'API Symfony.
- Une infra conteneurisee (`Docker`, `Docker Compose`) avec option `Kubernetes`.
- Un pipeline CI/CD GitHub Actions et un blueprint de deploiement Render.

Le coeur metier suit l'idee du **Prototype Pattern**:

- `Template` = prototype de mini-site.
- `Project` = instance concrete creee a partir d'un template.

## Arborescence
```text
.
|- backend/
|  |- src/
|  |  |- Controller/Api/
|  |  |- Entity/
|  |  |- Repository/
|  |  `- Service/
|  |- config/
|  `- Dockerfile
|- frontend/
|  |- app/
|  |- components/
|  |- lib/
|  `- Dockerfile
|- docker/
|  `- nginx/default.conf
|- k8s/
|- .github/workflows/ci.yml
|- compose.yml
`- render.yaml
```

## Backend Symfony
### Stack
- Symfony 7
- Doctrine ORM + Migrations
- API Platform (resources sur entites)
- Endroid QR Code

### Entites principales
- `Template`: prototype de contenu/layout.
- `Project`: instance de projet reliee a un `Template`.
- `Technology`: techno associee aux projets (ManyToMany).

### Endpoints API principaux
- `GET /api/projects`
- `GET /api/projects/{slug}`

`GET /api/projects/{slug}` renvoie aussi un QR code en Data URI (SVG) vers la demo ou le repo GitHub.

## Frontend Next.js
### Pourquoi Next.js
- SEO solide (rendu server-side et metadata).
- Integration facile avec API Symfony.
- UX moderne avec animations (`framer-motion`).
- Deployment simple sur Render.

### Fonctions implementees
- Page d'accueil: liste des projets.
- Page detail dynamique: `/projects/[slug]`.
- Theme clair/sombre.
- UI moderne, responsive mobile/desktop.

## Lancement local avec Docker
### Prerequis
- Docker
- Docker Compose

### Commandes
```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Reverse proxy Nginx: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

## Workflow DB (backend)
Depuis `backend/`:

```bash
composer install
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```

## Kubernetes (optionnel)
Manifests disponibles dans `k8s/`:

- `namespace.yaml`
- `postgres.yaml`
- `backend.yaml`
- `frontend.yaml`
- `ingress.yaml`

Exemple d'application:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

## CI/CD
Pipeline: `.github/workflows/ci.yml`

- Checks backend (composer validate/install)
- Build frontend
- Build/push images Docker vers GHCR
- Trigger deploiement Render via webhook

Secrets GitHub a definir:

- `RENDER_DEPLOY_HOOK`

## Deploiement Render
Un blueprint `render.yaml` est fourni pour:

- service backend (Docker)
- service frontend (Docker)
- service PostgreSQL

Adapter les URLs, secrets et plans avant mise en production.

## Prochaines evolutions conseillees
1. Ajouter Auth admin (`Symfony Security` + JWT).
2. Ajouter filtre tags + recherche full-text.
3. Synchroniser automatiquement les repos GitHub (API GitHub).
4. Ajouter tests API (PHPUnit) et E2E frontend (Playwright).
5. Externaliser l'upload de visuels (S3/Cloudinary).