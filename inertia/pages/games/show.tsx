import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Pencil } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'

export default function ShowGame({ game }: InertiaProps<{ game: Data.Game }>) {
  // Utilisateur connecté (undefined pour un visiteur)
  const { user } = usePage().props

  return (
    <Page
      title={game.title}
      actions={
        // Bouton visible seulement pour un utilisateur connecté
        user && (
          <Link route="games.edit" routeParams={{ id: game.id }} className="btn btn--secondary">
            <Pencil size={15} /> Modifier
          </Link>
        )
      }
    >
      <p>Éditeur : {game.publisher}</p>
      <p>Genre : {game.genre || 'Non spécifié'}</p>
      <p>Date de sortie : {game.releaseDate || 'Non spécifiée'}</p>
      <p>Description : {game.description || 'Aucune description disponible'}</p>
      {game.imageUrl && <img src={game.imageUrl} alt={game.title} />}
    </Page>
  )
}

ShowGame.layout = [AppLayout]
