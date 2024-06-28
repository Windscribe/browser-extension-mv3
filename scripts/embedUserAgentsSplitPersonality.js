const fetch = require('node-fetch-commonjs')
const sha256 = require('crypto-js/sha256')
const fs = require('node:fs/promises')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const splitPersonalityContentScriptTemplate = require('./buildUtils/templates/splitPersonalityContentScript')
const getEndpoint = require('./buildUtils/api/getEndpoint')

async function embedUserAgentsForSplitPersonality(config, sessionData) {
  const blockListsResponse = await fetch(
    getEndpoint('ExtBlocklists', {
      session_auth_hash: sessionData.data.session_auth_hash,
      version: 3,
    }),
    {
      method: 'GET',
    },
  )

  const blockListsResponseData = await blockListsResponse.json()

  if (!blockListsResponseData.data || !blockListsResponseData.data.useragents) {
    throw Error('No blocklist/useragents link is available')
  }

  const userAgentsResponse = await fetch(blockListsResponseData.data.useragents, {
    method: 'GET',
  })

  const userAgentsData = await userAgentsResponse.text()

  if (!userAgentsData) {
    throw Error('No user agents list is available')
  }

  // generate intermediate format based on user agent strings
  const uaList = userAgentsData.split(/\r?\n/).map(userAgent => {
    return {
      fileName: sha256(userAgent.toString()).toString(),
      content: splitPersonalityContentScriptTemplate(userAgent),
      userAgent,
    }
  })

  // using fixed paths
  const splitPersonalityGeneratedScriptFolderPath = 'src/pages/contentScripts/splitPersonality/'

  // write to src folder which will be included in the build
  for (const uaItem of uaList) {
    const filePath = splitPersonalityGeneratedScriptFolderPath + uaItem.fileName + '.ts'
    await fs.writeFile(filePath, uaItem.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[uaItem.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'splitPersonality',
      uaItem.fileName + '.ts',
    )
  }

  /* 
     Keeping this here for future reference
     const userAgentSliceTemplate = require('./buildUtils/templates/userAgentSlice')
     const userAgentSlicePath = 'src/state/slices/userAgent.ts'
     await fs.writeFile(
      userAgentSlicePath,
      userAgentSliceTemplate(uaList.map(uaItem => `'${uaItem.userAgent}'`)),
     )
     const formatUserAgentFile = `eslint --fix ${userAgentSlicePath}`
     await exec(formatUserAgentFile)
  */

  const formatSplitPersonalityFiles = `eslint --fix ${splitPersonalityGeneratedScriptFolderPath}`

  await exec(formatSplitPersonalityFiles)

  console.log('User Agent content scripts embedded into build')
}

module.exports = embedUserAgentsForSplitPersonality
