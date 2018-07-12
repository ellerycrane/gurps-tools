import React from 'react'

const APP_PREFIX = 'app'

// Returns the display name for a given component, useful for making higher-order components with
// dynamically-generated display names. If no display name can be inferred, fall back to the
// string provided as the second argument, or just 'Component'
export function getDisplayName (Component, fallback = 'Component') {
  return Component.displayName || Component.name || fallback
}

/**
 * Generate a BEM-style class
 */
export function bem (block, element, modifier) {  
  return `${APP_PREFIX}-${block}${element ? `__${element}` : ''}${modifier ? `--${modifier}` : ''}`
}

export function pref (className) { return `${APP_PREFIX}-${className}` }

export function bemMap (block, element, modifier) {
  if (element && typeof element === 'object') {
    return bemMap(block, null, element)
  } else {
    return Object.keys(modifier).map(k => {
      if (!modifier[k] || typeof modifier[k] === 'boolean') {
        return modifier[k] ? bem(block, element, `${k}`) : bem(block, element, `not-${k}`)
      } else {
        return bem(block, element, `${k}-${modifier[k]}`)
      }
    })
  }
}

// Shallowly copy a value.
// This won't work on rich data values like ES6 classes, regexes, dom nodes,
// and that sort of thing. Oh well
export function copy (v) {
  if (Array.isArray(v)) {
    return v.slice()
  } else if (typeof v === 'object' && v) {
    // typeof null === 'object'
    return Object.assign({}, v)
  } else {
    return v
  }
}

// A generic-ish safe object updater. For a given object and key or key list,
// it will generate a structurally-shared copy of the object with the result of
// fn applied to the named key path.
//
// let o = { name: { first: 'Nick' }}
// update(o, 'name.first', n => n.toUpperCase())
// { name: { first: 'NICK' }}
// o == { name: { first: 'Nick' } }
//
// let o = { values: [ 4, 1, 3, 5, 6 ] }
// update(o, 'values', v => v.sort())
// { values: [ 1, 3, 4, 5, 6 ] }
// o == { values: [ 4, 1, 3, 5, 6 ] }
//
export function update (object, korks, fn, ...args) {
  // Normalize the korks field into an array of strings:
  const
    keyList = Array.isArray(korks) ? korks : korks.split('.'),
    // Pull off the last key, becuase we're going to want it to perform the last mutation:
    lastKey = keyList[keyList.length - 1],
    clone = Object.assign({}, object),
    // Create a structurally-shared copy of the provided object:
    pointer = keyList.slice(0, -1).reduce((pointer, key) => {
      pointer[key] = copy(pointer[key])
      return pointer[key]
    }, clone)

  pointer[lastKey] = typeof fn === 'function' ? fn(copy(pointer[lastKey]),...args) : fn
  return clone
}

export function reify (val, props) {
  return typeof val === 'function'
    ? React.createElement(val, props)
    : val
}