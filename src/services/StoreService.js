import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { router5Middleware, router5Reducer } from 'redux-router5'
import { Service } from './Service'
import reducers from '~/reducers/index'

const LOGGER_CONFIG = {}

function makeReducer (reducers) {
  return combineReducers({ router: router5Reducer, ...reducers })
}

export class StoreService extends Service {
  constructor (reducers, initialState) {
    super()
    this.reducers = reducers
    this.initialState = initialState
  }
  start () {
    let
      middlewares = [
        // Attaching to this.system is bad, but we need it for async actions that use system services
        reduxThunk.withExtraArgument(this.system),
        router5Middleware(this.routerService.router)
      ],
      reducer = makeReducer(this.reducers)

    if (process.env.NODE_ENV === 'development') {
      middlewares.push(createLogger(LOGGER_CONFIG))
    }

    if (this.initialState) {
      this.store = createStore(reducer, this.initialState, applyMiddleware(...middlewares))
    } else {
      this.store = createStore(reducer, applyMiddleware(...middlewares))
    }
  }
  dependencies () {
    return [ 'routerService' ]
  }
}

let makeStoreService

if (module.hot) {
  makeStoreService = function makeUiService (initialState) {
    let svc = new StoreService(reducers, initialState)

    module.hot.accept('../reducers/index', () => {
      let
        reducers = require('../reducers/index').default,
        reducer = makeReducer(reducers)

      svc.store.replaceReducer(reducer)
      svc.reducers = reducers
    })

    return svc
  }
} else {
  makeStoreService = function makeUiService (initialState) {
    return new StoreService(reducers, initialState)
  }
}

export function storeService (reducers, initialState) {
  return makeStoreService(initialState)
  // return new StoreService(reducers, initialState)
}
