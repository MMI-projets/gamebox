import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { usePage } from '@inertiajs/react'
import { Form, Link } from '@adonisjs/inertia/react'

/**
 * Fiche d'un jeu. Props envoyées par GamesController.show.
 *
 * ⚠️ Mise en page volontairement minimale : le design et le CSS
 * sont à faire. Toute la logique (droits, données) est déjà branchée.
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
      <p>{game.isVerified ? '✔ Jeu vérifié' : '⏳ En attente de vérification'}</p>
      <p>Éditeur : {game.publisher}</p>
      <p>Genre : {game.genre || 'Non spécifié'}</p>
      <p>Date de sortie : {game.releaseDate || 'Non spécifiée'}</p>
      <p>Description : {game.description || 'Aucune description disponible'}</p>
      {game.imageUrl && <img src={game.imageUrl} alt={game.title} />}

      <p>
        Note moyenne :{' '}
        {game.averageRating !== null
          ? `${game.averageRating} ★ (${game.reviewsCount} critique${game.reviewsCount > 1 ? 's' : ''})`
          : 'Pas encore de note'}
      </p>

      {/* ---------- Écrire ou modifier sa critique ---------- */}
      {!user && (
        <p>
          <Link route="session.create">Connectez-vous</Link> pour noter ce jeu.
        </p>
      )}

      {(can.review || userReview) && (
        <section>
          <h2>{userReview ? 'Ma critique' : 'Noter ce jeu'}</h2>

          {/* Même formulaire pour publier (store) ou modifier (update) */}
          <Form
            {...(userReview
              ? { route: 'reviews.update', routeParams: { id: userReview.id } }
              : { route: 'reviews.store', routeParams: { game_id: game.id } })}
            options={{ preserveScroll: true }}
          >
            {({ errors, processing }) => (
              <>
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
                    Critique (facultatif)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="field__input"
                    defaultValue={userReview?.content ?? ''}
                  />
                  {errors.content && <span className="field__error">{errors.content}</span>}
                </div>

                <button type="submit" className="btn btn--primary" disabled={processing}>
                  {userReview ? 'Modifier ma critique' : 'Publier'}
                </button>
              </>
            )}
          </Form>
        </section>
      )}

      {/* ---------- Liste des critiques ---------- */}
      <section>
        <h2>Critiques ({reviews.length})</h2>
        {reviews.length === 0 && <p>Aucune critique pour le moment.</p>}

        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.authorName}</strong> — {review.stars} ★
              {review.content && <p>{review.content}</p>}
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
