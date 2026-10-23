import { Gamepad2 } from 'lucide-react'
import { type Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/react'

/**
 * Carte d'un jeu (jaquette, titre, éditeur, note), cliquable vers sa fiche.
 * Utilisée sur la page d'accueil et dans le catalogue.
 */
export default function GameCard({ game }: { game: Data.Game }) {
  return (
    <li className="game-card">
      {/* Toute la carte est un lien vers /games/:id (route games.show) */}
      <Link route="games.show" routeParams={{ id: game.id }} className="game-card__link">
        {game.imageUrl ? (
          <img src={game.imageUrl} alt={game.title} className="game-card__cover" />
        ) : (
          <div className="game-card__cover game-card__cover--empty">
            <Gamepad2 size={28} />
          </div>
        )}
        <div className="game-card__body">
          <strong className="game-card__title">{game.title}</strong>
          <span className="game-card__meta">
            {game.publisher}
            {game.releaseDate && ` · ${game.releaseDate.slice(0, 4)}`}
          </span>
          <span className="game-card__meta">
            {game.averageRating !== null
              ? `${game.averageRating} ★ · ${game.reviewsCount} critique${game.reviewsCount > 1 ? 's' : ''}`
              : 'Pas encore noté'}
            {!game.isVerified && ' · non vérifié'}
          </span>
        </div>
      </Link>
    </li>
  )
}
