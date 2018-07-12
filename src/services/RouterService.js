import {createRouter} from 'router5'
import browserPlugin from 'router5/plugins/browser'
import { Service } from './Service'
import { appRouterMiddleware } from '~/routes/router-middleware'
import { ROUTES, ROUTER_CONFIG } from '~/routes/definitions'

export class RouterService extends Service {
  start () {
    let router = createRouter(ROUTES, ROUTER_CONFIG)

    router.usePlugin(browserPlugin({
      base: process.env.APP_BASE_PATH
    }))

    router.useMiddleware(appRouterMiddleware(ROUTES, this.system))

    this.router = router
  }
}

export function routerService () {
  return new RouterService()
}

// The RouterController exists to make sure that the router is started and middleware is attached
// after the Redux store is initialized, but without creating a circular dependency between the
// RouterService and the StoreService.
export class RouterController extends Service {
  constructor (routes) {
    super()
    this.routes = routes
  }
  start () {
    this.routerService.router.start()
  }
  stop () {
    this.routerService.router.stop()
  }
  dependencies () { return ['routerService', 'storeService'] }
}

export function routerController () {
  return new RouterController(ROUTES)
}
