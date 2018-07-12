// Asset imports to bootstrap the application:
import 'babel-polyfill' // needs to be imported first and ONLY ONCE
import './styles/app.scss'

if (module.hot) {
  // Calling 'module.hot.accept' without a path or file name will allow this module to reload
  // itself. The function argument it takes is an error handler for capturing any code reloading
  // errors that might have happened.
  module.hot.accept(e => {
    console.error(`Webpack hot reload error!`, e) // eslint-disable-line no-console, quotes
  })

  let oldState, createSystem, system

  // We've already bootstrapped a system: stop it and pull out its application state so we can
  // reuse it:
  if (window.system) {
    window.system.stop()
    oldState = window.system.storeService.store.getState()
  }

  // Create a new system with the old state applied to it:
  createSystem = require('./services').default
  system = createSystem(oldState)

  system.start()
  window.system = system
} else {
  // If hot module reloading isn't enabled, just start the system. This will be the codepath in
  // production and production-like environments. The previous if-block will be removed by the
  // minification process:
  let createSystem = require('./services').default

  createSystem().start()
}
