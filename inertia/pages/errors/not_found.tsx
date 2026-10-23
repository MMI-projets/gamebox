import { Head } from '@inertiajs/react'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function NotFound() {
  return (
    <div className="page">
      <Head title="Page introuvable" />
      <div className="empty">
        <div className="empty__mark">404</div>
        <h1>Page introuvable</h1>
        <p>Ce jeu ou cette page n&apos;existe pas (ou plus).</p>
        <Link route="games.index" className="btn btn--primary">
          Retour au catalogue
        </Link>
      </div>
    </div>
  )
}

NotFound.layout = [AppLayout]
