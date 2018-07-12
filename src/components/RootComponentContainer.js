import { connect } from 'react-redux'
import getIn from 'lodash/get'
import { routeNodeSelector } from 'redux-router5'
import { RootComponent } from '~/components/RootComponent'
import { isEmptyValue } from '~/util/object-utils'

export function appState (state) {
  return getIn(state, 'appState.state')
}

function mapStateToProps (state) {
  const routeSelector = routeNodeSelector('')

  return {
    routingError: !isEmptyValue(state.router.transitionError),
    transitionError: state.router.transitionError,
    transitionRoute: state.router.transitionRoute,
    ...routeSelector(state)
  }
}

const dispatchProps = {}

export default connect(mapStateToProps, dispatchProps)(RootComponent)
