import { GameSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Review from '#models/review'

export default class Game extends GameSchema {
  // Un jeu appartient à l'utilisateur qui l'a ajouté (colonne user_id)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
    // Un jeu peut avoir plusieurs critiques
  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>
}
