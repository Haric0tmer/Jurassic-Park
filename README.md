# Jurassic Park

Application web Next.js pour un parc jurassique: page d'accueil marketing, encyclopedie des dinosaures connectee a PostgreSQL via Prisma, et formulaire de contact sponsors.

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Modele de donnees](#modele-de-donnees)
- [Prerequis](#prerequis)
- [Installation et lancement local](#installation-et-lancement-local)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Documentation CI/CD](#documentation-cicd)
- [Guide de deploiement](#guide-de-deploiement)
- [Depannage](#depannage)

## Stack technique

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **UI**: Tailwind CSS v4, composants utilitaires (`components/ui`), icones `lucide-react`
- **Base de donnees**: PostgreSQL
- **ORM**: Prisma 7 (`@prisma/client`, `@prisma/adapter-pg`)
- **Qualite**: ESLint 9
- **CI/CD**: GitHub Actions + deploiement Vercel

## Architecture du projet

```text
app/
  layout.tsx              # Layout global de l'application
  page.tsx                # Home page
  dinosaurs/page.tsx      # Liste/filtrage des dinosaures
  contact/page.tsx        # Formulaire sponsors

components/
  dino-search.tsx         # Barre de recherche des dinos
  sponsor-contact-form.tsx
  ui/                     # Composants UI reutilisables

lib/
  prisma.ts               # Client Prisma (connexion via DATABASE_URL)
  db/dinosaurs.ts         # Requete metier pour l'encyclopedie

prisma/
  schema.prisma           # Schema SQL logique
  migrations/             # Historique des migrations
  seed.ts                 # Jeu de donnees de demo

.github/workflows/
  ci.yml                  # Pipeline integration continue
  cd.yml                  # Pipeline deploiement continu (Vercel)
```

## Modele de donnees

Le schema Prisma definit les entites suivantes:

- `Dinosaur`: fiche d'un dinosaure (nom, espece, periode, regime, niveau de danger, zone, etc.)
- `Zone`: zone du parc (nom, coordonnees JSON)
- `Order`: commande de billets
- `Ticket`: billet individuel rattache a une commande

Enums:

- `Diet`: `HERBIVORE`, `CARNIVORE`, `OMNIVORE`, `PISCIVORE`
- `OrderStatus`: `PENDING`, `PAID`, `CANCELLED`

## Prerequis

- Node.js 20+
- `corepack` active (pour utiliser pnpm)
- Docker + Docker Compose (recommande pour PostgreSQL local)

## Installation et lancement local

1. **Installer les dependances**

```bash
corepack enable
corepack pnpm install
```

2. **Configurer les variables d'environnement**

Creer un fichier `.env` a la racine (voir section [Variables d'environnement](#variables-denvironnement)).

3. **Demarrer la base PostgreSQL (Docker)**

```bash
docker compose up -d db
```

4. **Generer le client Prisma**

```bash
corepack pnpm generate
```

5. **Appliquer les migrations**

```bash
corepack pnpm migrate
```

6. **(Optionnel) Inserer des donnees de demo**

```bash
corepack pnpm dlx prisma db seed
```

7. **Lancer l'application en local**

```bash
corepack pnpm dev
```

Application disponible sur `http://localhost:3000`.

## Variables d'environnement

Fichier `.env` minimal:

```env
DATABASE_URL="postgresql://jurassic:jurassic@localhost:5432/jurassic"
```

Notes:

- En local, la valeur ci-dessus est compatible avec `compose.yml`.
- En production (Vercel + DB distante), remplacez `DATABASE_URL` par l'URL PostgreSQL de votre fournisseur.

## Scripts disponibles

- `pnpm dev`: demarre Docker Compose puis Next.js en mode dev
- `pnpm build`: build de production Next.js
- `pnpm start`: demarre l'application en mode production
- `pnpm lint`: lance ESLint
- `pnpm generate`: genere le client Prisma
- `pnpm migrate`: applique les migrations en mode developpement
- `pnpm deploy`: applique les migrations en mode deploiement (`prisma migrate deploy`)

## Documentation CI/CD

Le projet contient deux workflows GitHub Actions:

### CI - Integration continue

Fichier: `.github/workflows/ci.yml`

Declencheurs:

- `pull_request`
- `push` sur `main`

Etapes executees:

1. Checkout du code
2. Setup Node.js 20 + pnpm
3. `pnpm install --frozen-lockfile`
4. `pnpm dlx prisma generate`
5. `pnpm lint`
6. `pnpm build`

Objectif: verifier que le code est installable, lintable et buildable avant merge/deploiement.

### CD - Deploiement continu

Fichier: `.github/workflows/cd.yml`

Declencheurs:

- `push` sur `main`
- execution manuelle (`workflow_dispatch`)

Etapes executees:

1. Checkout du code
2. Setup Node.js 20 + pnpm
3. `pnpm install --frozen-lockfile`
4. (Optionnel) migration DB via `pnpm deploy` si `DATABASE_URL` est defini
5. `vercel pull --environment=production`
6. `vercel build --prod`
7. `vercel deploy --prebuilt --prod`

Le job de deploiement s'execute uniquement si les secrets Vercel requis sont presents.

## Guide de deploiement

### 1) Preparer les secrets GitHub

Dans `Settings > Secrets and variables > Actions`, ajouter:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `DATABASE_URL` (recommande si vous voulez executer les migrations automatiquement)

### 2) Configurer Vercel

- Creer/importer le projet sur Vercel
- Verifier que les variables d'environnement Vercel sont coherentes (au minimum `DATABASE_URL`)
- Associer le repository GitHub a Vercel

### 3) Deployer automatiquement

- Pousser sur `main`
- Le workflow `CD` se lance et deploie en production

### 4) Deploiement manuel (optionnel)

- Aller dans l'onglet `Actions`
- Lancer le workflow `CD` via `Run workflow`

### 5) Verification post-deploiement

- Ouvrir l'URL de production
- Verifier la page d'accueil
- Verifier `/dinosaurs` (lecture DB)
- Verifier `/contact`

## Depannage

- **Erreur Prisma Client introuvable**: executer `pnpm generate`.
- **Erreur de connexion DB**: verifier `DATABASE_URL` et que PostgreSQL est demarre.
- **CI rouge sur lint**: lancer `pnpm lint` localement et corriger les erreurs ESLint.
- **CD ne se lance pas**: verifier la presence des secrets Vercel dans GitHub.
- **Migrations non appliquees en prod**: ajouter `DATABASE_URL` dans les secrets GitHub et/ou variables Vercel.
