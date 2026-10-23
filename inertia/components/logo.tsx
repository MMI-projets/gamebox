import { Gamepad2 } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'

/**
 * Logo GameBox : renvoie vers la page d'accueil
 */
export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <Link route="home" aria-label="GameBox, accueil" className="logo">
      <span className="logo__mark" style={{ width: size, height: size }}>
        <Gamepad2 size={Math.round(size * 0.62)} />
      </span>
      <span className="logo__text">GameBox</span>
    </Link>
  )
}
