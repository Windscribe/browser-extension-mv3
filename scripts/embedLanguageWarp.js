const fetch = require('node-fetch-commonjs')
const sha256 = require('crypto-js/sha256')
const fs = require('node:fs/promises')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const getBaseApiUrl = require('./buildUtils/api/getBaseApiUrl')
const languageWarpContentScriptTemplate = require('./buildUtils/templates/languageWarpContentScript')
const locales = require('./buildUtils/constants/locales')
async function embedLanguageWarp(config, sessionData) {
  const loc_hash = sessionData.data?.loc_hash
  const is_premium = sessionData.data?.is_premium
  const alc = sessionData.data?.alc

  if (!loc_hash) {
    throw Error('No loc_hash is available. Try to sign in.')
  }

  const serverListResponse = await fetch(
    `${getBaseApiUrl(true)}serverlist/chrome/${is_premium}/${loc_hash}${
      alc ? `?alc=${alc.join(',')}` : ''
    }`,
  )

  const serverListData = await serverListResponse.json()

  if (!serverListData.data) {
    throw Error('No serverlist is available')
  }

  const locationLocales = serverListData.data
    .map(server => {
      return { id: server.id, locale: locales[server.country_code ?? 'AUTO'].locale ?? 'en' }
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        fileName: sha256(dataCenter.id.toString()).toString(),
        content: languageWarpContentScriptTemplate(dataCenter.locale),
      }
    })

  //  using fixed paths
  const languageWarpGeneratedScriptFolderPath = 'src/pages/contentScripts/languageWarp/'

  //  write to src folder which will be included in the build
  for (let locationLocale of locationLocales) {
    const filePath = languageWarpGeneratedScriptFolderPath + locationLocale.fileName + '.ts'
    await fs.writeFile(filePath, locationLocale.content)
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
