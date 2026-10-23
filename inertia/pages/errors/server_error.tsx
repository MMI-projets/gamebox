import { Head } from '@inertiajs/react'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function ServerError() {
  return (
    <div className="page">
      <Head title="Erreur" />
      <div className="empty">
        <div className="empty__mark">500</div>
        <h1>Une erreur est survenue</h1>
        <p>Le serveur a rencontré un problème. Réessayez dans un instant.</p>
        <Link route="home" className="btn btn--primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}

ServerError.layout = [AppLayout]
