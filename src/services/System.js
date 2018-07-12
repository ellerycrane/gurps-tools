import { Service } from './Service'

function kvp (o) {
  return Object.keys(o).map(k => ([k, o[k]]))
}

// Adapted from the depth-first algo here: <https://en.wikipedia.org/wiki/Topological_sorting>
function orderDependencies (service, order = [], tmark = new Set(), pmark = new Set()) {
  if (tmark.has(service)) throw new Error('Cycle detected')

  if (!pmark.has(service)) {
    tmark.add(service)
    service.dependencies().map(d => {
      if (!service[d]) throw new Error(`Cannot find service named [${d}]`)
      return service[d]
    }).forEach(ds => {
      orderDependencies(ds, order, tmark, pmark)
    })
    tmark.delete(service)
    pmark.add(service)
    order.push(service)
  }

  return order
}

export class SystemService extends Service {
  constructor (map) {
    super()

    this.services = kvp(map).map(([key, service]) => {
      service.dependencies().forEach(dep => service[dep] = map[dep])
      service.system = this
      this[key] = service
      return key
    })
  }

  start () {
    window.console.info('Starting system...')
    orderDependencies(this).slice(0, -1).forEach(s => s.start())
  }
  stop () {
    window.console.info('Stopping system...')
    orderDependencies(this).slice(0, -1).reverse().forEach(s => s.stop())
  }
  dependencies () {
    return this.services
  }
}

export function makeSystem (map) {
  return new SystemService(map)
}
