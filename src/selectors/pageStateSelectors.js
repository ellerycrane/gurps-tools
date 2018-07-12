import {getValueIfPresent, isEmptyValue} from '~/util/object-utils'
import {denamespaceParams, NS_DELIMITER} from '~/util/page-state-utils'
import omitBy from 'lodash/omitBy'
import pickBy from 'lodash/pickBy'

export const
  ROUTE_KEY = 'router.route',
  TRANSITION_ROUTE_KEY = 'router.transitionRoute',
  PARAMS_KEY = 'params',
  getCurrentPage = state => (getValueIfPresent(state, TRANSITION_ROUTE_KEY) || getValueIfPresent(state, ROUTE_KEY) || {}).name,
  getUriParams = (state) => {
    const route = getValueIfPresent(state, TRANSITION_ROUTE_KEY) || getValueIfPresent(state, ROUTE_KEY) || {}

    return getValueIfPresent(route, PARAMS_KEY) || {}
  },
  getPageStateExcept = (state, namespace=null) => {
    const uriParams = getUriParams(state)

    if (isEmptyValue(namespace)) {
      return uriParams
    } else {
      return omitBy(uriParams, (v, k) => k.split(NS_DELIMITER)[0]===namespace)
    }
  },
  getPageState = (state, namespace=null) => {
    const uriParams = getUriParams(state)
    let ret

    if (isEmptyValue(namespace)) {
      ret = pickBy(uriParams, (v, k) => k.split(NS_DELIMITER).length===1)
    } else {
      ret = pickBy(uriParams, (v, k) => k.split(NS_DELIMITER)[0]===namespace)
    }

    return denamespaceParams(ret)
  },
  getPageStateFromRouteState = (state, namespace = null) => {
    return getPageState({ router: { route: state }}, namespace)
  }
