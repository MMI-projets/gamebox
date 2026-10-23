import { LogOut } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Form, Link } from '@adonisjs/inertia/react'

/**
 * Boutons de droite du header :
 * - connecté : nom de l'utilisateur + déconnexion
 * - visiteur : connexion + inscription
 */
export default function UserMenu() {
  const { user } = usePage().props

  if (!user) {
    return (
      <>
        <Link route="session.create" className="btn btn--ghost btn--sm">
          Connexion
        </Link>
        <Link route="new_account.create" className="btn btn--primary btn--sm">
          Créer un compte
        </Link>
      </>
    )
  }

  return (
    <>
      <span className="user-menu__name">
        {user.fullName ?? user.email}
        {user.isAdmin && <span className="user-menu__badge">admin</span>}
      </span>
      <Form route="session.destroy">
        <button type="submit" className="btn btn--secondary btn--sm">
          <LogOut size={15} /> Déconnexion
        </button>
      </Form>
    </>
  )
}
