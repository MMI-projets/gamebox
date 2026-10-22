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

// Page d'accueil
router.on('/').renderInertia('home', {}).as('home')

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
    // Tableau de bord de l'utilisateur
    router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')

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
  })
  .use(middleware.auth())
