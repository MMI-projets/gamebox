import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'

export default function ShowGame({ game }: InertiaProps<{ game: Data.Game }>) {
  return (
    <Page title={game.title}>
      <p>Éditeur : {game.publisher}</p>
      <p>Genre : {game.genre || 'Non spécifié'}</p>
      <p>Date de sortie : {game.releaseDate || 'Non spécifiée'}</p>
      <p>Description : {game.description || 'Aucune description disponible'}</p>
      {game.imageUrl && <img src={game.imageUrl} alt={game.title} />}
    </Page>
  )
}

ShowGame.layout = [AppLayout]
