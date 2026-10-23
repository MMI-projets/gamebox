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
      {/* Le nom mène au profil de l'utilisateur connecté */}
      <Link
        route="users.show"
        routeParams={{ id: user.id }}
        className="user-menu__name"
        title="Mon profil"
      >
        {user.fullName ?? user.email}
        {user.isAdmin && <span className="user-menu__badge">admin</span>}
      </Link>
      <Form route="session.destroy">
        <button type="submit" className="btn btn--secondary btn--sm">
          <LogOut size={15} /> Déconnexion
        </button>
      </Form>
    </>
  )
}
