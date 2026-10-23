import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Game from '#models/game'
import Review from '#models/review'
import GameTransformer from '#transformers/game_transformer'
import ReviewTransformer from '#transformers/review_transformer'
import { gameFiltersValidator, gameValidator } from '#validators/game'

export default class GamesController {
  /**
   * Liste des jeux, avec recherche, filtre par genre et tri
   * GET /games?search=zelda&genre=RPG&sort=rating
   */
  async index({ inertia, request }: HttpContext) {
    // Filtres de l'URL validés par VineJS (des filtres invalides sont ignorés)
    const [error, filters] = await gameFiltersValidator.tryValidate(request.qs())
    const { search, genre, sort = 'title' } = error ? {} : filters

    // Chaque jeu est chargé avec sa note moyenne et son nombre de critiques
    const query = Game.queryWithStats()

    if (search) query.whereLike('title', `%${search}%`)
    if (genre) query.where('genre', genre)

    if (sort === 'rating') query.orderBy('averageRating', 'desc')
    else if (sort === 'recent') query.orderBy('created_at', 'desc')
    else query.orderBy('title')

    const games = await query

    // Liste des genres existants (pour le menu déroulant du filtre)
    const genres = await db.from('games').distinct('genre').whereNotNull('genre').orderBy('genre')

    return inertia.render('games/index', {
      games: GameTransformer.transform(games),
      genres: genres.map((row) => row.genre as string),
      filters: { search: search ?? '', genre: genre ?? '', sort },
    })
  }

  /**
   * Formulaire d'ajout
   */
  async create({ inertia }: HttpContext) {
    // Affiche le formulaire inertia/pages/games/create.tsx (aucune donnée à envoyer)
    return inertia.render('games/create', {})
  }

  /**
   * Enregistre un nouveau jeu
   */
  async store({ request, response, auth, session }: HttpContext) {
    // 1. Valide les données envoyées par le formulaire avec VineJS.
    //    Si une règle échoue, AdonisJS renvoie automatiquement sur le
    //    formulaire avec les messages d'erreur : la suite n'est pas exécutée.
    const payload = await request.validateUsing(gameValidator)

    // 2. Crée le jeu en le rattachant à l'utilisateur connecté :
    //    related('games') remplit user_id tout seul (relation hasMany).
    //    Un jeu ajouté par un admin est vérifié d'office.
    const user = auth.getUserOrFail()
    const game = await user.related('games').create({ ...payload, isVerified: user.isAdmin })

    // 3. Message de confirmation + affichage du jeu créé
    session.flash('success', 'Jeu ajouté au catalogue')
    return response.redirect().toRoute('games.show', { id: game.id })
  }

  /**
   * Fiche d'un jeu avec ses critiques
   */
  async show({ params, inertia, auth }: HttpContext) {
    // findOrFail -> page 404 si le jeu n'existe pas
    const game = await Game.queryWithStats().where('id', params.id).firstOrFail()

    // Critiques du jeu, les plus récentes d'abord, avec leur auteur
    const reviews = await Review.query()
      .where('game_id', game.id)
      .preload('user')
      .orderBy('created_at', 'desc')

    // auth.user est rempli même sur une route publique (silent_auth_middleware)
    const user = auth.user

    // La critique de l'utilisateur connecté, s'il en a écrit une
    const userReview = user ? reviews.find((review) => review.userId === user.id) : undefined

    return inertia.render('games/show', {
      game: GameTransformer.transform(game),
      reviews: ReviewTransformer.transform(reviews),
      userReview: userReview ? ReviewTransformer.transform(userReview) : null,
      // Droits de l'utilisateur, pour afficher ou cacher les boutons.
      // La vraie vérification est faite dans chaque action du contrôleur.
      can: {
        manage: game.canBeManagedBy(user),
        verify: user?.isAdmin ?? false,
        review: !!user && !userReview,
      },
    })
  }

  /**
   * Formulaire de modification
   */
  async edit({ params, inertia, auth, session, response }: HttpContext) {
    // findOrFail renvoie le jeu, ou affiche une 404 s'il n'existe pas :
    // pas besoin de vérifier si le jeu existe après
    const game = await Game.findOrFail(params.id)

    // Seuls l'auteur du jeu et les admins ont le droit de le modifier
    if (!game.canBeManagedBy(auth.user)) {
      session.flash('error', "Vous n'avez pas le droit de modifier ce jeu")
      return response.redirect().toRoute('games.show', { id: game.id })
    }

    return inertia.render('games/edit', { game: GameTransformer.transform(game) })
  }

  /**
   * Enregistre les modifications d'un jeu
   */
  async update({ params, request, response, session, auth }: HttpContext) {
    // 1. Chercher le jeu à modifier (404 s'il n'existe pas)
    const game = await Game.findOrFail(params.id)
    const user = auth.getUserOrFail()

    // 2. Vérifier les droits (cacher le bouton ne suffit pas : on peut
    //    envoyer une requête PUT sans passer par la page)
    if (!game.canBeManagedBy(user)) {
      session.flash('error', "Vous n'avez pas le droit de modifier ce jeu")
      return response.redirect().toRoute('games.show', { id: game.id })
    }

    // 3. Valider les données du formulaire (même validateur que pour l'ajout)
    const payload = await request.validateUsing(gameValidator)

    // 4. Remplacer les anciennes valeurs par les nouvelles, puis enregistrer.
    //    Modifié par un non-admin -> le jeu devra être revérifié par un admin.
    await game.merge({ ...payload, isVerified: user.isAdmin ? game.isVerified : false }).save()

    // 5. Message de confirmation + retour sur la fiche du jeu
    session.flash('success', 'Jeu modifié')
    return response.redirect().toRoute('games.show', { id: game.id })
  }

  /**
   * Supprime un jeu (et ses critiques, grâce au onDelete CASCADE)
   */
  async destroy({ params, response, session, auth }: HttpContext) {
    const game = await Game.findOrFail(params.id)

    if (!game.canBeManagedBy(auth.user)) {
      session.flash('error', "Vous n'avez pas le droit de supprimer ce jeu")
      return response.redirect().toRoute('games.show', { id: game.id })
    }

    await game.delete()

    session.flash('success', 'Jeu supprimé')
    return response.redirect().toRoute('games.index')
  }

  /**
   * Admin : marque un jeu comme vérifié, ou retire la vérification
   * PATCH /games/:id/verify
   */
  async verify({ params, response, session, auth }: HttpContext) {
    const game = await Game.findOrFail(params.id)

    if (!auth.user?.isAdmin) {
      session.flash('error', 'Seul un administrateur peut vérifier un jeu')
      return response.redirect().toRoute('games.show', { id: game.id })
    }

    // Inverse l'état : vérifié <-> non vérifié
    game.isVerified = !game.isVerified
    await game.save()

    session.flash('success', game.isVerified ? 'Jeu vérifié' : 'Vérification retirée')
    return response.redirect().toRoute('games.show', { id: game.id })
  }
}
