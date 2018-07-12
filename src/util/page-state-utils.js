import { isNonEmptyValue } from './object-utils'
import isEqual from 'lodash/isEqual'
import union from 'lodash/union'
import difference from 'lodash/difference'
import unset from 'lodash/unset'

export const
  // TODO change these back to '.' and '!' before release if routing library allows
  NS_DELIMITER = '__',
  VOLATILE_MARK = '_',
  routeToState = (route) => { return {router: {route: route}} },
  paramsToState = (params) => { return {router: {route: params}} },
  namespaceParams = (params, namespace=null) => {
    if (isNonEmptyValue(namespace)) {
      params = Object.keys(params).reduce(
        (memo, k) => {
          memo[`${namespace}${NS_DELIMITER}${k}`] = params[k]
          return memo
        },
        {}
      )
    }

    return params
  },
  markKeyVolatile = key => `${VOLATILE_MARK}${key}`,
  markVolatile = (params) => {
    return Object.keys(params).reduce(
      (memo, k) => {
        memo[markKeyVolatile(k)] = params[k]
        return memo
      },
      {}
    )
  },
  denamespaceParams = (params) => {
    params = Object.keys(params).reduce(
      (memo, k) => {
        const
          keyParts = k.split(NS_DELIMITER),
          key = keyParts.length > 1 ? keyParts.slice(1).join(NS_DELIMITER) : keyParts[0],
          originalKey = key[0]===VOLATILE_MARK ? key.slice(1) : key

        memo[originalKey] = params[k]
        return memo
      },
      {}
    )

    return params
  },
  removeVolatileParams = (params) => {
    return Object.keys(params).reduce(
      (memo, k) => {
        const keyParts = k.split(NS_DELIMITER)

        if (keyParts[1] && keyParts[1][0]===VOLATILE_MARK) return memo

        memo[k] = params[k]
        return memo
      },
      {}
    )
  },
  namespaceParamKeys = (keys, namespace=null) => {
    if (isNonEmptyValue(namespace)) {
      keys = keys.map(k => `${namespace}${NS_DELIMITER}${k}`)
    }
    return keys
  },
  joinParams = (currentParams, newParams) => {
    return Object.keys(newParams).reduce(
      (memo, k) => {
        if (Array.isArray(newParams[k]) && Array.isArray(currentParams[k])) {
          memo[k] = union(currentParams[k], newParams[k])
        } else {
          memo[k] = newParams[k]
        }
        return memo
      },
      {...currentParams}
    )
  },
  subtractParams = (currentParams, removeParams) => {
    return Object.keys(removeParams).reduce(
      (memo, k) => {
        if (Array.isArray(removeParams[k]) && Array.isArray(currentParams[k])) {
          memo[k] = difference(currentParams[k], removeParams[k])
        } else if (isEqual(removeParams[k], currentParams[k])) {
          unset(memo, k)
        }
        return memo
      },
      {...currentParams}
    )
  }
