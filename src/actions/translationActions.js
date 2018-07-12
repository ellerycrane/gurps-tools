import { i18n } from '~/util/string-utils'
import {getValueIfPresent} from '~/util/object-utils'
import { TRANSLATIONS_STORE_KEY } from '~/reducers/translationReducers'

export const
  TRANSLATIONS_CHANGED = 'TRANSLATIONS_CHANGED',
  setTranslations = (translations) => (dispatch, getState) => {
    // For best results, dispatch this action before data-related actions
    // Root keys (top-level namespaces) which are..
    // - Present in new translations but not the store: are added
    // - Present in both: are overwritten
    // - Present in the store but not the new translations: are retained in the store
    dispatch({ type: TRANSLATIONS_CHANGED, payload: translations })

    const updatedTranslations = getValueIfPresent(getState(), TRANSLATIONS_STORE_KEY) || {}

    i18n.addResourceBundle('en', 'translation', updatedTranslations, true, true) // library's deep merge with override
  }
