import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="auth">
        <div className="auth__form-col">
          <Logo size={28} />
          <div className="auth__form-wrap">{children}</div>
          <div style={{ height: 20 }} />
        </div>

        <aside className="auth__aside">
          <div className="auth__aside-top">
            <ThemeToggle />
          </div>

          <p className="auth__quote">Notez, critiquez et partagez vos jeux préférés.</p>

          <div>
            <div className="pitch__t">GameBox</div>
            <p className="pitch__p">
              Le carnet de jeux vidéo de la communauté : une note de 0,5 à 4 étoiles et une critique
              par jeu.
            </p>
          </div>
        </aside>
      </div>
      <FlashToasts />
    </>
  )
}
