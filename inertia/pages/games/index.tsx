import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Gamepad2, Plus } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'

/**
 * Liste des jeux. Les props viennent de GamesController.index :
 * inertia.render('games/index', { games: ... })
 */
export default function GamesIndex({ games }: InertiaProps<{ games: Data.Game[] }>) {
  // Utilisateur connecté (partagé avec toutes les pages par le middleware Inertia)
  const { user } = usePage().props

  return (
    <Page
      title="Jeux"
      description={`${games.length} jeu${games.length > 1 ? 'x' : ''}`}
      actions={
        // Le bouton n'apparaît que si l'utilisateur est connecté
        user && (
          <Link route="games.create" className="btn btn--primary">
            <Plus size={15} /> Ajouter un jeu
          </Link>
        )
      }
    >
      {games.length === 0 ? (
        <div className="empty">
          <div className="empty__mark">
            <Gamepad2 size={22} />
          </div>
          <h1>Aucun jeu pour le moment</h1>
          <p>Les jeux ajoutés par la communauté apparaîtront ici.</p>
        </div>
      ) : (
        <ul className="game-grid">
          {games.map((game) => (
            <li key={game.id} className="game-card">
              {/* Toute la carte devient un lien vers /games/:id (route games.show) */}
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Page>
  )
}

GamesIndex.layout = [AppLayout]
