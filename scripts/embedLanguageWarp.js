const sha256 = require('crypto-js/sha256')
const fs = require('fs')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const languageWarpContentScriptTemplate = require('./buildUtils/templates/languageWarpContentScript')
const locales = require('./buildUtils/constants/locales')
async function embedLanguageWarp(config, serverListData) {
  const locationLocales = serverListData.data
    .map(server => {
      return { id: server.id, locale: locales[server.country_code ?? 'AUTO'].locale ?? 'en' }
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        fileName: sha256(dataCenter.id.toString()).toString() + 'lnw',
        content: languageWarpContentScriptTemplate(dataCenter.locale),
      }
    })

  //  using fixed paths
  const languageWarpGeneratedScriptFolderPath = 'src/pages/contentScripts/languageWarp/'

  // clear older embedded files except .gitkeep
  const files = fs.readdirSync(languageWarpGeneratedScriptFolderPath)

  for (let file of files) {
    if (file === '.gitkeep') {
      continue
    } else {
      fs.rmSync(languageWarpGeneratedScriptFolderPath + file)
    }
  }

  //  write to src folder which will be included in the build
  for (let locationLocale of locationLocales) {
    const filePath = languageWarpGeneratedScriptFolderPath + locationLocale.fileName + '.ts'
    fs.writeFileSync(filePath, locationLocale.content)

    //  update webpack config entry object to inlcude the newly generated files
    config.entry[locationLocale.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'languageWarp',
      locationLocale.fileName + '.ts',
    )
  }

  const formatLanguageWarpFiles = `eslint --fix ${languageWarpGeneratedScriptFolderPath}`

  await exec(formatLanguageWarpFiles)

  console.log('Language warp content scripts embedded into build')
}

module.exports = embedLanguageWarp
