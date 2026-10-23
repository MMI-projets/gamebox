import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import { Gamepad2, House } from 'lucide-react'
import UserMenu from '~/components/user_menu'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'
import NavLink, { type NavItem } from '~/components/nav_link'

/**
 * Navigation principale de l'application
 */
const nav: NavItem[] = [
  { label: 'Accueil', route: 'home', icon: House, exact: true },
  { label: 'Catalogue', route: 'games.index', icon: Gamepad2 },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header header--bar">
        <div className="header__inner">
          <Logo size={28} />
          <div className="header__right">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <nav className="subnav">
        <div className="subnav__inner">
          {nav.map(({ label, route, icon: Icon, exact }) => (
            <NavLink key={label} route={route} exact={exact} className="subnav__item">
              {Icon && <Icon size={14} />}
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="app-main">{children}</div>
      <FlashToasts />
    </>
  )
}
