/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { SimpleMessagesProvider, VineDate } from '@vinejs/vine'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

VineDate.transform((value) => DateTime.fromJSDate(value))

/**
 * Messages d'erreur en français pour tous les validateurs.
 * {{ field }}, {{ min }} et {{ max }} sont remplacés par VineJS.
 */
vine.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'Le champ {{ field }} est obligatoire',
    'string': 'Le champ {{ field }} doit être un texte',
    'minLength': 'Le champ {{ field }} doit contenir au moins {{ min }} caractères',
    'maxLength': 'Le champ {{ field }} ne doit pas dépasser {{ max }} caractères',
    'url': 'Le champ {{ field }} doit être une URL valide (https://...)',
    'date': 'Le champ {{ field }} doit être une date valide',
    'date.equals': 'Le champ {{ field }} doit être une date valide',
    'email': "L'adresse email n'est pas valide",
    'database.unique': 'Cette valeur est déjà utilisée',
    'sameAs': 'Les mots de passe ne correspondent pas',
  },
  {
    title: 'titre',
    publisher: 'éditeur',
    genre: 'genre',
    releaseDate: 'date de sortie',
    description: 'description',
    imageUrl: "URL de l'image",
    fullName: 'nom complet',
    password: 'mot de passe',
  }
)
