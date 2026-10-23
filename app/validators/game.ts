import vine from '@vinejs/vine'

/**
 * Règles de validation d'un jeu (formulaires d'ajout et de modification).
 *
 * user_id et is_verified ne sont volontairement PAS ici : ils sont
 * remplis par le serveur. Sinon, n'importe qui pourrait envoyer
 * is_verified=true ou se faire passer pour un autre utilisateur.
 */
export const gameValidator = vine.create({
  // Obligatoire, entre 2 et 255 caractères (espaces autour retirés)
  title: vine.string().trim().minLength(2).maxLength(255),

  // Obligatoire (la colonne est notNullable dans la migration)
  publisher: vine.string().trim().minLength(2).maxLength(255),

  // Facultatifs : .nullable() accepte un champ vide.
  // Les champs vides du formulaire arrivent en null grâce à
  // l'option convertEmptyStringsToNull de config/bodyparser.ts
  genre: vine.string().trim().maxLength(100).nullable(),
  releaseDate: vine.date({ formats: ['YYYY-MM-DD'] }).nullable(),
  description: vine.string().trim().maxLength(5000).nullable(),

  // Doit être une vraie URL (http://... ou https://...)
  imageUrl: vine.string().trim().url().maxLength(255).nullable(),
})

/**
 * Filtres de la liste des jeux (paramètres de l'URL : /games?search=...)
 * Tout est facultatif.
 */
export const gameFiltersValidator = vine.create({
  search: vine.string().trim().maxLength(100).optional(),
  genre: vine.string().trim().maxLength(100).optional(),
  sort: vine.enum(['title', 'rating', 'recent'] as const).optional(),
})
