import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Game from '#models/game'
import Review from '#models/review'
import GameTransformer from '#transformers/game_transformer'
import ReviewTransformer from '#transformers/review_transformer'
import ProfileTransformer from '#transformers/profile_transformer'

export default class UsersController {
  /**
   * Profil public d'un utilisateur : ses critiques, les jeux qu'il a
   * ajoutés et des statistiques sur ses notes.
   * GET /users/:id
   */
  async show({ params, inertia }: HttpContext) {
    // 404 si l'utilisateur n'existe pas
    const profile = await User.findOrFail(params.id)

    // Ses critiques, avec le jeu concerné (pour la jaquette et le titre)
    const reviews = await Review.query()
      .where('user_id', profile.id)
      .preload('game')
      .preload('user')
      .orderBy('created_at', 'desc')

    // Les jeux qu'il a ajoutés au catalogue, avec leur note moyenne
    const games = await Game.queryWithStats()
      .where('user_id', profile.id)
      .orderBy('created_at', 'desc')

    // --- Statistiques (calculées en JavaScript à partir des critiques) ---

    // Répartition des notes : combien de critiques pour chaque note de 1 à 8
    const distribution = [1, 2, 3, 4, 5, 6, 7, 8].map((rating) => ({
      stars: rating / 2,
      count: reviews.filter((review) => review.rating === rating).length,
    }))

    // Note moyenne donnée, en étoiles arrondies à 0,1 (null si aucune critique)
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageGiven = reviews.length ? Math.round((total / reviews.length / 2) * 10) / 10 : null

    return inertia.render('users/show', {
      profile: ProfileTransformer.transform(profile),
      reviews: ReviewTransformer.transform(reviews),
      games: GameTransformer.transform(games),
      stats: {
        reviewsCount: reviews.length,
        gamesCount: games.length,
        averageGiven,
        distribution,
      },
    })
  }
}
