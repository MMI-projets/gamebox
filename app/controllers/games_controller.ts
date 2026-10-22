import type { HttpContext } from '@adonisjs/core/http'
import Game from '#models/game'
import GameTransformer from '#transformers/game_transformer'
import { gameValidator } from '#validators/game'

export default class GamesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    // Récupère tous les jeux, triés par titre
    const games = await Game.query().orderBy('title')

    // Affiche la page inertia/pages/games/index.tsx avec la liste des jeux
    return inertia.render('games/index', { games: GameTransformer.transform(games) })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    // Affiche le formulaire inertia/pages/games/create.tsx (aucune donnée à envoyer)
    return inertia.render('games/create', {})
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, session }: HttpContext) {
    // 1. Valide les données envoyées par le formulaire avec VineJS.
    //    Si une règle échoue, AdonisJS renvoie automatiquement sur le
    //    formulaire avec les messages d'erreur : la suite n'est pas exécutée.
    const payload = await request.validateUsing(gameValidator)

    // 2. Crée le jeu en le rattachant à l'utilisateur connecté :
    //    related('games') remplit user_id tout seul (relation hasMany)
    const user = auth.getUserOrFail()
    await user.related('games').create(payload)

    // 3. Message de confirmation + retour à la liste
    session.flash('success', 'Jeu ajouté au catalogue')
    return response.redirect().toRoute('games.index')
  }

  /**
   * Show individual record
   */
  async show({ params, inertia }: HttpContext) {
    const game = await Game.findOrFail(params.id)
    return inertia.render('games/show', { game: GameTransformer.transform(game) })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
