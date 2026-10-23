/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

/*
| Routes publiques : accessibles à tout le monde, connecté ou non
*/

// Page d'accueil : jeux les mieux notés et derniers ajouts
router.get('/', [controllers.Home, 'index']).as('home')

// Catalogue des jeux en lecture seule :
// - index : GET /games      → liste des jeux
// - show  : GET /games/:id  → fiche d'un jeu
router
  .resource('games', controllers.Games)
  .only(['index', 'show'])
  .where('id', router.matchers.number())

/*
| Routes "invité" : réservées aux visiteurs NON connectés
| (un utilisateur déjà connecté est redirigé)
*/
router
  .group(() => {
    // Inscription : affichage du formulaire + traitement
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    // Connexion : affichage du formulaire + traitement
    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

/*
| Routes protégées : réservées aux utilisateurs connectés
| (un visiteur est redirigé vers la page de connexion)
*/
router
  .group(() => {
    // Déconnexion
    router.post('logout', [controllers.Session, 'destroy'])

    // Gestion des jeux (toutes les actions sauf index et show, déjà publiques) :
    // - create  : GET    /games/create    → formulaire d'ajout
    // - store   : POST   /games           → enregistrement d'un nouveau jeu
    // - edit    : GET    /games/:id/edit  → formulaire de modification
    // - update  : PUT    /games/:id       → enregistrement des modifications
    // - destroy : DELETE /games/:id       → suppression
    router
      .resource('games', controllers.Games)
      .except(['index', 'show'])
      .where('id', router.matchers.number())

    // Admin : vérifier / retirer la vérification d'un jeu
    router
      .patch('games/:id/verify', [controllers.Games, 'verify'])
      .where('id', router.matchers.number())
      .as('games.verify')

    // Critiques :
    // - store   : POST   /games/:game_id/reviews → publier sa critique sur un jeu
    // - update  : PUT    /reviews/:id            → modifier sa critique
    // - destroy : DELETE /reviews/:id            → supprimer une critique
    router
      .post('games/:game_id/reviews', [controllers.Reviews, 'store'])
      .where('game_id', router.matchers.number())
      .as('reviews.store')
    router
      .put('reviews/:id', [controllers.Reviews, 'update'])
      .where('id', router.matchers.number())
      .as('reviews.update')
    router
      .delete('reviews/:id', [controllers.Reviews, 'destroy'])
      .where('id', router.matchers.number())
      .as('reviews.destroy')
  })
  .use(middleware.auth())
