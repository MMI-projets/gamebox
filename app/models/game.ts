import { GameSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Review from '#models/review'

export default class Game extends GameSchema {
  // Un jeu appartient à l'utilisateur qui l'a ajouté (colonne user_id)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Un jeu peut avoir plusieurs critiques
  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  /**
   * Requête qui ajoute à chaque jeu sa note moyenne et son nombre de
   * critiques, calculés par SQLite. On les retrouve dans game.$extras :
   * - $extras.averageRating : moyenne des notes (en demi-étoiles)
   * - $extras.reviews_count : nombre de critiques
   */
  static queryWithStats() {
    return this.query()
      .withAggregate('reviews', (query) => query.avg('rating').as('averageRating'))
      .withCount('reviews')
  }

  /**
   * Seuls l'utilisateur qui a ajouté le jeu et les admins
   * peuvent le modifier ou le supprimer.
   */
  canBeManagedBy(user?: User | null) {
    if (!user) return false
    return user.isAdmin || user.id === this.userId
  }
}
