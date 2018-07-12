import browser from 'browser-detect'

export const getClientBrowserName = () => {
  return browser().name
}
