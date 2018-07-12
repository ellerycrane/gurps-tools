import { appReducer } from '~/util/reducer-utils'
import {
  MERGE_METADATA
} from 'actions/pageActions'

export default appReducer({
  key: 'metadata',
  initialState: {},
  actions: {
    [MERGE_METADATA] (state, action) {
      return { ...state, [action.payload.page]: {...state[action.payload.page], ...action.payload }}
    }
  }
})
