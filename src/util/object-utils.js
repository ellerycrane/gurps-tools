import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import getIn from 'lodash/get'

export function functionCheck(f) {
  if (typeof f === 'function') {
    return f
  }
  return null
}

export function objectHash (obj) {
  return new Buffer(JSON.stringify(obj)).toString('base64')
}

export function isEmptyValue(value) {
  if (
    ['function', 'boolean', 'number'].includes(typeof value) || // we always want to treat a number as non-empty; note this will treat Infinity and NaN as non-empty or it's a value, even if it's false
    value instanceof HTMLElement || // surprisingly, lodash.isEmpty returns true for HTMLElement objects, so we handle them specifically
    value instanceof Date // surprisingly, lodash.isEmpty returns true for Date objects, so we handle them specifically
  ) {
    return false
  }

  return (
    isNull(value) ||
    isUndefined(value) ||
    isEmpty(value) ||
    (isString(value) && isEmpty(value.trim()))
  )
}

export function isNonEmptyValue(value) {
  return !isEmptyValue(value)
}

/**
 * A proxy for lodash's "get" function, explicitly returning null if the return value is empty. This
 * handles cases where there may be a defined value to retrieve (preventing the get function's "default"
 * return value behavior), but it is an empty object, an empty string, etc.
 */
export function getValueIfPresent(...args) {
  const value = getIn(...args)

  return isEmptyValue(value) ? null : value
}

/**
 * Helper function for ensuring that values are arrays with non-empty elements. If the value param is not an array but
 * is a non-empty value this function will return an array containing that value. If the value param is an array, this
 * function will return it sans any elements that are considered 'empty'. Primarily useful when dealing with property
 * values that can consist of one or many values, and are not always wrapped in a array when there is only one value.
 *
 * @param value The value to wrap in an array if it is not one, or return sans empty values if it is
 * @returns {*} An array containing the original value if it was not an array, or the original value sans empty items if it was
 */
export function ensureArray(value){
  if(isEmptyValue(value)){
    return []
  }
  const arrayValue = [].concat(value)
  return arrayValue.filter((v)=>isNonEmptyValue(v))
}

/**
 * A function that takes in a string and generates a unique hash code representing that string. Different strings
 * will yield different hash codes, so comparing hash codes allows us to tell if the generated string is the same or not.
 * @param s The string
 * @returns {*} A hash code for that string
 */
export function generateHashCodeForString(s) {
  return s.split('').reduce((a, b)=> {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}

/**
 * Generates a unique hash code representing the state of the object. If an object that _.isEqual() to this object is
 * passed in, the hash code will be the same.
 * @param obj Object to generate hash code for
 * @returns {*} A unique hash code representing the object
 */
export function hashCode(obj) {
  if (isUndefined(obj)) {
    return generateHashCodeForString('undefined')
  }
  if (isString(obj)) {
    return generateHashCodeForString(obj)
  }
  return generateHashCodeForString(JSON.stringify(obj))
}
