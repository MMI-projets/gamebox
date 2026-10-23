import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { usePage } from '@inertiajs/react'
import { Form, Link } from '@adonisjs/inertia/react'

/**
 * Fiche d'un jeu. Props envoyées par GamesController.show.
 *
 * Les styles de cette page sont dans inertia/css/retro/pages.css
 */
type Props = InertiaProps<{
  game: Data.Game
  reviews: Data.Review[]
  userReview: Data.Review | null
  can: { manage: boolean; verify: boolean; review: boolean }
}>

/**
 * Notes possibles : valeur envoyée au serveur (demi-étoiles) -> libellé
 */
const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8].map((value) => ({
  value,
  label: `${(value / 2).toString().replace('.', ',')} ★`,
}))

export default function ShowGame({ game, reviews, userReview, can }: Props) {
  const { user } = usePage().props

  return (
    <Page
      title={game.title}
      actions={
        <>
          {/* Admin : vérifier / retirer la vérification */}
          {can.verify && (
            <Form route="games.verify" routeParams={{ id: game.id }}>
              <button type="submit" className="btn btn--secondary">
                {game.isVerified ? 'Retirer la vérification' : 'Vérifier le jeu'}
              </button>
            </Form>
          )}

          {/* Auteur du jeu ou admin : modifier / supprimer */}
          {can.manage && (
            <>
              <Link route="games.edit" routeParams={{ id: game.id }} className="btn btn--secondary">
                Modifier
              </Link>
              <Form
                route="games.destroy"
                routeParams={{ id: game.id }}
                onBefore={() => confirm(`Supprimer « ${game.title} » et toutes ses critiques ?`)}
              >
                <button type="submit" className="btn btn--secondary">
                  Supprimer
                </button>
              </Form>
            </>
          )}
        </>
      }
    >
      {/* ---------- Infos du jeu ---------- */}
      <div className="game-detail">
        <div className="game-detail__cover">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.title} />
          ) : (
            <span className="game-detail__no-cover">Pas de jaquette</span>
          )}
        </div>

        <div className="game-detail__info">
          <span className={`badge ${game.isVerified ? 'badge--verified' : 'badge--pending'}`}>
            {game.isVerified ? '✔ Jeu vérifié' : '⏳ En attente de vérification'}
          </span>

          <p className="game-detail__rating">
            {game.averageRating !== null ? (
              <>
                <span className="stars">{game.averageRating} ★</span>
                <span className="game-detail__count">
                  {game.reviewsCount} critique{game.reviewsCount > 1 ? 's' : ''}
                </span>
              </>
            ) : (
              <span className="game-detail__count">Pas encore de note</span>
            )}
          </p>

          <dl className="game-detail__meta">
            <dt>Éditeur</dt>
            <dd>{game.publisher}</dd>
            <dt>Genre</dt>
            <dd>{game.genre || 'Non spécifié'}</dd>
            <dt>Sortie</dt>
            <dd>{game.releaseDate || 'Non spécifiée'}</dd>
          </dl>

          <p className="game-detail__description">
            {game.description || 'Aucune description disponible.'}
          </p>
        </div>
      </div>

      {/* ---------- Écrire ou modifier sa critique ---------- */}
      {!user && (
        <p className="review-login">
          <Link route="session.create" className="il">
            Connectez-vous
          </Link>{' '}
          pour noter ce jeu.
        </p>
      )}

      {(can.review || userReview) && (
        <section className="review-form">
          <h2 className="review-form__title">{userReview ? 'Ma critique' : 'Noter ce jeu'}</h2>

          {/* Même formulaire pour publier (store) ou modifier (update) */}
          <Form
            {...(userReview
              ? { route: 'reviews.update', routeParams: { id: userReview.id } }
              : { route: 'reviews.store', routeParams: { game_id: game.id } })}
            options={{ preserveScroll: true }}
          >
            {({ errors, processing }) => (
              <div className="review-form__fields">
                <div className="field">
                  <label className="field__label" htmlFor="rating">
                    Note
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    className="field__input"
                    defaultValue={userReview?.rating ?? 8}
                  >
                    {RATINGS.map((rating) => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label}
                      </option>
                    ))}
                  </select>
                  {errors.rating && <span className="field__error">{errors.rating}</span>}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="content">
                    Critique <span className="field__optional">(facultatif)</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="field__input field__input--textarea"
                    defaultValue={userReview?.content ?? ''}
                  />
                  {errors.content && <span className="field__error">{errors.content}</span>}
                </div>

                <div>
                  <button type="submit" className="btn btn--primary" disabled={processing}>
                    {userReview ? 'Modifier ma critique' : 'Publier'}
                  </button>
                </div>
              </div>
            )}
          </Form>
        </section>
      )}

      {/* ---------- Liste des critiques ---------- */}
      <section className="reviews">
        <h2 className="reviews__title">Critiques ({reviews.length})</h2>
        {reviews.length === 0 && <p className="reviews__empty">Aucune critique pour le moment.</p>}

        <ul className="reviews__list">
          {reviews.map((review) => (
            <li key={review.id} className="review">
              <div className="review__header">
                <strong className="review__author">{review.authorName}</strong>
                <span className="stars">{review.stars} ★</span>
              </div>
              {review.content && <p className="review__content">{review.content}</p>}

              {/* Auteur de la critique ou admin : supprimer */}
              {user && (user.id === review.userId || user.isAdmin) && (
                <Form
                  route="reviews.destroy"
                  routeParams={{ id: review.id }}
                  options={{ preserveScroll: true }}
                  onBefore={() => confirm('Supprimer cette critique ?')}
                >
                  <button type="submit" className="btn btn--ghost btn--sm">
                    Supprimer
                  </button>
                </Form>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}

ShowGame.layout = [AppLayout]
