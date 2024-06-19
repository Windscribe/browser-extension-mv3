const fetch = require('node-fetch-commonjs')
const sha256 = require('crypto-js/sha256')
const fs = require('node:fs/promises')
const path = require('path')
const splitPersonalityContentScriptTemplate = require('./buildUtils/templates/splitPersonalityContentScript')
const userAgentSliceTemplate = require('./buildUtils/templates/userAgentSlice')
const getEndpoint = require('./buildUtils/api/getEndpoint')

async function embedUserAgentsForSplitPersonality(config) {
  const body = {
    password: process.env.BUILD_USER_PASSWORD,
    session_type_id: 2,
    username: process.env.BUILD_USER_NAME,
    // cannot use 2fa flow during build process, so its not included and shouldn't be used
  }

  console.log(`process.env.BUILD_USER_NAME: ${body.username}`)

  const sessionResponse = await fetch(getEndpoint('Session'), {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const sessionData = await sessionResponse.json()

  if (!sessionData.data || !sessionData.data.session_auth_hash) {
    throw Error('No session auth hash is available')
  }

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
    throw Error('No blocklist/useragents link  is available')
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
      filename: sha256(userAgent).toString(),
      content: splitPersonalityContentScriptTemplate(userAgent),
      userAgent,
    }
  })

  // using fixed paths
  const directory = 'src/pages/contentScripts/splitPersonality/'
  const splitPersonalityReducerDirectory = 'src/state/slices/userAgent.ts'

  // write to src folder which will be included in the build
  for (let uaItem of uaList) {
    const filePath = directory + uaItem.filename + '.ts'
    await fs.writeFile(filePath, uaItem.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[uaItem.filename] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'splitPersonality',
      uaItem.filename + '.ts',
    )
  }

  await fs.writeFile(
    splitPersonalityReducerDirectory,
    userAgentSliceTemplate(uaList.map(uaItem => `'${uaItem.userAgent}'`)),
  )

  console.log('User Agent content scripts embedded into build')
}

module.exports = embedUserAgentsForSplitPersonality
