import { appReducer } from '~/util/reducer-utils'
import { MERGE_ENTITIES } from '~/actions/entitiesActions'

export const ENTITIES_STORE_KEY = 'entities'

export default appReducer({
  key: ENTITIES_STORE_KEY,
  initialState: {},
  actions: {
    [MERGE_ENTITIES] (state, { payload }) {
      return {...state, ...payload.entities}
    }
  }
})
