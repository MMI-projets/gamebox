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
- [x] Profil public : critiques, jeux ajoutés et statistiques (note moyenne donnée, répartition des notes)
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
| GET     | `/users/:id`              | `UsersController.show`      | public          |
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

<!-- ✏️ Pré-rempli : relis, corrige et ajoute ton propre ressenti avant le rendu. -->

### Outil utilisé

**Claude Code** model Opus 5.5 en Médium, utilisé directement dans VS Code.

### Comment je l'ai utilisé

J'ai utilisé l'IA comme un **professeur particulier** plutôt que comme un générateur de code :

1. **Conception** : on a d'abord réfléchi ensemble aux tables, aux champs et aux relations. L'IA me posait des questions (une critique par jeu ? note sur combien ? qui ajoute les jeux ?) et je faisais les choix, l'IA me disais ce qui était bon et pas bon dans mes choix.
2. **Développement pas à pas** : pour chaque étape (migrations, modèles, routes, contrôleur, validation, pages), l'IA m'expliquait le concept et me donnait une consigne, je codais, puis elle relisait mon code et m'indiquait les erreurs à corriger.
3. **Quand je bloquais**, elle corrigeait à ma place en expliquant pourquoi.
4. **Fin du projet** : par manque de temps, je lui ai confié une plus grande partie du back-end ( droits d'accès, profil) et je me suis concentré sur le front (thème rétro en CSS).
5. **Exercice de débogage** : pour le CSS, je lui ai demandé d'écrire des feuilles contenant volontairement des erreurs, que je devais retrouver avec l'inspecteur du navigateur ou en regardant le code.

### Avantages

- Des **explications adaptées** à mon niveau, au moment où j'en avais besoin, sans chercher pendant des heures dans la documentation.
- Une **relecture immédiate** de mon code, avec la cause des erreurs et pas seulement la correction.
- L'IA **testait** les fonctionnalités (droits d'accès, validation, pages) et vérifiait le code (TypeScript, ESLint) après chaque modification.
- Elle m'a fait découvrir des bonnes pratiques : ne jamais faire confiance aux données du navigateur, vérifier les droits côté serveur, ne pas exposer l'email sur un profil public.

### Difficultés

- **Le risque de ne plus rien comprendre** : quand l'IA écrit beaucoup de code d'un coup, il faut prendre le temps de relire chaque fichier pour pouvoir l'expliquer.
- **Rester raisonnable** : j'avais beaucoup d'idées (demandes de modification validées par un admin, commentaires…), l'IA m'a aidé à les classer entre indispensable et bonus.

### Erreurs rencontrées et corrigées

| Erreur                                                 | Cause                                                                                                                      | Correction                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| La migration `games` ne se lançait pas                 | écrite au format Knex (`exports.up = function (knex)`) au lieu du format AdonisJS                                          | réécrite avec `export default class extends BaseSchema`  |
| Migration `users` qui aurait cassé la table            | elle recréait `email` et `password`, déjà existants, et le `down()` les supprimait                                         | une migration `alter` qui n'ajoute que la colonne `role` |
| `'belongsTo' is declared but never used`               | import inutile dans le modèle `User`                                                                                       | suppression de l'import                                  |
| `Cannot read properties of undefined (reading 'name')` | `controllers.Games` n'existait pas : le contrôleur n'avait pas été généré                                                  | `node ace make:controller games --resource`              |
| `/games/create` accessible sans être connecté          | la route publique `/games/:id` capturait `create` comme un id                                                              | contrainte `.where('id', router.matchers.number())`      |
| Page blanche sur `/games`                              | la méthode `index` du contrôleur était vide                                                                                | ajout de `inertia.render(...)`                           |
| Erreur `E_ROW_NOT_FOUND`                               | base vide : `findOrFail` ne trouvait aucun jeu                                                                             | comportement normal (404), ajout de jeux                 |
| JSX invalide sur la fiche d'un jeu                     | accolades en trop autour de plusieurs éléments, `&&` au lieu de `                                                          |                                                          | `   | correction de la syntaxe |
| Thème sombre ignoré                                    | `::root` au lieu de `:root` dans le CSS                                                                                    | correction du sélecteur                                  |
| Styles CSS ignorés (exercice)                          | `;` manquant, faute dans une variable, classe mal écrite, unité oubliée, nom d'animation, `content` manquant sur `::after` | corrigés avec l'inspecteur du navigateur                 |

### Ce que j'en retiens


L'IA m'a fait gagner beaucoup de temps, mais elle ne remplace pas la compréhension : je dois être capable d'expliquer chaque fichier. Le plus efficace a été de lui demander de **m'expliquer et de me corriger** plutôt que de tout faire à ma place.
