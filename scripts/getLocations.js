const fetch = require('node-fetch-commonjs')
const getBaseApiUrl = require('../scripts/buildUtils/api/getBaseApiUrl')

const { buildCache, CACHE_TTL, FORCE_REFRESH } = require('./cacheConfig')

async function getLocations(sessionData) {
  const cachedLocations = buildCache.getKey('locations')
  const now = Date.now()

  if (
    !FORCE_REFRESH &&
    cachedLocations &&
    cachedLocations.timestamp &&
    now - cachedLocations.timestamp < CACHE_TTL
  ) {
    console.log('✅ Returning cached locations')
    return cachedLocations.data
  }

  if (FORCE_REFRESH) {
    console.log('♻️  Forcing locations refresh (cache bypassed)')
  }

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

  console.log('serverListData', serverListData)

  if (!serverListData.data) {
    throw Error('No serverlist is available')
  }

  buildCache.setKey('locations', {
    timestamp: now,
    data: serverListData,
  })
  buildCache.save()

  return serverListData
}

module.exports = getLocations
