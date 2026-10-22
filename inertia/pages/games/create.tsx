import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

/**
 * Formulaire d'ajout d'un jeu.
 * <Form route="games.store"> envoie les champs en POST /games
 * (méthode GamesController.store). En cas d'erreur de validation,
 * `errors` contient le message de chaque champ invalide.
 */
export default function CreateGame() {
  return (
    <Page title="Ajouter un jeu" description="Ajoutez un jeu au catalogue de GameBox.">
      <Form route="games.store" className="game-form">
        {({ errors, processing }) => (
          <>
            <div className="field">
              <label className="field__label" htmlFor="title">
                Titre
              </label>
              <input
                id="title"
                name="title"
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
                rows={5}
                className="field__input field__input--textarea"
                aria-invalid={errors.description ? 'true' : 'false'}
              />
              {errors.description && <span className="field__error">{errors.description}</span>}
            </div>

            <div className="game-form__actions">
              <Link route="games.index" className="btn btn--ghost">
                Annuler
              </Link>
              <button type="submit" className="btn btn--primary" disabled={processing}>
                {processing ? 'Ajout…' : 'Ajouter le jeu'}
              </button>
            </div>
          </>
        )}
      </Form>
    </Page>
  )
}

CreateGame.layout = [AppLayout]
