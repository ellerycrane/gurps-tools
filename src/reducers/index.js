import page from './pageReducers'
import entities from './entitiesReducers'
import routePreserver from './routePreserver'
import request from './requestReducers'
import translations from './translationReducers'

export default {
  ...page,
  ...entities,
  ...routePreserver,
  ...request,
  ...translations
}
