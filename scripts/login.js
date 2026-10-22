const fetch = require('node-fetch-commonjs')
const SHA256 = require('crypto-js/sha256')
const getEndpoint = require('./buildUtils/api/getEndpoint')

const SECRET_KEY_PSY_OP = 'if_you_copy_this_you_might_die_a_painful_death'

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

  // Step 1: Get auth token
  const authTokenResponse = await fetch(getEndpoint('AuthToken/login'), {
    method: 'POST',
  })
  const authTokenData = await authTokenResponse.json()

  if (!authTokenData.data?.token) {
    throw Error('Failed to get auth token')
  }

  const secureToken = authTokenData.data.token
  const secureTokenSig = SHA256(secureToken + SECRET_KEY_PSY_OP).toString()

  // Step 2: Login with the token
  const body = {
    password: process.env.BUILD_USER_PASSWORD,
    session_type_id: 2,
    username: process.env.BUILD_USER_NAME,
    secure_token: secureToken,
    secure_token_sig: secureTokenSig,
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
