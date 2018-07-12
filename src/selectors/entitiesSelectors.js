import {getValueIfPresent, isEmptyValue} from '~/util/object-utils'
import {ENTITIES_STORE_KEY as STORE_KEY} from '~/reducers/entitiesReducers'

export const
  // Can't use getValueIfPresent with id because it may have additional '.' in it
  getEntity = (state, id) => {
    const 
      entities = getValueIfPresent(state, `${STORE_KEY}`) || {},
      entity = entities[id]

    return isEmptyValue(entity) ? null : entity
  }
