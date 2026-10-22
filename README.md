# GameBox

**GameBox** est une application web pour **noter et critiquer des jeux vidéo**, sur le modèle de [Letterboxd](https://letterboxd.com) pour les films.

Projet réalisé dans le cadre du TD AdonisJS .

## Le concept

- Les visiteurs parcourent le catalogue des jeux et lisent les critiques.
- Les utilisateurs connectés ajoutent des jeux au catalogue.
- Chaque utilisateur peut écrire **une critique par jeu** : une note de **0,5 à 4 étoiles**, par demi-étoiles, avec un texte facultatif.
- Un administrateur vérifie les jeux ajoutés par la communauté.

## Fonctionnalités

### Version 1 (indispensable)

- [x] Inscription, connexion et déconnexion
- [x] Liste des jeux (publique)
- [ ] Fiche d'un jeu avec ses critiques et sa note moyenne (publique)
- [ ] Ajout, modification et suppression d'un jeu (connecté)
- [ ] Ajout, modification et suppression de sa critique (connecté, une seule par jeu)
- [ ] Validation des formulaires avec VineJS

### Bonus

- [ ] Vérification des jeux par un administrateur
- [ ] Recherche et filtres (genre, éditeur, note)
- [ ] Page de profil avec les critiques d'un utilisateur
- [ ] Commentaires sous les critiques

## Technologies

- **AdonisJS 7** : framework backend (Node.js / TypeScript)
- **SQLite** : base de données
- **Lucid ORM** : manipulation des données
- **VineJS** : validation des données
- **React + Inertia.js** : interface (starter kit React d'AdonisJS)

## Modèle de données

```
users                     games                       reviews
─────                     ─────                       ───────
id                        id                          id
full_name                 user_id  → users            user_id  → users
email                     title                       game_id  → games
password                  publisher                   rating   (1 à 8 demi-étoiles)
role ('user' | 'admin')   genre                       content  (facultatif)
                          release_date
                          description                 unique (user_id, game_id)
                          image_url
                          is_verified
```

- Un **utilisateur** ajoute plusieurs **jeux** et écrit plusieurs **critiques**.
- Un **jeu** reçoit plusieurs **critiques**.
- Une **critique** appartient à un utilisateur et concerne un seul jeu.
- La note est stockée en **demi-étoiles** (entier de 1 à 8) pour éviter les nombres décimaux : `7` = 3,5 ★.

## Installation

Prérequis : Node.js 24 ou plus récent.

```bash
git clone https://github.com/MMI-projets/gamebox.git
cd gamebox
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
```

L'application est disponible sur http://localhost:3333.

## Utilisation de l'IA

Aide étape par étape de l'IA, me donne les étapes je les réalises si y'a une erreur il m'aiguille sur l'erreur que je corrige et si je n'y arrive pas, il corrige pour moi et ainsi de suite.
