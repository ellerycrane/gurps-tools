import { appReducer } from '~/util/reducer-utils'
import {
  API_REQUEST_START,
  API_REQUEST_END
} from '../services/RequestService'

export default appReducer({
  key: 'requests',
  initialState: {},
  actions: {
    [API_REQUEST_START] (state, { payload }) {
      return {...state, ...payload }
    },
    [API_REQUEST_END] (state, { payload }) {
      const newState = Object.assign({}, state)

      delete newState[payload.requestId]
      return { ...newState }
    }
  }
})
