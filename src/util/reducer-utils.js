
// Checks to see if you are failing to pass in any arguments.
function ensure (o) {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(o).forEach(k => {
      if (o[k] === undefined) {
        throw new Error(`Argument ${k} is required`)
      }
    })
  }
}

/*
Creates a reducer that reifies the key that it 'owns' in the application state.

Example:

export default appReducer({
  key: 'robots', // controls the 'robots' key in the application sate
  initialState: {}, // initial state is an empty object
  actions: { // handle actions by action type:
    CONSTRUCT_ROBOT() { ... },
    DESTROY_ROBOT() { ... },
    ...
  }
})

You may also pass a function to capture all action names:

export default appReducer({
  key: 'bigbrother',
  initialState: [],
  actions (state, action) {
    if (action.meta.isUnGoodSpeak) {
      return state.concat(action) // record the sedititous activity
    }
    // unlike a standard redux reducer, you don't need to return a value,
    // that is handled for you
  }
})
*/
export function appReducer (config) {
  let { key, initialState, actions } = config

  ensure({ key, initialState, actions }) // all propereties are required

  if (typeof actions === 'function') {
    return {
      [key] (state, action) {
        if (state === undefined) {
          return actions(initialState, action)
        } else {
          let result = actions(state, action)

          return result === undefined ? state : result
        }
      }
    }
  } else {
    return { [key]: makeReducer(initialState, actions) }
  }
}

/*
 Create a reducer that operates on only the named createAction types. All other
 createAction types are ignored. Actions consumed by makeReducer must be in a
 flux-standard-createAction format with type, payload, and withMeta fields.

 Example:

const counterReducer = makeReducer(10, {
  INCREMENT (state) { return state + 1 },
  DECREMENT (state) { return state - 1 },
  ASSIGN (state, payload) { return payload }
})

 This is the equivalent of:

const counterReducer = function (state = 10, createAction) {
  if (createAction.type === 'INCREMENT') {
    return state + 1
  } else if (createAction.type === 'DECREMENT') {
    return state - 1
  } else if (createAction.type === 'ASSIGN') {
    return createAction.payload
  } else {
    return state
  }
}
*/

export function makeReducer (initialState = {}, handledActions) {
  return function (state = initialState, action) {
    if (handledActions[action.type]) {
      try {
        return handledActions[action.type](state, action)
      } catch (e) {
        window.console.error(`Error in reducer handling ${action.type}`, e)
      }
    }
    return state
  }
}

export function concatByNewId (base, additional) {
  return additional.reduce((memo, newElement) => (
    memo.some(o => o.id===newElement.id) ? memo : memo.concat(newElement)
  ), base.concat([]))
}

// for a given array, convert into an object keyed by the value returned by 'keyFn'
// if no 'keyFn' is given, it uses the 'id' property of each object in the collection
//
export function keyed (coll, keyFn = i => i.id) {
  return coll.reduce((acc, item) => ({...acc, [keyFn(item)]: item}), {})
}
