import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // clé primaire auto-incrémentée

      // Clé étrangère : l'utilisateur qui a ajouté le jeu.
      // Si l'utilisateur est supprimé, ses jeux le sont aussi (CASCADE).
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('title').notNullable() // texte court, obligatoire
      table.string('publisher').notNullable() // éditeur (ex : Naughty Dog)
      table.string('genre').nullable() // facultatif
      table.date('release_date').nullable() // date sans heure, facultative
      table.text('description').nullable() // texte long, facultatif
      table.string('image_url').nullable() // URL de la jaquette, facultative

      // Vérifié par un admin ? Faux par défaut à la création.
      table.boolean('is_verified').notNullable().defaultTo(false)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
