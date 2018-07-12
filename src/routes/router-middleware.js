import transitionPath, {nameToIDs} from 'router5-transition-path'
import { isEmptyValue } from '~/util/object-utils'

// Finds a route handler in the list of route handlers by its name. It will traverse child routes
// correctly. TODO: memoize?
function findRouteHandler (routes, name) {
  let path = name.split('.')
  console.log("Trying to find a route for name: ", name)

  return path.reduce((p, n) => {
    if (p && p.children) {
      return p.children.find(route => route.name === n) || null
    } else {
      return null
    }
  }, {children: routes})
}

// For a given route transition (consisting of a 'toState' and a 'fromState'), and a set of route
// handlers (each of which may have an 'onActivate' or 'onDeactivate' property), find the route
// handlers that must be called for the route transition to take place.
//
// They are currently returned in [...toState, ...fromState] order, but I don't think that should
// be relied upon necessarily, because order of asynchronous actions inside each route handler is
// not guaranteed. There is no coordination between route handlers, so if two handlers request the
// same resource, or require a specific ordering of actions, that ability will have to be added.
//
function getRouteHandlersFor (routes, toState, fromState) {
  let findHandler = findRouteHandler.bind(null, routes)

  if (toState && fromState && toState.name === fromState.name) {
    // the only thing that could have changed was the query parameters:
    return nameToIDs(toState.name)
      .map(findHandler)
      .filter(v => v && v.onChangeParams)
      .map(v => v.onChangeParams)
  } else {
    let
      {toActivate, toDeactivate} = transitionPath(toState, fromState),
      activationHandlers = toActivate
        .map(segment => findRouteHandler(routes, segment))
        .filter(v => v && v.onActivate)
        .map(v => v.onActivate),
      deactivationHandlers = toDeactivate
        .map(segment => findRouteHandler(routes, segment))
        .filter(v => v && v.onDeactivate)
        .map(v => v.onDeactivate)

    return activationHandlers.concat(deactivationHandlers)
  }
}

function promiseify (fn, ...args) {
  try {
    return Promise.resolve(fn(...args))
  } catch (err) {
    return Promise.reject(err)
  }
}

export const
  // This middleware allows for imperative functions to be executed any time the route changes.
  //
  // The code is based on the middleware code found here:
  // <https://router5.github.io/docs/async-data.html>
  appRouterMiddleware = (routes, system) => () => (toState, fromState) => {
    console.log("Applying router middleware", {toState, fromState})
    const
      { getState, dispatch } = system.storeService.store,
      handlers = getRouteHandlersFor(routes, toState, fromState)

    return Promise.all(
      handlers.map(handler => promiseify(handler, { toState, fromState }, dispatch, getState, system))
    ).then(results => {
      let redirect = results.filter(r => r).find(r => 'redirect' in r)

      return redirect || toState
    })
    // the promise should ultimately resolve to the next state the router should be in, unless any
    // of the activation handlers threw an error, in which case they may return a rejected promise
    // with a router5 route object. See <https://router5.github.io/docs/middleware.html>
  }
