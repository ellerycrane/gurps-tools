// A route activator predicate for router5 that checks if the user is authenticated and acts on the
// result. If a value is passed in the first argument, that will be where the user is redirected if
// the user isn't logged in. If a value is passed in the second argument, that will be where the
// user will be redirected if they have logged in:
//
// Example of a router5 route declaration:
// {
//   name: 'ROBOT_PRODUCTION_REPORT',
//   path: '/robot-production',
//   canActivate: authenticated ('LOGIN') // redirect to login if the user isn't authed
// }
//
// Real world usage available in routes/route-handlers
// Router5 documentation: <https://router5.github.io/docs/preventing-navigation.html>
//
// The way that this function demonstrates the redirection intent is by returning a rejected
// promise with an object that router5 understands. How this works is documented in this github
// issue: <https://github.com/router5/router5/issues/48>
//
import { ROUTES } from '~/routes/definitions'

export function withQueryParams (route, ...queryParams) {
  return `${route}?${queryParams.join('?')}`
}

export function toHref (route, queryParams = {}) {
  let
    routeObj = ROUTES.find(r => r.name === route),
    urlPath = routeObj ? routeObj.path.split('?')[0] : null,
    urlParams = Object.keys(queryParams).map(field => {
      const
        fieldVal = queryParams[field],
        fieldValToSerialize = Array.isArray(fieldVal) ? `[${fieldVal}]` : fieldVal

      return `${field}=${window.encodeURIComponent(fieldValToSerialize)}`
    }).join('&')

  if (!urlPath) {
    window.console.warn(`Invalid route passed into route-utils.js toHref(): ${route}`)
    return ''
  }

  return urlParams ? `${urlPath}?${urlParams}` : urlPath
}
