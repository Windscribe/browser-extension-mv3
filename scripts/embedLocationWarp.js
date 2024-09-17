const sha256 = require('crypto-js/sha256')
const fs = require('fs')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const locationWarpContentScriptTemplate = require('./buildUtils/templates/locationWarpContentScript')

async function embedLocationWarp(config, serverListData) {
  const dataCenterGpsCoords = serverListData.data
    .map(server => server?.groups ?? [])
    .flat(10)
    .map(dataCenter => {
      return {
        id: dataCenter.id,
        gps: dataCenter.gps?.split(','),
      }
    })
    .filter(data => {
      return data.id !== undefined && data.id !== null && data.gps && data.gps.length == 2
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        fileName: sha256(dataCenter.id.toString()).toString() + 'lcw',
        content: locationWarpContentScriptTemplate({
          latitude: dataCenter.gps[0],
          longitude: dataCenter.gps[1],
        }),
      }
    })

  // using fixed paths
  const locationWarpGeneratedScriptFolderPath = 'src/pages/contentScripts/locationWarp/'

  // clear older embedded files except .gitkeep
  const files = fs.readdirSync(locationWarpGeneratedScriptFolderPath)

  for (let file of files) {
    if (file === '.gitkeep') {
      continue
    } else {
      fs.rmSync(locationWarpGeneratedScriptFolderPath + file)
    }
  }

  // write to src folder which will be included in the build
  for (let coords of dataCenterGpsCoords) {
    const filePath = locationWarpGeneratedScriptFolderPath + coords.fileName + '.ts'
    fs.writeFileSync(filePath, coords.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[coords.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'locationWarp',
      coords.fileName + '.ts',
    )
  }

  const formatLocationWarpFiles = `eslint --fix ${locationWarpGeneratedScriptFolderPath}`

  await exec(formatLocationWarpFiles)

  console.log('Location warp content scripts embedded into build')
}

module.exports = embedLocationWarp
