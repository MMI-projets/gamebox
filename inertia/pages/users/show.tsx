import { Gamepad2 } from 'lucide-react'
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import GameCard from '~/components/game_card'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Link } from '@adonisjs/inertia/react'

/**
 * Profil public d'un utilisateur. Props envoyées par UsersController.show
 */
type Props = InertiaProps<{
  profile: Data.Profile
  reviews: Data.Review[]
  games: Data.Game[]
  stats: {
    reviewsCount: number
    gamesCount: number
    averageGiven: number | null
    distribution: { stars: number; count: number }[]
  }
}>

export default function ShowUser({ profile, reviews, games, stats }: Props) {
  // Plus grande barre du graphique = 100 % de la largeur
  const maxCount = Math.max(1, ...stats.distribution.map((bar) => bar.count))

  return (
    <Page title={profile.name}>
      {/* ---------- En-tête du profil ---------- */}
      <header className="profile">
        <div className="profile__avatar" aria-hidden="true">
          {profile.initials}
        </div>
        <div>
          <p className="profile__name">
            {profile.name}
            {profile.isAdmin && <span className="user-menu__badge">admin</span>}
          </p>
          {profile.memberSince && (
            <p className="profile__since">
              Membre depuis le {new Date(profile.memberSince).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      </header>

      {/* ---------- Statistiques ---------- */}
      <section className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat__value">{stats.reviewsCount}</span>
          <span className="profile-stat__label">jeux notés</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__value">
            {stats.averageGiven !== null ? `${stats.averageGiven} ★` : '–'}
          </span>
          <span className="profile-stat__label">note moyenne</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__value">{stats.gamesCount}</span>
          <span className="profile-stat__label">jeux ajoutés</span>
        </div>
      </section>

      {/* Répartition des notes : une barre par note, de 0,5 à 4 étoiles */}
      {stats.reviewsCount > 0 && (
        <section className="profile-section">
          <h2 className="profile-section__title">Répartition des notes</h2>
          <ul className="rating-chart">
            {stats.distribution.map((bar) => (
              <li key={bar.stars} className="rating-chart__row">
                <span className="rating-chart__label">{bar.stars} ★</span>
                <span className="rating-chart__track">
                  <span
                    className="rating-chart__bar"
                    style={{ width: `${(bar.count / maxCount) * 100}%` }}
                  />
                </span>
                <span className="rating-chart__count">{bar.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Ses critiques ---------- */}
      <section className="profile-section">
        <h2 className="profile-section__title">Critiques ({reviews.length})</h2>
        {reviews.length === 0 && <p className="reviews__empty">Aucune critique pour le moment.</p>}

        <ul className="reviews__list">
          {reviews.map((review) => (
            <li key={review.id} className="review review--with-game">
              {review.game && (
                <Link
                  route="games.show"
                  routeParams={{ id: review.game.id }}
                  className="review__game-cover"
                >
                  {review.game.imageUrl ? (
                    <img src={review.game.imageUrl} alt={review.game.title} />
                  ) : (
                    <Gamepad2 size={20} />
                  )}
                </Link>
              )}
              <div className="review__body">
                <div className="review__header">
                  {review.game && (
                    <Link
                      route="games.show"
                      routeParams={{ id: review.game.id }}
                      className="review__author il"
                    >
                      {review.game.title}
                    </Link>
                  )}
                  <span className="stars">{review.stars} ★</span>
                </div>
                {review.content && <p className="review__content">{review.content}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Jeux ajoutés ---------- */}
      {games.length > 0 && (
        <section className="profile-section">
          <h2 className="profile-section__title">Jeux ajoutés ({games.length})</h2>
          <ul className="game-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
        </section>
      )}
    </Page>
  )
}

ShowUser.layout = [AppLayout]
