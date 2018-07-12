import { appReducer } from '~/util/reducer-utils'
import { actionTypes } from 'redux-router5'

export default appReducer({
  key: 'routePreserver',
  initialState: {},
  actions: {
    [actionTypes.TRANSITION_ERROR] (state, action) {
      let { route, transitionError } = action.payload

      return transitionError.preserve && transitionError.preserve
        ? route
        : state
    }
  }
})
