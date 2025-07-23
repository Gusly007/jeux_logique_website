# Projet Web Éducatif – React + TypeScript(front)

Ce projet est une application web éducative réalisée avec **React**, **TypeScript** et **Vite**. Il comprend plusieurs modules ludo-éducatifs, un système d’authentification, et différentes pages informatives comme la bibliographie, le contact ou les mentions légales.

## 🎯 Objectif

Fournir une plateforme interactive pour aider les utilisateurs (notamment les enfants ou élèves) à apprendre à travers des jeux tels que :
- Calcul mental
- Jeux de suites
- Mots manquants
- Factorielle

## 🛠️ Technologies utilisées

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- Context API (pour la gestion d’authentification)
- CSS

## 📁 Structure du projet

```
src/
├── App.tsx               # Composant principal
├── main.tsx              # Point d’entrée Vite
├── AuthContext.tsx       # Gestion du contexte d'authentification
├── reducer/
│   └── todoReducer.ts    # Exemple de reducer
├── components/
│   ├── Header.tsx / .css
│   ├── Footer.tsx / .css
│   ├── Loging.tsx
│   ├── Register.tsx
│   ├── Profil.tsx / profil.css
│   ├── Contact.tsx / contact.css
│   ├── MentionLegal.tsx
│   ├── AProposDeMoi.tsx
│   ├── Bibliographiepage.tsx / Bibliographie.css
│   ├── Jeux.tsx / Jeux.css
│   ├── MotManquant.tsx
│   ├── CalculMental.tsx
│   ├── Suite.tsx
│   ├── Factorielle.tsx
│   └── PrivateRoute.tsx
├── assets/               # Dossier pour images, logos, etc.
├── index.css / Style.css / App.css
```

## 🚀 Lancement du projet

Assurez-vous d’avoir **Node.js** installé.

1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   cd projet
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrez le navigateur à l’adresse : [http://localhost:5173](http://localhost:5173)

## 🔐 Authentification

Le projet utilise `AuthContext.tsx` et `PrivateRoute.tsx` pour restreindre l’accès à certaines pages aux utilisateurs connectés.


# Backend du Projet Web – PHP + Docker(back)

Ce répertoire contient le backend du projet web, basé sur **PHP**, structuré en **MVC**, et conteneurisé avec **Docker** et **Nginx**. Il interagit avec une base de données **MySQL**.

## 🧱 Structure du projet

```
backend/
├── docker-compose.yml         # Orchestration des conteneurs
├── php-dockerfile             # Dockerfile pour l'image PHP personnalisée
├── nginx-conf/
│   └── nginx.conf             # Configuration Nginx
├── mysql-data/                # Données persistées de MySQL
├── php-files/
│   ├── index.php              # Point d'entrée principal
│   ├── .env                   # Variables d'environnement
│   ├── composer.json          # Dépendances PHP
│   ├── config/                # Connexion DB et config
│   ├── controllers/           # Logique métier
│   ├── models/                # Modèles de données
│   └── routes/                # Routes de l'API
```

## 🚀 Lancement du backend avec Docker

### 1. Prérequis

- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/install/) installés

### 2. Lancer les conteneurs

Dans le dossier `backend/`, exécutez :

```bash
docker-compose up --build
```

Cela va :
- Construire l’image PHP à partir du `php-dockerfile`
- Lancer le serveur PHP
- Lancer MySQL avec persistance des données
- Configurer un serveur Nginx en frontal

L’API PHP sera alors disponible à l’adresse : [http://localhost:8080](http://localhost:8080)

### 3. Installer les dépendances PHP

À l’intérieur du conteneur PHP :

```bash
docker exec -it php-container-name bash
composer install
```

> Remplacez `php-container-name` par le nom du conteneur PHP (visible via `docker ps`)

## 🛠 Variables d’environnement

Configurez le fichier `.env` (dans `php-files/`) pour y spécifier vos accès MySQL, chemins ou autres secrets nécessaires.

Exemple :

```env
DB_HOST=mysql
DB_NAME=projetweb
DB_USER=root
DB_PASS=root
```


## ✍️ Auteurs

- Projet réalisé par [Jean Gusly Hyppolite]
- Dans le cadre d'un stage a l'université de rouen





