import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'

/**
 * Formulaire de modification d'un jeu.
 * <Form route="games.update"> envoie les champs en PUT /games/:id
 * (méthode GamesController.update). En cas d'erreur de validation,
 * `errors` contient le message de chaque champ invalide.
 */
export default function EditGame({ game }: InertiaProps<{ game: Data.Game }>) {
  return (
    <Page title="Modifier un jeu" description={game.title}>
      {/* routeParams indique QUEL jeu modifier : PUT /games/:id */}
      <Form route="games.update" routeParams={{ id: game.id }} className="game-form">
        {({ errors, processing }) => (
          <>
            <div className="field">
              <label className="field__label" htmlFor="title">
                Titre
              </label>
              <input
                id="title"
                name="title"
                defaultValue={game.title}
                className="field__input"
                placeholder="The Last of Us"
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title && <span className="field__error">{errors.title}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="publisher">
                Éditeur
              </label>
              <input
                id="publisher"
                name="publisher"
                defaultValue={game.publisher}
                className="field__input"
                placeholder="Naughty Dog"
                aria-invalid={errors.publisher ? 'true' : 'false'}
              />
              {errors.publisher && <span className="field__error">{errors.publisher}</span>}
            </div>

            <div className="game-form__row">
              <div className="field">
                <label className="field__label" htmlFor="genre">
                  Genre <span className="field__optional">(facultatif)</span>
                </label>
                <input
                  id="genre"
                  name="genre"
                  defaultValue={game.genre ?? ''}
                  className="field__input"
                  placeholder="Action, aventure"
                  aria-invalid={errors.genre ? 'true' : 'false'}
                />
                {errors.genre && <span className="field__error">{errors.genre}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="releaseDate">
                  Date de sortie <span className="field__optional">(facultatif)</span>
                </label>
                <input
                  id="releaseDate"
                  name="releaseDate"
                  defaultValue={game.releaseDate ?? ''}
                  type="date"
                  className="field__input"
                  aria-invalid={errors.releaseDate ? 'true' : 'false'}
                />
                {errors.releaseDate && <span className="field__error">{errors.releaseDate}</span>}
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="imageUrl">
                URL de la jaquette <span className="field__optional">(facultatif)</span>
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                defaultValue={game.imageUrl ?? ''}
                type="url"
                className="field__input"
                placeholder="https://..."
                aria-invalid={errors.imageUrl ? 'true' : 'false'}
              />
              {errors.imageUrl && <span className="field__error">{errors.imageUrl}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="description">
                Description <span className="field__optional">(facultatif)</span>
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={game.description ?? ''}
                rows={5}
                className="field__input field__input--textarea"
                aria-invalid={errors.description ? 'true' : 'false'}
              />
              {errors.description && <span className="field__error">{errors.description}</span>}
            </div>

            <div className="game-form__actions">
              <Link route="games.show" routeParams={{ id: game.id }} className="btn btn--ghost">
                Annuler
              </Link>
              <button type="submit" className="btn btn--primary" disabled={processing}>
                {processing ? 'Modification…' : 'Modifier le jeu'}
              </button>
            </div>
          </>
        )}
      </Form>
    </Page>
  )
}

EditGame.layout = [AppLayout]
