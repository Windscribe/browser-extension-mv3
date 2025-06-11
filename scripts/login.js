const fetch = require('node-fetch-commonjs')
const getEndpoint = require('./buildUtils/api/getEndpoint')

const { CACHE_TTL, FORCE_REFRESH, buildCache, BYPASS_CACHING } = require('./cacheConfig')

async function login() {
  const cachedSession = buildCache.getKey('sessionData')
  const now = Date.now()

  if (
    !FORCE_REFRESH &&
    cachedSession &&
    cachedSession.timestamp &&
    now - cachedSession.timestamp < CACHE_TTL
  ) {
    console.log('✅ Returning cached session')
    return cachedSession.data
  }

  if (FORCE_REFRESH) {
    console.log('♻️  Forcing session refresh (cache bypassed)')
  }

  if (BYPASS_CACHING) {
    console.log('♻️  Bypassing session cache')
  }

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

  // Cache the result
  if (!BYPASS_CACHING) {
    buildCache.setKey('sessionData', {
      timestamp: now,
      data: sessionData,
    })
    buildCache.save()
  }

  return sessionData
}

module.exports = login
