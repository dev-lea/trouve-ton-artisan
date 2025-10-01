# Trouve ton artisan

Plateforme permettant de trouver facilement un artisan en région **Auvergne-Rhône-Alpes**, par catégorie ou spécialité.  
Les particuliers peuvent consulter une fiche artisan et le contacter via un formulaire sécurisé.

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
  - Formulaire de contact (email).
- Page **404 personnalisée**.
- Interface **responsive** (mobile, tablette, desktop).
- Respect des bonnes pratiques **SEO** (sitemap, robots.txt, meta tags).
- Sécurité côté serveur (Helmet, CORS, Rate Limit).

---

## Technologies utilisées

- **Frontend** : React.js, React Router, Vite, Sass, Bootstrap.  
- **Backend** : Node.js, Express.js, Sequelize.  
- **Base de données** : MySQL.  
- **Outils** : Git/GitHub, Figma (maquettes), Nodemailer (envoi mail).  

---

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :  
- [Node.js](https://nodejs.org/) (>= 18)  
- [MySQL](https://dev.mysql.com/downloads/mysql/) (>= 8)  
- [Git](https://git-scm.com/)  

---

## Installation

Clonez le projet :

```bash
git clone https://github.com/dev-lea/trouve-ton-artisan.git
cd trouve-ton-artisan

---

## Installation du serveur
cd server
npm install

---

## Installation du client
cd ../client
npm install

---

## Configuration
Variables d’environnement

---

## Copiez le fichier .env.example en .env dans le dossier server/ et adaptez les valeurs :

---

PORT=4000
NODE_ENV=development
DATABASE_URL=mysql://root:@localhost:3307/trouve_ton_artisan
CORS_ORIGIN=http://localhost:5173
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Trouve ton artisan <no-reply@exemple.fr>"

---

## Base de données

Créer la base et importer les scripts :

SOURCE server/db/schema.sql;
SOURCE server/db/seed.sql;

---

## Vérifiez :

USE trouve_ton_artisan;
SHOW TABLES;

---

## Lancer le projet

API (backend)
cd server
npm run dev
API dispo sur : http://localhost:4000

Client (frontend)
cd client
npm run dev
Frontend dispo sur : http://localhost:5173

---

## Déploiement

API : Render / Railway.

Frontend : Netlify / Vercel.

## Auteur
Projet réalisé par dev-léa.
