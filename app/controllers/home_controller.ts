import type { HttpContext } from '@adonisjs/core/http'
import Game from '#models/game'
import Review from '#models/review'
import GameTransformer from '#transformers/game_transformer'

export default class HomeController {
  /**
   * Page d'accueil : les jeux les mieux notés, les derniers ajouts
   * et quelques chiffres sur le catalogue.
   */
  async index({ inertia }: HttpContext) {
    // Les 4 jeux vérifiés les mieux notés (au moins une critique)
    const topRated = await Game.queryWithStats()
      .where('is_verified', true)
      .has('reviews')
      .orderBy('averageRating', 'desc')
      .limit(4)

    // Les 4 derniers jeux ajoutés
    const latest = await Game.queryWithStats().orderBy('created_at', 'desc').limit(4)

    // Nombre total de jeux et de critiques
    const gamesCount = await Game.query().count('* as total').firstOrFail()
    const reviewsCount = await Review.query().count('* as total').firstOrFail()

    return inertia.render('home', {
      topRated: GameTransformer.transform(topRated),
      latest: GameTransformer.transform(latest),
      stats: {
        games: Number(gamesCount.$extras.total),
        reviews: Number(reviewsCount.$extras.total),
      },
    })
  }
}
