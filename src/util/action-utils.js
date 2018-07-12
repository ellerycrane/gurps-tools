import { keyed } from './reducer-utils'
import entityTypes, { typeFromId } from '~/constants/entityTypes'
import { mergeEntities } from '~/actions/entitiesActions'
import { mergeMetadata } from '~/actions/pageActions'
import { isEmptyValue } from '~/util/object-utils'

const DEFAULT_FETCHER = 'fetchList'

/*
  Converts the api response object using custom handlers per key.
  See constants/entityTypes for the handlers
*/
export function convertResponseEntities(response, keys) {
  if(isEmptyValue(response)) {
    window.console.warn('Can\'t convert reponse entities without response')
    return
  }

  return (keys || Object.keys(response)).reduce((ret, k) => {
    const
      eType = Object.values(entityTypes).find(eT => eT.apiKey === k),
      eRes = response[k]

    if(!eType) {
      window.console.warn(`Response Converter: api response key '${k}' does not match a known entity type, ignoring`)
      return ret
    }

    let { keyParser = () => {}, entityProcessor = (o) => o } = eType

    return {
      ...ret,
      ...Array.isArray(eRes) ? keyed(entityProcessor(eRes), keyParser) : entityProcessor(eRes)
    }
  }, {})
}

/*
  Helper to generate the boilerplate for ajax actions, sample usage:

      fetchThreatList = () => makeEntityFetcher({
        start:       LOADING_THREATS_LIST,
        end:         LOADED_THREATS_LIST,
        page:        'threats',
        returnTypes: ['threat'],
        params:      getThreatQueryParams
      })

*/
export function makeEntityFetcher({ start, end, page, serviceKey, fetcher, params, returnTypes, getRelevantState = () => {}, ignoredMetadataKeys}) {
  return (dispatch, getState, { requestService }) => {
    if (start) dispatch({ type: start })

    const
      _params = typeof params === 'function' ? params(getState()) : params

    return (requestService[serviceKey || page][fetcher || DEFAULT_FETCHER](_params, null, getRelevantState.bind(null, getState))
      .then(res => {
        if(isEmptyValue(res)) {
          window.console.warn('makeEntityFetcher: response is empty')
          return
        }

        const
          entities = convertResponseEntities(res) || {},
          entityIds = Object.keys(entities)

        dispatch(mergeEntities(entities))
        dispatch(mergeMetadata({ page, ...res.meta }, ignoredMetadataKeys))

        if (end) {
          dispatch({
            type: end,
            payload: {
              ids: returnTypes ? entityIds.filter(o => returnTypes.includes(typeFromId(o))) : entityIds,
              params: _params
            }
          })
        }

        return { res, entities, entityIds, params }
      })
    )
  }
}

export function concatPage({ collection, additions, page, page_size }) {
  const startIndex = isEmptyValue(page)
    ? 0
    : (page-1) * page_size

  if (additions.length===0) {
    return collection
  } else if (startIndex===collection.length) {
    return [
      ...collection,
      ...additions
    ]
  } else if (collection.length >= startIndex+additions.length) {
    return [
      ...collection.slice(0, startIndex),
      ...additions,
      ...collection.slice(startIndex+additions.length)
    ]
  } else if (collection.length > startIndex) {
    return [
      ...collection.slice(0, startIndex),
      ...additions
    ]
  } else  {
    return [
      ...collection,
      ...new Array(startIndex - collection.length),
      ...additions
    ]
  }
}