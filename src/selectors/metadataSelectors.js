import get from 'lodash/get'
import { getValueIfPresent } from '~/util/object-utils'
import { getCurrentPage } from 'selectors/pageStateSelectors'
import { shouldFormatPagination, formatPagination } from '~/components/util/pagination-utils'

export const
  getMetadata = (state, page) => getValueIfPresent(state, `metadata.${page}`) || {},
  getCurrentMetadata = state => getMetadata(state, getCurrentPage(state)),
  getPagination = (state, page) => getValueIfPresent(getMetadata(state, page), 'pagination') || {},
  getFormattedPagination = (state, page) => {
    const rawPagination = getPagination(state, page || getCurrentPage(state))

    return shouldFormatPagination(rawPagination)
      ? formatPagination(rawPagination)
      : rawPagination
  }