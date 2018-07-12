import { withQueryParams } from '~/util/route-utils'
import { namespaceParamKeys, markKeyVolatile } from '~/util/page-state-utils'
import * as RN from './route-names'
import * as handlers from './handlers/index'
import * as namespaces from '~/constants/paramNamespaces'

const
  /*
    Per path-parser, param keys may only contain a-z, A-Z, 0-9, -, _ and terminal []
    Additionally make sure your keys do not start with page-state-utils.VOLATILE_MARK
  */
  SEARCH_PARAMS = namespaceParamKeys([
    'q', 'status[]'
  ], namespaces.SEARCH_NAMESPACE),
  PAGINATION_PARAMS = namespaceParamKeys([markKeyVolatile('page')], namespaces.PAGINATION_NAMESPACE),
  SORT_PARAMS = namespaceParamKeys(['field', 'order'], namespaces.SORT_NAMESPACE),
  //
  // ---------------------------------------------------------------------------------------------
  // ROUTING DEFINITION:
  //
  // The routing definition. For comprehensive documentation, see the Router5 user guide:
  // <https://router5.github.io/docs/configuring-routes.html>
  ROUTES = [
    {
      name: RN.LANDING_PAGE,
      path: withQueryParams('/', 'key', 'name'),
      ...handlers.app
    },
    {
      name: RN.DEBUG_PAGE,
      path: withQueryParams('/debug', 'test'),
      ...handlers.debug
    }
  ],

  //
  // ---------------------------------------------------------------------------------------------
  // Default Router5 config:
  //
  DEFAULT_ROUTE = RN.LANDING_PAGE,
  DEFAULT_PARAMS = {},
  ROUTER_CONFIG = {
    defaultRoute: DEFAULT_ROUTE,
    defaultParams: DEFAULT_PARAMS,
    trailingSlash: false,
    strictQueryParams: false,
    allowNotFound: true
  }

export { ROUTES, ROUTER_CONFIG, DEFAULT_ROUTE }
