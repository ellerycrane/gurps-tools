
//
// ---------------------------------------------------------------------------------------------
// ROUTE NAME CONSTANTS:
//
// We export the route names so we can avoid using magic strings for routing in other parts of the
// application. So instead of doing:
//
// router5Actions.navigateTo('dashboard')
//
// We can do:
//
// router5Actions.navigateTo(DASHBOARD)
//
// That way if either the route name (the string literal 'dashboard') or the symbol for the route
// (the variable DASHBOARD) change, we can easily refactor those changes throughout the codebase.
//
export const
  LANDING_PAGE = 'landingPage',
  DEBUG_PAGE = 'debug',
  ERROR = 'error'
