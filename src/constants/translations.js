
export default {
  // For dates, embed format within translation: 'This sentence includes a date with a format: {{date, date.MM/DD/YY}}'
  none: 'None',
  unknown: 'Unknown',

  labels: {
    // Forms
    username: 'User Name',
    password: 'Password',
    otp: '2FA',
    sortBy: '{{field, paramToHuman}}',
    sortOrder: {
      asc: 'asc',
      desc: 'desc'
    },

    // Headers/Titles
    permissionDenied: 'Permission Denied',
    defaultError: 'Something went wrong',
    maintenance: 'Maintenance in progress',
    notFound: 'Page not found',

    // Header menus
    sortByMenu: 'Sort By',
    sortOrderMenu: 'Order By',
    exampleOne: {
      one: 'One',
      two: 'Two'
    },
    exampleWithVariables: '{{status}} $t(labels.exampleOne.{{type}})',
    eventTitles: {
      default: 'Event {{id}}',
      threat_detected: '{{term, paramToHuman}} Detected',
      threat_removed: '{{term, paramToHuman}} Removed',
      tag_added: '$t(labels.interfaceType.{{interfaceType}}) Tagged As {{tagName}}',
      tag_removed: '$t(labels.interfaceType.{{interfaceType}}) No Longer Tagged As {{tagName}}',
      interface_detected: 'New $t(labels.interfaceType.{{interfaceType}}) Detected',
      interface_changed: '$t(labels.interfaceType.{{interfaceType}}) Changes',
      client_connected: '$t(labels.interfaceType.{{interfaceType}}) Connected',
      client_disconnected: '$t(labels.interfaceType.{{interfaceType}}) Disconnected',
      interface_came_online: '$t(labels.interfaceType.{{interfaceType}}) Came Online',
      interface_went_offline: '$t(labels.interfaceType.{{interfaceType}}) Went Offline',
      changed_field: '$t(labels.interfaceType.{{interfaceType}}) Changed {{fields}}',
      changed_fields: '$t(labels.interfaceType.{{interfaceType}}) Changed {{numFields}} Fields',
      threat_went_inactive: 'Threat Went Inactive'
    },
    eventsPauseButton: {
      pausedAt: 'Events streaming paused at {{date}}',
      live: 'Events streaming is LIVE'
    },
    rangePicker: {
      pastHour: 'Past Hour',
      fiveHours: 'Past Five Hours',
      pastDay: 'Past 24 Hours',
      twoDays: 'Past 48 Hours',
      pastWeek: 'Past 7 Days',
      pastThirtyDays: 'Past 30 Days'
    }
  },
  content: {
    // emptyMessages
    noData: 'No data found',
    lipsum: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    permissionDeniedError: '$t(content.lipsum)',
    defaultError: '$t(content.lipsum)',
    maintenanceNotice: '$t(content.lipsum)',
    notFoundError: '$t(content.lipsum)',

    threatReviewedBy: 'Marked as $t(labels.threatStatus.{{status}}) by **{{name}}** {{date, date.calendar}}',
    threatUnreviewed: 'Unreviewed',
    threatActiveDisplay: '**Active for {{start, date.fromNowShort}}** Detected {{start, date.calendar}}',
    threatInactiveDisplay: '**Inactive** was active **{{start, date.calendar}} to {{end, date.calendar}}** ({{duration}})'
  }
}
