import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

/**
 * Donne le rôle admin à un utilisateur existant :
 * node ace users:promote moi@exemple.fr
 */
export default class PromoteUser extends BaseCommand {
  static commandName = 'users:promote'
  static description = 'Donne le rôle admin à un utilisateur (par son email)'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: "Email de l'utilisateur" })
  declare email: string

  async run() {
    const { default: User } = await import('#models/user')
    const user = await User.findBy('email', this.email)

    if (!user) {
      this.logger.error(`Aucun utilisateur avec l'email ${this.email}`)
      this.exitCode = 1
      return
    }

    user.role = 'admin'
    await user.save()
    this.logger.success(`${user.email} est maintenant administrateur`)
  }
}
