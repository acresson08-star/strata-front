# Mon Blog Média

Stack : **React + Vite + React Router + Zustand + TipTap**

---

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

---

## Variables d'environnement

Crée un fichier `.env` à la racine :

```
VITE_API_URL=http://localhost:3000/api
```

---

## Structure

```
src/
├── assets/styles/     → tokens.css, base.css, layout.css
├── components/        → composants réutilisables (ui + layout)
├── pages/             → pages publiques (Home, Article, Category, Search)
├── admin/             → espace admin (pages, composants, layouts)
├── hooks/             → hooks React personnalisés
├── services/          → appels API (api.js, articles.service.js, auth.service.js)
├── store/             → stores Zustand (authStore, editorStore)
├── utils/             → fonctions utilitaires (formatDate, slugify)
└── router/            → AppRouter, publicRoutes, adminRoutes
```

---

## Accès admin

Les routes `/admin/*` sont protégées par `PrivateRoute`.  
L'authentification se fait via `useAuthStore` → `authService.login()`.  
Le token JWT est stocké dans `localStorage`.

---

## Éditeur d'articles

L'éditeur utilise **TipTap** (StarterKit).  
La logique est dans `ArticleEditor.hooks.js`, le rendu dans `ArticleEditor.jsx`.  
Le contenu est stocké en HTML dans `editorStore`.

---

## Brancher ton backend

Tous les appels réseau passent par `src/services/`.  
Remplace les endpoints dans chaque service selon ton API.
