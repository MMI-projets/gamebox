import type Review from '#models/review'
import { BaseTransformer } from '@adonisjs/core/transformers'

/**
 * Données d'une critique envoyées aux pages React.
 * La relation `user` doit être préchargée (preload('user')) pour avoir le nom de l'auteur.
 */
export default class ReviewTransformer extends BaseTransformer<Review> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'userId', 'gameId', 'rating', 'content', 'createdAt']),
      // Note en étoiles pour l'affichage (rating est en demi-étoiles : 7 -> 3.5)
      stars: this.resource.rating / 2,
      // On n'envoie que le nom de l'auteur, jamais son email
      authorName: this.resource.user?.fullName ?? 'Anonyme',
      // Le jeu noté, si la relation a été préchargée (preload('game')) :
      // utilisé sur le profil pour afficher la jaquette et le titre
      game: this.resource.game
        ? {
            id: this.resource.game.id,
            title: this.resource.game.title,
            imageUrl: this.resource.game.imageUrl,
          }
        : null,
    }
  }
}
