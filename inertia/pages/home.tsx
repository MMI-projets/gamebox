import { Head, usePage } from '@inertiajs/react'
import AppLayout from '~/layouts/app'
import GameCard from '~/components/game_card'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Link } from '@adonisjs/inertia/react'
import { ArrowRight } from 'lucide-react'

/**
 * Page d'accueil. Props envoyées par HomeController.index
 */
type Props = InertiaProps<{
  topRated: Data.Game[]
  latest: Data.Game[]
  stats: { games: number; reviews: number }
}>

export default function Home({ topRated, latest, stats }: Props) {
  const { user } = usePage().props

  return (
    <div className="page">
      <Head title="Accueil" />

      {/* ---------- Présentation ---------- */}
      <section className="hero">
        <p className="hero__press-start">▶ PRESS START</p>
        <h1 className="hero__title">Notez les jeux vidéo auxquels vous jouez.</h1>
        <p className="hero__text">
          GameBox, c&apos;est le carnet de jeux de la communauté : parcourez le catalogue, donnez
          une note de 0,5 à 4 étoiles et partagez votre critique.
        </p>
        <div className="hero__actions">
          <Link route="games.index" className="btn btn--primary">
            Parcourir le catalogue
          </Link>
          {!user && (
            <Link route="new_account.create" className="btn btn--secondary">
              Créer un compte
            </Link>
          )}
        </div>
        <p className="hero__stats">
          {stats.games} jeu{stats.games > 1 ? 'x' : ''} · {stats.reviews} critique
          {stats.reviews > 1 ? 's' : ''}
        </p>
      </section>

      {/* ---------- Les mieux notés ---------- */}
      {topRated.length > 0 && (
        <section className="home-section">
          <header className="home-section__header">
            <h2>Les mieux notés</h2>
            <Link route="games.index" qs={{ sort: 'rating' }} className="il">
              Voir tout <ArrowRight size={14} />
            </Link>
          </header>
          <ul className="game-grid">
            {topRated.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Derniers ajouts ---------- */}
      {latest.length > 0 && (
        <section className="home-section">
          <header className="home-section__header">
            <h2>Ajoutés récemment</h2>
            <Link route="games.index" qs={{ sort: 'recent' }} className="il">
              Voir tout <ArrowRight size={14} />
            </Link>
          </header>
          <ul className="game-grid">
            {latest.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

Home.layout = [AppLayout]
