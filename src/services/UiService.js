import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Service } from './Service'
import RootComponentContainer from '~/components/RootComponentContainer'

/*
The UI Service controls the mounting and unmounting of the React-based UI. If the root DOM node
doesn't exist, it will append it on the first startup. It will then take the Redux store and
plug it into the component tree using react-redux's <Provider> component.

There is special harness code at the bottom to handle Webpack's hot reloader in a smarter way than
it might otherwise: it will only remount the UI, rather than re-starting the whole application stack
*/
export class UiService extends Service {
  constructor (RootComponent) {
    super()
    this.RootComponent = RootComponent
  }
  start () {
    let 
      RootComponent = this.RootComponent,
      node = document.querySelector('#application')

    if (!node) {
      node = document.createElement('div')
      node.id = 'application'
      document.body.appendChild(node)
    }

    ReactDOM.render(
      <Provider store={this.storeService.store}>
        <RootComponent />
      </Provider>,
      node)
  }
  stop () {
    ReactDOM.unmountComponentAtNode(document.querySelector('#application'))
  }
  dependencies () {
    return ['storeService']
  }
}

let makeUiService

if (module.hot) {
  // If hot reloading is enabled, set up a different harness that will build regenerate the UI
  // when the RootComponentContainer (or any component it depends on) changes:
  //
  makeUiService = function makeUiService () {
    let svc = new UiService(RootComponentContainer)

    module.hot.accept('../components/RootComponentContainer', () => {
      svc.RootComponent = require('../components/RootComponentContainer').default
      svc.stop()
      svc.start()
    })

    return svc
  }
} else {
  // If hot reloading is not enabled, just build the service "statically":
  makeUiService = function makeUiService () {
    return new UiService(RootComponentContainer)
  }
}

export function uiService () {
  return makeUiService()
}
