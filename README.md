# Trouve ton artisan

Plateforme permettant de trouver facilement un artisan en région **Auvergne-Rhône-Alpes**, par catégorie ou spécialité.  
Les particuliers peuvent consulter une fiche artisan et le contacter via un formulaire sécurisé.

---

## Liens en production

- **Frontend (Netlify)** : [https://ton-site.netlify.app](https://trouve-ton-artisan-front.netlify.app/)  
- **API (Render)** : [https://trouve-ton-artisan-api-4cpy.onrender.com/api](https://trouve-ton-artisan-api-4cpy.onrender.com/api)  
- **Repository GitHub** : [https://github.com/dev-lea/trouve-ton-artisan](https://github.com/dev-lea/trouve-ton-artisan)  
- **Maquettes Figma** : [Voir les maquettes](https://www.figma.com/design/Y6OgqZQ0BJVVBL67b6kiv5/Trouve-ton-artisan?node-id=0-1&t=zZY43wX8cc9vWGUb-1)

---

## Fonctionnalités

- Recherche d’artisans par **nom**, **catégorie**, **spécialité** ou **département**.  
- Fiches artisans détaillées :  
  - Photo  
  - Nom & spécialité  
  - Localisation  
  - Description / À propos  
  - Note avec étoiles  
  - Lien vers le site internet  
  - Formulaire de contact (email simulé).  
  - Page **404 personnalisée**.  
  - Interface **responsive** (mobile, tablette, desktop).  
  - Respect des bonnes pratiques **SEO** (title, meta description).  
  - Sécurité côté serveur :  
  - CORS (Netlify ↔ Render),  
  - Helmet,  
  - Encodage UTF-8 (`utf8mb4`),  
  - Rate limit basique.  

---

## Technologies utilisées

- **Frontend** : React.js, React Router, Vite, Sass, Bootstrap.  
- **Backend** : Node.js, Express.js, Sequelize.  
- **Base de données** : MySQL (hébergée sur Railway).  
- **Outils** : Git/GitHub, Figma (maquettes), Nodemailer (mail simulé).  
- **Hébergement** :  
  - API → Render  
  - Base de données → Railway  
  - Frontend → Netlify  

---

## Installation en local

### 1. Clonez le projet :
```bash
git clone https://github.com/dev-lea/trouve-ton-artisan.git
cd trouve-ton-artisan

### 2. Installation du serveur
cd server
npm install

### 3. Installation du client
cd ../client
npm install

### 4. Configuration des variables d’environnement
Dans server/, créez un fichier .env (copie de .env.example) :
PORT=4000
NODE_ENV=development
DATABASE_URL=mysql://root:password@localhost:3306/trouve_ton_artisan?charset=utf8mb4
CORS_ORIGIN=http://localhost:5173
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Trouve ton artisan <no-reply@exemple.fr>"

### 5. Base de données (local)
Créez la base et importez les scripts :
SOURCE server/db/shema.sql;
SOURCE server/db/seed.sql;
Vérifiez :
USE trouve_ton_artisan;
SHOW TABLES;

### 6. Lancer le projet
Backend (API) :
cd server
npm run dev
dispo sur : http://localhost:4000
Frontend (React) :
cd client
npm run dev
dispo sur : http://localhost:5173

## Déploiement en ligne

API : Render
Base de données : Railway
Frontend : Netlify

##Auteur
Projet réalisé par dev-léa dans le cadre du brief Trouve ton artisan.