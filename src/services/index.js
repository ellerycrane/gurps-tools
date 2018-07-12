import { makeSystem } from './System'
import { storeService } from './StoreService'
import { apiService } from './ApiService'
import { requestService } from './RequestService'
import { routerService, routerController } from './RouterService'
import { uiService } from './UiService'

export default function createSystem (initialState) {
  return makeSystem({
    uiService: uiService(),
    storeService: storeService(initialState),
    apiService: apiService(),
    routerService: routerService(),
    requestService: requestService(),
    _: routerController() // nothing should ever depend on this, so _
  })
}
