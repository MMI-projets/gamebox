import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.store': { paramsTuple?: []; params?: {} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.verify': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
    'reviews.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'games.store': { paramsTuple?: []; params?: {} }
    'reviews.store': { paramsTuple: [ParamValue]; params: {'game_id': ParamValue} }
  }
  PUT: {
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.verify': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reviews.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}