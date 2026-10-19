import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // L'auteur de la critique. Compte supprimé => ses critiques aussi.
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // Le jeu noté. Jeu supprimé => ses critiques n'ont plus de sens.
      table
        .integer('game_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE')

      // Note en demi-étoiles : de 1 (0,5 ★) à 8 (4 ★).
      // La règle 1 à 8 sera vérifiée par VineJS.
      table.integer('rating').notNullable()

      table.text('content').nullable() // texte facultatif

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Un utilisateur ne peut écrire qu'une seule critique par jeu :
      // le couple (user_id, game_id) ne peut jamais apparaître deux fois.
      table.unique(['user_id', 'game_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
