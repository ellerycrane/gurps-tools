
import {routeToState} from '~/util/page-state-utils'

export default {
  onActivate({toState}, dispatch) {
    console.log("debugRouteHandler onActivate called")
  },
  onChangeParams({toState, fromState}, dispatch) {
    console.log("debugRouteHandler onChangeParams called")
  }
}
