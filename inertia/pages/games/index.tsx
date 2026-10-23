import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Gamepad2, Plus } from 'lucide-react'
import { useState } from 'react'
import { urlFor } from '~/client'
import { router, usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'

/**
 * Liste des jeux. Les props viennent de GamesController.index :
 * inertia.render('games/index', { games: ... })
 */
type Props = InertiaProps<{
  games: Data.Game[]
  genres: string[]
  filters: { search: string; genre: string; sort: string }
}>

export default function GamesIndex({ games, genres, filters }: Props) {
  // Utilisateur connecté (partagé avec toutes les pages par le middleware Inertia)
  const { user } = usePage().props
  const [search, setSearch] = useState(filters.search)

  /**
   * Recharge la liste avec les nouveaux filtres dans l'URL
   * (/games?search=...&genre=...&sort=...). Les filtres vides sont retirés.
   */
  const applyFilters = (changes: Partial<Props['filters']>) => {
    const query = Object.fromEntries(
      Object.entries({ ...filters, search, ...changes }).filter(([, value]) => value !== '')
    )
    router.get(urlFor('games.index'), query, { preserveState: true, replace: true })
  }

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
      {/* Recherche, filtre et tri — mise en page à faire */}
      <form
        className="game-filters"
        onSubmit={(event) => {
          event.preventDefault()
          applyFilters({})
        }}
      >
        <input
          type="search"
          className="field__input"
          placeholder="Rechercher un jeu…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="field__input"
          value={filters.genre}
          onChange={(event) => applyFilters({ genre: event.target.value })}
          aria-label="Filtrer par genre"
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          className="field__input"
          value={filters.sort}
          onChange={(event) => applyFilters({ sort: event.target.value })}
          aria-label="Trier"
        >
          <option value="title">Titre (A → Z)</option>
          <option value="rating">Mieux notés</option>
          <option value="recent">Ajouts récents</option>
        </select>
        <button type="submit" className="btn btn--secondary">
          Rechercher
        </button>
      </form>

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
                  <span className="game-card__meta">
                    {game.averageRating !== null
                      ? `${game.averageRating} ★ · ${game.reviewsCount} critique${game.reviewsCount > 1 ? 's' : ''}`
                      : 'Pas encore noté'}
                    {!game.isVerified && ' · non vérifié'}
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
