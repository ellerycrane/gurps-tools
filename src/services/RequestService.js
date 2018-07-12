import API from '~/constants/api'
import { ApiService } from './ApiService'
import isEqual from 'lodash/isEqual'
import { objectHash } from '~/util/object-utils'

export const
  REQUEST_TIMEOUT = 60000, // TODO what's a good value for this?
  API_REQUEST_START = 'API_REQUEST_START',
  API_REQUEST_END = 'API_REQUEST_END',
  API_REQUEST_DROPPED = 'API_REQUEST_DROPPED'

/*
As in ApiService, methods generated for this service have signature:
(params, body) => {...} OR (params, body, state) => {...}

This service provides functionality to:
- Abort duplicate requests
- Ignore stale responses
Based on the request method, url, and body.

To take additional information into account in determining request uniqueness,
pass a `getRelevantState` function in place of `state` above.
*/
export class RequestService extends ApiService {
  constructor (...args) {
    super(...args)
  }

  isActiveRequest(requestId) {
    const
      { requests } = this.storeService.store.getState(),
      now = (new Date()).getTime()

    return requests && now - requests[requestId] < REQUEST_TIMEOUT
  }

  request (method, url, body, getRelevantState = () => {}) {
    const
      { dispatch } = this.storeService.store,
      requestedState = getRelevantState(),
      requestId = objectHash({ method, url, body, requestedState }),
      requestTimeStamp = (new Date()).getTime()

    if(this.isActiveRequest(requestId)) {
      window.console.warn(`Request aborted: duplicate active request before timeout expired. URL: ${url}`)
      throw 'DuplicateRequestException'
    }

    dispatch({ type: API_REQUEST_START , payload: { [requestId]: requestTimeStamp }})

    return super.request(method, url, body)
      .then(json => {
        const stale = !this.isActiveRequest(requestId) || !isEqual(requestedState, getRelevantState())

        dispatch({ type: API_REQUEST_END, payload: { requestId }})
        if(stale) throw 'StaleRequestException'

        return json
      }).catch(e => {
        if (e.name === 'StaleRequestException') {
          window.console.warn(`Request response ignored: request complete but response is stale. URL: ${url}`)
        } else {
          dispatch({ type: API_REQUEST_END, payload: { requestId }})
          throw e
        }
      })
  }
}

export function requestService () {
  return new RequestService(API)
}
