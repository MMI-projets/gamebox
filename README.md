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
- [x] Fiche d'un jeu avec ses critiques et sa note moyenne (publique)
- [x] Ajout, modification et suppression d'un jeu (connecté)
- [x] Ajout, modification et suppression de sa critique (connecté, une seule par jeu)
- [x] Validation des formulaires avec VineJS (messages en français)

### Bonus

- [x] Rôles : l'auteur d'un jeu et les admins peuvent le modifier ou le supprimer
- [x] Vérification des jeux par un administrateur (un jeu modifié par un non-admin doit être revérifié)
- [x] Modération : un admin peut supprimer n'importe quelle critique
- [x] Recherche par titre, filtre par genre, tri (titre, mieux notés, ajouts récents)
- [ ] Demandes de modification avec justification, validées par un admin
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

## Routes

| Méthode | URL                       | Action                      | Accès           |
| ------- | ------------------------- | --------------------------- | --------------- |
| GET     | `/games`                  | `GamesController.index`     | public          |
| GET     | `/games/:id`              | `GamesController.show`      | public          |
| GET     | `/games/create`           | `GamesController.create`    | connecté        |
| POST    | `/games`                  | `GamesController.store`     | connecté        |
| GET     | `/games/:id/edit`         | `GamesController.edit`      | auteur ou admin |
| PUT     | `/games/:id`              | `GamesController.update`    | auteur ou admin |
| DELETE  | `/games/:id`              | `GamesController.destroy`   | auteur ou admin |
| PATCH   | `/games/:id/verify`       | `GamesController.verify`    | admin           |
| POST    | `/games/:game_id/reviews` | `ReviewsController.store`   | connecté        |
| PUT     | `/reviews/:id`            | `ReviewsController.update`  | auteur          |
| DELETE  | `/reviews/:id`            | `ReviewsController.destroy` | auteur ou admin |

Les droits sont vérifiés **dans le contrôleur** (méthodes `canBeManagedBy`, `canBeEditedBy` et `canBeDeletedBy` des modèles). Cacher un bouton côté React ne suffit pas, car on peut envoyer une requête sans passer par l'interface.

## Installation

Prérequis : Node.js 24 ou plus récent.

```bash
git clone https://github.com/MMI-projets/gamebox.git
cd gamebox
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
node ace db:seed   # facultatif : données de démonstration
npm run dev
```

L'application est disponible sur http://localhost:3333.

### Comptes de démonstration (après `node ace db:seed`)

| Email               | Mot de passe  | Rôle  |
| ------------------- | ------------- | ----- |
| `admin@gamebox.fr`  | `password123` | admin |
| `joueur@gamebox.fr` | `password123` | user  |

Pour donner le rôle admin à un compte existant :

```bash
node ace users:promote email@exemple.fr
```

## Utilisation de l'IA

Aide étape par étape de l'IA, me donne les étapes je les réalises si y'a une erreur il m'aiguille sur l'erreur que je corrige et si je n'y arrive pas, il corrige pour moi et ainsi de suite.
