import vine from '@vinejs/vine'

/**
 * Règles d'une critique (ajout et modification).
 * user_id et game_id ne sont pas ici : ils viennent de l'utilisateur
 * connecté et de l'URL, jamais du formulaire.
 */
export const reviewValidator = vine.create({
  // Note en demi-étoiles : entier de 1 (0,5 ★) à 8 (4 ★)
  rating: vine.number().withoutDecimals().range([1, 8]),

  // Texte facultatif
  content: vine.string().trim().maxLength(2000).nullable(),
})
