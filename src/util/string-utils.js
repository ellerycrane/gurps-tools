import React from 'react'
import { pref } from '~/components/util/component-utils'
import moment from 'moment-timezone'
import i18next from 'i18next'
import ReactMarkdown from 'react-markdown'
import staticTranslations from '~/constants/translations'
import capitalize from 'lodash/capitalize'
import to from 'to-case'

export const
  PUNCTUATION_REPLACE_REGEX = /\W+/g,
  WHITESPACE_REPLACE_REGEX = /\s+/g,
  DEFAULT_DATE_FORMAT = 'MMM DD',
  FULL_DATE_FORMAT = 'YYYY-MM-DD',
  toSnakeCase = input => to.snake(input),
  toCamelCase = input => to.camel(input),
  normalize = input => toSnakeCase(input).toUpperCase(),
  toCssClassName = input => toSnakeCase(input).toLowerCase().replace(/_/g, '-'),
  i18n = i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      format: formatter
    },
    resources: {
      en: { translation: staticTranslations }
    }
  }, (/*err, t*/) => { /* handle error */ }),
  t = (...args) => i18n.t(...args),
  printDate = (value, format=DEFAULT_DATE_FORMAT) => formatter(value, `date.${format}`),

  /* When the time comes to render larger pieces of markdown, this
     and related styles will need to be expanded */
  t_md = (...args) => {
    return <ReactMarkdown
      source={t(...args)}
      containerProps={{className: pref('markdown-content--inline')}}
      escapeHtml />
  },
  humanize = (val = '') => capitalize(val.toString().split('_').join(' '))

// i18n.on('added', function(lng, ns) { /* Emit some event which can be listened to if rerender on translation change is needed */ })

function formatter(value, format/*, lang*/) {
  const [type, detail] = format.split('.')

  if (type==='date') {
    switch (detail) {
      case 'fromNow':
        return moment(value).fromNow()
      case 'fromNowShort':
        return moment(value).fromNow(true)
      case 'calendar':
        return moment(value).calendar()
      default:
        return moment(value).format(detail || DEFAULT_DATE_FORMAT)
    }
  } else {
    switch (format) {
      case 'paramToHuman':
        return value.split('_').join(' ')
      default:
        return value
    }
  }
}