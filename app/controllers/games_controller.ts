import type { HttpContext } from '@adonisjs/core/http'
import Game from '#models/game'
import GameTransformer from '#transformers/game_transformer'

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
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

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
