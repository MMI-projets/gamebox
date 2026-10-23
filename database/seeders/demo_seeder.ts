import { DateTime } from 'luxon'
import User from '#models/user'
import Game from '#models/game'
import Review from '#models/review'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

/**
 * Données de démonstration : node ace db:seed
 *
 * - admin@gamebox.fr / password123 (rôle admin)
 * - joueur@gamebox.fr / password123 (utilisateur normal)
 * - quelques jeux et critiques
 *
 * On utilise updateOrCreate : relancer le seeder ne crée pas de doublons.
 */
export default class DemoSeeder extends BaseSeeder {
  async run() {
    const admin = await User.updateOrCreate(
      { email: 'admin@gamebox.fr' },
      { fullName: 'Admin GameBox', password: 'password123', role: 'admin' }
    )
    const player = await User.updateOrCreate(
      { email: 'joueur@gamebox.fr' },
      { fullName: 'Joueur Démo', password: 'password123', role: 'user' }
    )

    const games = [
      {
        title: 'The Witcher 3: Wild Hunt',
        publisher: 'CD Projekt',
        genre: 'RPG',
        releaseDate: DateTime.fromISO('2015-05-19'),
        description: 'Geralt de Riv part à la recherche de Ciri dans un monde ouvert immense.',
      },
      {
        title: 'Hollow Knight',
        publisher: 'Team Cherry',
        genre: 'Metroidvania',
        releaseDate: DateTime.fromISO('2017-02-24'),
        description: 'Exploration d’un royaume d’insectes en ruines, exigeant et poétique.',
      },
      {
        title: 'Minecraft',
        publisher: 'Mojang Studios',
        genre: 'Bac à sable',
        releaseDate: DateTime.fromISO('2011-11-18'),
        description: 'Construire, explorer et survivre dans un monde fait de blocs.',
      },
      {
        title: 'Elden Ring',
        publisher: 'Bandai Namco',
        genre: 'RPG',
        releaseDate: DateTime.fromISO('2022-02-25'),
        description: 'Un action-RPG en monde ouvert signé FromSoftware.',
      },
    ]

    for (const data of games) {
      const game = await Game.updateOrCreate(
        { title: data.title },
        { ...data, userId: admin.id, isVerified: true }
      )

      // Critique du joueur démo (note en demi-étoiles)
      await Review.updateOrCreate(
        { userId: player.id, gameId: game.id },
        { rating: data.genre === 'RPG' ? 8 : 7, content: 'Un excellent jeu, je recommande !' }
      )
    }
  }
}
