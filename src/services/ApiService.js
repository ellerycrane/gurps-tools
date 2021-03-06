/* globals fetch */

import 'whatwg-fetch'
import fetchJsonp from 'fetch-jsonp'
import qs from 'qs'
import Path from 'path-parser'
import {Service} from './Service'
import API from '~/constants/api'
import {isNonEmptyValue} from '~/util/object-utils'

window.Path = Path
// Settings for stringifying querystrings. See:
// <https://github.com/ljharb/qs>
const
  QS_CONFIG = {skipNulls: true, arrayFormat: 'brackets'},
  API_SUCCESS = 'API_SUCCESS',
  API_ERROR = 'API_ERROR'

export function getEndpointConfigs(config) {
  let makePath = route => new Path(`/api/${route}`)

  if (typeof config === 'function') {
    return config
  } else if (typeof config === 'object') {
    const
      {
        url, method, route, defaultParams
      } = config,
      externalUrl = isNonEmptyValue(url),
      pathString = isNonEmptyValue(url) ? url : route

    return {
      method: method || 'GET',
      path: new Path(pathString),
      externalUrl: externalUrl,
      defaultParams: defaultParams || {}
    }

  } else {
    return {
      method: 'GET',
      path: makePath(config),
      externalUrl: false
    }
  }
}

// Splits a params object into those params that will be in the URL path, and those that will
// appear in the query string:
export function splitParams(path, params) {
  if (!params) return {pathParams: {}, queryParams: {}}

  let paramSet = new Set(path.params)

  return Object.keys(params).reduce(({pathParams, queryParams}, param) =>
    paramSet.has(param)
      ? {pathParams: {...pathParams, [param]: params[param]}, queryParams}
      : {pathParams, queryParams: {...queryParams, [param]: params[param]}}, {pathParams: {}, queryParams: {}})
}

// From a set of params, build a url with a query string.
//
// buldUrl(myPath, { userId: 1, someArray: [1,2,3] })
// => /api/v1/my_route/1?someArray[]=1&someArray[]=2&someArray[]=3
//
export function buildUrl(path, params, externalUrl=false) {
  const
    {pathParams, queryParams} = splitParams(path, params),
    uriString = (externalUrl ? 'https://' : '') + path.build(pathParams)

  if (Object.keys(queryParams).length) {
    return `${uriString}?${qs.stringify(queryParams, QS_CONFIG)}`
  } else {
    return uriString
  }
}

// For a requestFn and a config, return a function that will perform a request against the server
// This function is used by the ApiService at initialization to map the config object (in constants)
// to more-usable API functions:
function makeEndpoint(requestFn, config) {
  const
    endpointConfigs = getEndpointConfigs(config),
    {path, method, externalUrl, defaultParams} = endpointConfigs

  if (typeof endpointConfigs === 'function') { // escape hatch: just use a function
    return (params, body) => {
      return endpointConfigs(requestFn,params, body)
    }
  }

  return (params, body, state) => {
    try {
      return requestFn(method, buildUrl(path, Object.assign({},defaultParams,params), externalUrl), method !== 'GET' ? body : undefined, state)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

function checkFailure(res) {
  if (res.ok) {
    return res
  } else {
    let e = new Error(res.statusText)

    e.response = res
    throw e
  }
}

function getJson(res) {
  return res.json()
}

/*
Assembles endpoints from the passed in `api` as nested variables on the service.
(ApiService.namespace.endpoint, ex: ApiService.threats.fetchList)

These methods are generated by `makeEndpoint`, with the signature:
(params, body) => {...} OR (params, body, state) => {...}

These methods execute this class' (or a subclass') `request` method using
a combination of your passed in arguments and values taken from `api`
*/
export class ApiService extends Service {
  constructor(api) {
    super()
    this.request = this.request.bind(this)

    Object.keys(api).forEach(entityName => {
      let entity = api[entityName]

      this[entityName] = Object.keys(entity).reduce((methods, method) => {
        return {...methods, [method]: makeEndpoint(this.request, entity[method])}
      }, {})
    })
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  // Override this function when testing API calls:
  _fetchFn(method, url, body) {
    const {dispatch} = this.storeService.store

    try {
      if(method === 'JSONP'){
        return fetchJsonp(url, {
          headers: this.getHeaders(),
          body: body ? JSON.stringify(body) : undefined
        })
      } else {
        return fetch(url, {
          method,
          headers: this.getHeaders(),
          body: body ? JSON.stringify(body) : undefined
        })
      }
    } catch (e) {
      window.console.warn(e)
    }
  }

  request(method, url, body, state) {
    const {dispatch} = this.storeService.store

    return this._fetchFn(method, url, body, state)
      .then(response => checkFailure(response))
      .then(getJson)
      .then(json => {
        this.storeService.store.dispatch({type: API_SUCCESS})
        return json
      })
      .catch(err => {
        dispatch({type: API_ERROR, payload: err})
        throw err
      })
  }

  dependencies() {
    return ['storeService']
  }
}

export function apiService() {
  return new ApiService(API)
}
