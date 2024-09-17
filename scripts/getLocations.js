const fetch = require('node-fetch-commonjs')
const getBaseApiUrl = require('../scripts/buildUtils/api/getBaseApiUrl')
async function getLocations(sessionData) {
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

  return serverListData
}

module.exports = getLocations
