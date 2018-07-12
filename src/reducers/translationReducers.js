import { TRANSLATIONS_CHANGED } from '~/actions/translationActions'
import { appReducer } from '~/util/reducer-utils'
import staticTranslations from '~/constants/translations'

const TRANSLATIONS_STORE_KEY = 'translations'

export default appReducer({
  key: TRANSLATIONS_STORE_KEY,
  initialState: {...staticTranslations},
  actions: {
    [TRANSLATIONS_CHANGED] (state, action) {
      return {...state, ...action.payload}
    }
  }
})

export { TRANSLATIONS_STORE_KEY }