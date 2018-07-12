/*

  This file is to define the things that should be put into the single entity
  store. Here you can also define custom conversions for the api response to
  set up the data before it gets merged into the app state.

  Example:

  requestService.threats.fetchList()
    .then(res => dispatch(mergeEntities(convertResponseEntities(res))))
    .then(()  => dispatch({ type: LOADED_THREATS_LIST }))

  By default, the response will be returned as-is. There are opportunities
  to make changes (depending on the type of the value at the response key:

  - Object: Provide an entityProcessor function which takes the object and
    prepares it for the store, returning an object where the keys are the
    keys you want to use in appState.entities and the values are the entity data.
  - Array: Provide an entityProcessor function which takes the array of entities
    and returns another array. The returned array will be converted into an
    object with keys via your provided keyParser whose argument will be one of the
    items in the array an which should return the derived value to used as the key
    in appState.entities.

  For an array response, you MUST define a keyParsers. entityProcessor is
  optional in both cases.

*/

const
  ident = type => o => `${type}-${o.id}`,
  typeFromId = id => id.split('-')[0],
  idFromId = id => id.split('-')[1],
  /*
    An example for how certain data can be processed differently
  */
  exampleProcessor = exampleRows => exampleRows.map(row => {
    const
      otherId = row.id,
      convertedRow = Object.assign({}, row, {otherId})

    return convertedRow
  }),
  spreadsheetProcessor = (data) => {
    console.log("Got data to process in spreadsheet processor", data)
    return [data]
  }



export default {
  spreadsheet        :{ apiKey: 'spreadsheets',    entityProcessor: spreadsheetProcessor                                             },
  accessPoint        :{ apiKey: 'access_points',   keyParser: ident('access_point')                                                  },
  client             :{ apiKey: 'clients',         keyParser: ident('client')                                                        },
  networkHost        :{ apiKey: 'network_hosts',   keyParser: ident('network_host')                                                  },
  interfaces         :{ apiKey: 'assets'                                                                                             },
  // interfaceResults   :{ apiKey: 'results',         keyParser: interfaceSearchKeyParser                                               },
  events             :{ apiKey: 'events',          keyParser: ident('event')                                                         },
  review             :{ apiKey: 'reviews',         keyParser: ident('threat_review')                                                 },
  // sensor             :{ apiKey: 'sensors',         keyParser: sensorKeyParser                                                        },
  sensorGroup        :{ apiKey: 'groups',          keyParser: ident('sensor_group')                                                  },
  sensorTag          :{ apiKey: 'sensor_tags'                                                                                        },
  singeleSensorGroup :{ apiKey: 'single_groups',   keyParser: ident('single_sensor_group')                                           },
  // standard           :{ apiKey: 'standards',                                               entityProcessor: standardsProcessor       },
  // threat             :{ apiKey: 'threats',         keyParser: ident('threat'),             entityProcessor: threatsProcessor         },
  user               :{ apiKey: 'users',           keyParser: ident('user')                                                          },
  vulnerabilities    :{ apiKey: 'vulnerabilities', keyParser: ident('vuln')                                                          },
  connection         :{ apiKey: 'connections',     keyParser: ident('connection')                                                    }
}

export { typeFromId, idFromId }
