// import isEqual from 'lodash/isEqual'
import {routeToState} from '~/util/page-state-utils'
import {getValueIfPresent, isNonEmptyValue} from '~/util/object-utils'

export default {
  onActivate({toState}, dispatch) {
    const
      key = getValueIfPresent(toState, 'params.key')


  },
  onChangeParams({toState, fromState}, dispatch) {
    const
      newKey = getValueIfPresent(toState, 'params.key'),
      oldKey = getValueIfPresent(fromState, 'params.key')
    
  }
}
