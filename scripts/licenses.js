// node js script to get ui package licenses
//
// NOTE You need to run this command before executing the script for the first time:
//     npm install -g license-checker
//

let
  spawnSync = require('child_process').spawnSync,
  fs = require('fs'),
  rawLicenses = {
    npm: JSON.parse(`${spawnSync('license-checker', ['--json']).stdout}`)
  },
  licenses = []

Object.keys(rawLicenses).forEach(k => {
  Object.keys(rawLicenses[k]).forEach(key => {
    let
      packageName = key.split('@'),
      packageData = rawLicenses[k][key],
      license = Array.isArray(packageData.licenses) ? packageData.licenses.join('|') : packageData.licenses,
      repo = typeof packageData.repository === 'object' ? packageData.repository.url : (packageData.repository || '')

    licenses.push(`Casey,Cloud - JS,${packageName[0]},${license},${repo},${k}`)
  })
})

fs.writeFile('./licenses.csv', [...new Set(licenses)].join('\n'), err => err ? console.log(err) : null)
