import { actions } from 'redux-router5'
import unset from 'lodash/unset'
import { isEmptyValue } from '~/util/object-utils'
import {
  namespaceParams, namespaceParamKeys, joinParams,
  subtractParams, markVolatile, removeVolatileParams
} from '~/util/page-state-utils'
import { getPageStateExcept, getUriParams } from '~/selectors/pageStateSelectors'

export const
  MERGE_METADATA = 'MERGE_ENTITY_METADATA'

export function mergeMetadata (payload, ignoredKeys = []) {
  const newPayload = Object.keys(payload).reduce((ret, k) => {
    if(!ignoredKeys.includes(k)) ret[k] = payload[k]

    return ret
  }, {})

  return { type: MERGE_METADATA, payload: newPayload }
}

export function navigateWithPageState (route, paramsByNamespace = {}) {
  return (dispatch) => {
    const newParams = Object.keys(paramsByNamespace).reduce(
      (memo, n) => (isEmptyValue(n)
        ? {...memo, ...paramsByNamespace[n]}
        : {...memo, ...namespaceParams(paramsByNamespace[n], n)}
      ),
      {}
    )

    dispatch(actions.navigateTo(route, newParams))
  }
}

export function setPageState (newParams = {}, options={}) {
  return (dispatch, getState) => {
    let { name } = getState().router.route

    newParams = options.preserveVolatile ? newParams : removeVolatileParams(newParams)

    dispatch(actions.navigateTo(name, newParams))
  }
}

export function replacePageState (params, namespace=null, options={}) {
  return (dispatch, getState) => {
    let newParams

    if (isEmptyValue(namespace)) {
      dispatch(setPageState(params))
    } else {
      const carryoverParams = getPageStateExcept(getState(), namespace)

      newParams = {...carryoverParams, ...namespaceParams(params, namespace)}
    }

    dispatch(setPageState(newParams, options))
  }
}

// TODO - Remove if it turns out we're not using this
export function addToPageState(params, namespace=null, options={}) {
  return (dispatch, getState) => {
    const
      carryoverParams = getUriParams(getState()),
      newParams = namespaceParams(params, namespace)

    dispatch(setPageState(joinParams(carryoverParams, newParams), options))
  }
}

export function addVolatileToPageState(params, namespace=null) {
  return (dispatch) => {
    dispatch(addToPageState(markVolatile(params), namespace, {preserveVolatile: true}))
  }
}

// TODO - Remove if it turns out we're not using this
export function removeFromPageState(params, namespace=null, options={}) {
  return (dispatch, getState) => {
    const currentParams = getUriParams(getState())
    let
      newParams = {...currentParams},
      removeParamKeys

    if (Array.isArray(params)) {
      removeParamKeys = namespaceParamKeys(params, namespace)
      removeParamKeys.forEach(k => unset(newParams, k))
    } else {
      params = namespaceParams(params, namespace)
      newParams = subtractParams(newParams, params)
    }

    dispatch(setPageState(newParams, options))
  }
}
