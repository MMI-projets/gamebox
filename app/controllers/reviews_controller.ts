import type { HttpContext } from '@adonisjs/core/http'
import Game from '#models/game'
import Review from '#models/review'
import { reviewValidator } from '#validators/review'

export default class ReviewsController {
  /**
   * Publie la critique de l'utilisateur connecté sur un jeu
   * POST /games/:game_id/reviews
   */
  async store({ params, request, response, session, auth }: HttpContext) {
    const game = await Game.findOrFail(params.game_id)
    const user = auth.getUserOrFail()

    // Règle métier : une seule critique par jeu et par utilisateur.
    // (La contrainte unique de la migration protège aussi la base.)
    const alreadyReviewed = await Review.query()
      .where('user_id', user.id)
      .where('game_id', game.id)
      .first()

    if (alreadyReviewed) {
      session.flash('error', 'Vous avez déjà publié une critique pour ce jeu')
      return response.redirect().toRoute('games.show', { id: game.id })
    }

    const payload = await request.validateUsing(reviewValidator)

    // game_id vient de l'URL, user_id de l'utilisateur connecté
    await game.related('reviews').create({ ...payload, userId: user.id })

    session.flash('success', 'Critique publiée')
    return response.redirect().toRoute('games.show', { id: game.id })
  }

  /**
   * Modifie sa propre critique
   * PUT /reviews/:id
   */
  async update({ params, request, response, session, auth }: HttpContext) {
    const review = await Review.findOrFail(params.id)

    if (!review.canBeEditedBy(auth.user)) {
      session.flash('error', 'Vous ne pouvez modifier que vos propres critiques')
      return response.redirect().toRoute('games.show', { id: review.gameId })
    }

    const payload = await request.validateUsing(reviewValidator)
    await review.merge(payload).save()

    session.flash('success', 'Critique modifiée')
    return response.redirect().toRoute('games.show', { id: review.gameId })
  }

  /**
   * Supprime une critique (son auteur, ou un admin pour la modération)
   * DELETE /reviews/:id
   */
  async destroy({ params, response, session, auth }: HttpContext) {
    const review = await Review.findOrFail(params.id)

    if (!review.canBeDeletedBy(auth.user)) {
      session.flash('error', "Vous n'avez pas le droit de supprimer cette critique")
      return response.redirect().toRoute('games.show', { id: review.gameId })
    }

    await review.delete()

    session.flash('success', 'Critique supprimée')
    return response.redirect().toRoute('games.show', { id: review.gameId })
  }
}
