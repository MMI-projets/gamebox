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
 * - un catalogue de jeux avec leurs jaquettes, et des critiques
 *
 * On utilise updateOrCreate : relancer le seeder ne crée pas de doublons,
 * il met simplement les jeux à jour.
 *
 * Jaquettes : images hébergées par Wikipédia (Wikimedia). Elles restent la
 * propriété de leurs éditeurs et sont utilisées ici à titre pédagogique.
 */

const COVERS = 'https://upload.wikimedia.org/wikipedia'

type DemoGame = {
  title: string
  publisher: string
  genre: string
  releaseDate: string
  description: string
  imageUrl: string | null
  /** Note du joueur démo, en demi-étoiles (1 à 8) */
  rating: number
  review: string | null
}

const GAMES: DemoGame[] = [
  {
    title: 'The Witcher 3: Wild Hunt',
    publisher: 'CD Projekt',
    genre: 'RPG',
    releaseDate: '2015-05-19',
    description: 'Geralt de Riv part à la recherche de Ciri dans un monde ouvert immense.',
    imageUrl: `${COVERS}/en/0/0c/Witcher_3_cover_art.jpg`,
    rating: 8,
    review: 'Des quêtes secondaires mieux écrites que la plupart des jeux entiers.',
  },
  {
    title: 'Hollow Knight',
    publisher: 'Team Cherry',
    genre: 'Metroidvania',
    releaseDate: '2017-02-24',
    description: 'Exploration d’un royaume d’insectes en ruines, exigeant et poétique.',
    imageUrl: `${COVERS}/en/d/de/Hollow_Knight_2026_cover_art.jpg`,
    rating: 8,
    review: 'Difficile, magnifique, et une ambiance sonore incroyable.',
  },
  {
    title: 'Minecraft',
    publisher: 'Mojang Studios',
    genre: 'Bac à sable',
    releaseDate: '2011-11-18',
    description: 'Construire, explorer et survivre dans un monde fait de blocs.',
    imageUrl: null,
    rating: 7,
    review: 'Des centaines d’heures de construction entre amis.',
  },
  {
    title: 'Elden Ring',
    publisher: 'Bandai Namco',
    genre: 'RPG',
    releaseDate: '2022-02-25',
    description: 'Un action-RPG en monde ouvert signé FromSoftware.',
    imageUrl: `${COVERS}/en/b/b9/Elden_Ring_Box_art.jpg`,
    rating: 8,
    review: 'Chaque recoin de la carte cache un secret.',
  },
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    publisher: 'Nintendo',
    genre: 'Action-aventure',
    releaseDate: '2017-03-03',
    description: 'Link se réveille dans un Hyrule en ruines, libre d’aller où il veut.',
    imageUrl: `${COVERS}/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg`,
    rating: 8,
    review: 'La liberté d’exploration la plus grisante qui soit.',
  },
  {
    title: 'Super Mario Odyssey',
    publisher: 'Nintendo',
    genre: 'Plateforme',
    releaseDate: '2017-10-27',
    description: 'Mario et sa casquette Cappy voyagent de royaume en royaume.',
    imageUrl: `${COVERS}/en/8/8d/Super_Mario_Odyssey.jpg`,
    rating: 7,
    review: 'Une idée de gameplay nouvelle à chaque niveau.',
  },
  {
    title: 'Celeste',
    publisher: 'Maddy Makes Games',
    genre: 'Plateforme',
    releaseDate: '2018-01-25',
    description: 'Madeline escalade la montagne Celeste et affronte ses propres doutes.',
    imageUrl: `${COVERS}/commons/0/0f/Celeste_box_art_full.png`,
    rating: 8,
    review: 'Un jeu de plateforme précis avec une histoire touchante.',
  },
  {
    title: 'Hades',
    publisher: 'Supergiant Games',
    genre: 'Roguelike',
    releaseDate: '2020-09-17',
    description: 'Zagreus tente de s’échapper des Enfers, encore et encore.',
    imageUrl: `${COVERS}/en/c/cc/Hades_cover_art.jpg`,
    rating: 8,
    review: 'Chaque mort fait avancer l’histoire : génial.',
  },
  {
    title: 'Stardew Valley',
    publisher: 'ConcernedApe',
    genre: 'Simulation',
    releaseDate: '2016-02-26',
    description: 'Reprendre la ferme de son grand-père et s’installer à Pélican Ville.',
    imageUrl: null,
    rating: 7,
    review: 'Le jeu parfait pour se détendre.',
  },
  {
    title: 'Red Dead Redemption 2',
    publisher: 'Rockstar Games',
    genre: 'Action-aventure',
    releaseDate: '2018-10-26',
    description: 'L’épopée d’Arthur Morgan et de la bande de Dutch dans l’Ouest américain.',
    imageUrl: `${COVERS}/en/4/44/Red_Dead_Redemption_II.jpg`,
    rating: 7,
    review: 'Lent, mais quel monde et quelle histoire.',
  },
  {
    title: 'Portal 2',
    publisher: 'Valve',
    genre: 'Réflexion',
    releaseDate: '2011-04-19',
    description: 'Des énigmes à base de portails, et GLaDOS toujours aussi drôle.',
    imageUrl: `${COVERS}/en/f/f9/Portal2cover.jpg`,
    rating: 8,
    review: 'Le mode coopération est un bijou.',
  },
  {
    title: 'Undertale',
    publisher: 'Toby Fox',
    genre: 'RPG',
    releaseDate: '2015-09-15',
    description: 'Un RPG où l’on peut finir le jeu sans tuer personne.',
    imageUrl: null,
    rating: 7,
    review: null,
  },
  {
    title: 'God of War',
    publisher: 'Sony Interactive Entertainment',
    genre: 'Action-aventure',
    releaseDate: '2018-04-20',
    description: 'Kratos et son fils Atreus traversent les terres de la mythologie nordique.',
    imageUrl: `${COVERS}/en/a/a7/God_of_War_4_cover.jpg`,
    rating: 7,
    review: 'Le plan-séquence unique du début à la fin impressionne.',
  },
  {
    title: 'Animal Crossing: New Horizons',
    publisher: 'Nintendo',
    genre: 'Simulation',
    releaseDate: '2020-03-20',
    description: 'Aménager son île déserte avec des voisins animaux.',
    imageUrl: `${COVERS}/en/1/1f/Animal_Crossing_New_Horizons.jpg`,
    rating: 6,
    review: 'Très mignon, un peu répétitif sur la durée.',
  },
  {
    title: 'Cyberpunk 2077',
    publisher: 'CD Projekt',
    genre: 'RPG',
    releaseDate: '2020-12-10',
    description: 'Un mercenaire dans la mégalopole de Night City.',
    imageUrl: `${COVERS}/en/9/9f/Cyberpunk_2077_box_art.jpg`,
    rating: 6,
    review: 'Une sortie difficile, mais bien meilleur après les mises à jour.',
  },
  {
    title: 'Sekiro: Shadows Die Twice',
    publisher: 'Activision',
    genre: 'Action',
    releaseDate: '2019-03-22',
    description: 'Un shinobi dans un Japon féodal fantastique, des combats au sabre exigeants.',
    imageUrl: `${COVERS}/en/6/6e/Sekiro_art.jpg`,
    rating: 7,
    review: null,
  },
  {
    title: 'Super Metroid',
    publisher: 'Nintendo',
    genre: 'Metroidvania',
    releaseDate: '1994-03-19',
    description: 'Samus Aran explore la planète Zebes. Le jeu qui a défini un genre.',
    imageUrl: `${COVERS}/en/e/e4/Smetroidbox.jpg`,
    rating: 8,
    review: 'Toujours aussi bon trente ans plus tard.',
  },
  {
    title: 'Persona 5',
    publisher: 'Atlus',
    genre: 'RPG',
    releaseDate: '2016-09-15',
    description: 'Des lycéens de Tokyo volent le cœur des adultes corrompus.',
    imageUrl: `${COVERS}/en/b/b0/Persona_5_cover_art.jpg`,
    rating: 8,
    review: 'Le style visuel le plus classe du jeu vidéo.',
  },
  {
    title: "Baldur's Gate 3",
    publisher: 'Larian Studios',
    genre: 'RPG',
    releaseDate: '2023-08-03',
    description: 'Un RPG tactique dans l’univers de Donjons et Dragons.',
    imageUrl: `${COVERS}/en/1/12/Baldur%27s_Gate_3_cover_art.jpg`,
    rating: 8,
    review: 'Chaque choix compte vraiment.',
  },
  {
    title: 'Pokémon Rouge et Bleu',
    publisher: 'Nintendo',
    genre: 'RPG',
    releaseDate: '1996-02-27',
    description: 'Attrapez-les tous ! Les tout premiers Pokémon sur Game Boy.',
    imageUrl: `${COVERS}/en/a/af/Pok%C3%A9mon_Red_and_Blue_cover_art.webp`,
    rating: 7,
    review: 'La nostalgie à l’état pur.',
  },
  {
    title: 'Tetris',
    publisher: 'Nintendo',
    genre: 'Réflexion',
    releaseDate: '1989-06-14',
    description: 'La version Game Boy du jeu de blocs le plus célèbre au monde.',
    imageUrl: `${COVERS}/en/4/4a/Tetris_Boxshot.jpg`,
    rating: 8,
    review: 'Indémodable.',
  },
]

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

    for (const { rating, review, releaseDate, ...data } of GAMES) {
      const game = await Game.updateOrCreate(
        { title: data.title },
        {
          ...data,
          releaseDate: DateTime.fromISO(releaseDate),
          userId: admin.id,
          isVerified: true,
        }
      )

      // Critique du joueur démo
      await Review.updateOrCreate(
        { userId: player.id, gameId: game.id },
        { rating, content: review }
      )
    }
  }
}
