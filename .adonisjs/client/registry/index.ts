/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'games.index': {
    methods: ["GET","HEAD"],
    pattern: '/games',
    tokens: [[0,"games"]],
    types: placeholder as Registry['games.index']['types'],
  },
  'games.show': {
    methods: ["GET","HEAD"],
    pattern: '/games/:id',
    tokens: [[0,"games"],[1,"id"]],
    types: placeholder as Registry['games.show']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [[0,"dashboard"]],
    types: placeholder as Registry['dashboard']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'games.create': {
    methods: ["GET","HEAD"],
    pattern: '/games/create',
    tokens: [[0,"games"],[0,"create"]],
    types: placeholder as Registry['games.create']['types'],
  },
  'games.store': {
    methods: ["POST"],
    pattern: '/games',
    tokens: [[0,"games"]],
    types: placeholder as Registry['games.store']['types'],
  },
  'games.edit': {
    methods: ["GET","HEAD"],
    pattern: '/games/:id/edit',
    tokens: [[0,"games"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['games.edit']['types'],
  },
  'games.update': {
    methods: ["PUT","PATCH"],
    pattern: '/games/:id',
    tokens: [[0,"games"],[1,"id"]],
    types: placeholder as Registry['games.update']['types'],
  },
  'games.destroy': {
    methods: ["DELETE"],
    pattern: '/games/:id',
    tokens: [[0,"games"],[1,"id"]],
    types: placeholder as Registry['games.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
