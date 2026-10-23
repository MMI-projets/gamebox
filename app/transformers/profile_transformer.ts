import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

/**
 * Informations PUBLIQUES d'un utilisateur, affichées sur son profil.
 * Contrairement à UserTransformer (utilisateur connecté), on n'envoie
 * jamais l'email : n'importe qui peut voir un profil.
 */
export default class ProfileTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.fullName ?? 'Joueur anonyme',
      initials: this.resource.initials,
      isAdmin: this.resource.isAdmin,
      // Date d'inscription au format "AAAA-MM-JJ"
      memberSince: this.resource.createdAt.toISODate(),
    }
  }
}
