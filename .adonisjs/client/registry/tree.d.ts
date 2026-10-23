/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  games: {
    index: typeof routes['games.index']
    show: typeof routes['games.show']
    create: typeof routes['games.create']
    store: typeof routes['games.store']
    edit: typeof routes['games.edit']
    update: typeof routes['games.update']
    destroy: typeof routes['games.destroy']
    verify: typeof routes['games.verify']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  reviews: {
    store: typeof routes['reviews.store']
    update: typeof routes['reviews.update']
    destroy: typeof routes['reviews.destroy']
  }
}
