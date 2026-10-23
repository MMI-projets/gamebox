import { ReviewSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Game from '#models/game'

export default class Review extends ReviewSchema {
  // Une critique appartient à l'utilisateur qui l'a écrite (colonne user_id)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Une critique concerne un jeu (colonne game_id)
  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>

  /**
   * Seul l'auteur peut modifier sa critique
   */
  canBeEditedBy(user?: User | null) {
    return !!user && user.id === this.userId
  }

  /**
   * L'auteur ou un admin (modération) peut supprimer une critique
   */
  canBeDeletedBy(user?: User | null) {
    return !!user && (user.isAdmin || user.id === this.userId)
  }
}
