import React from 'react'
import T from 'prop-types'
import Pages from '~/components/pages'
import * as RN from '~/routes/route-names'

const
  DEFAULT_ERROR_COMPONENT = null,
  ROUTE_TO_COMPONENT = {
    [RN.LANDING_PAGE]: Pages.LandingPage,
    [RN.DEBUG_PAGE]: Pages.DebugPage,
  },
  IGNORED_ROUTER_ERROR_CODES = ['SAME_STATES'],
  getErrorComponent = transitionError =>
    transitionError
      ? errorTypes[transitionError.reason] || errorTypes[transitionError.code] || DEFAULT_ERROR_COMPONENT
      : DEFAULT_ERROR_COMPONENT,
  RootComponent = function (props) {
    let
      body,
      { route, routingError, transitionError, } = props

    if (routingError && !IGNORED_ROUTER_ERROR_CODES.includes(transitionError.code)) {
      let ErrorComponent = getErrorComponent(transitionError)

      body = <ErrorComponent {...props} />
    } else if (route && route.name && ROUTE_TO_COMPONENT[route.name]) {
      let Component = ROUTE_TO_COMPONENT[route.name]
      body = <Component />
    } else {
      body = <div>No body</div>
    }
    return body
  }

RootComponent.propTypes = {
  routingError: T.bool,
  appState: T.string,
  route: T.object,
  transitioning: T.bool,
  transitionError: T.object
}

export { RootComponent }
