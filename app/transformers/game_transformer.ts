import type Game from '#models/game'
import { BaseTransformer } from '@adonisjs/core/transformers'

/**
 * Choisit les données d'un jeu envoyées aux pages React.
 * On ne passe jamais le modèle Lucid directement : le transformer
 * contrôle ce qui sort du serveur et donne un type précis côté React.
 */
export default class GameTransformer extends BaseTransformer<Game> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'publisher', 'genre', 'description', 'imageUrl']),
      // SQLite stocke les booléens en 0/1 : on les convertit en vrai booléen
      isVerified: Boolean(this.resource.isVerified),
      // Date Luxon -> texte "AAAA-MM-JJ" (ou null si pas de date)
      releaseDate: this.resource.releaseDate?.toISODate() ?? null,
    }
  }
}
