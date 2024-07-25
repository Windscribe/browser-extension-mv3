const fetch = require('node-fetch-commonjs')
const getEndpoint = require('./buildUtils/api/getEndpoint')

async function login() {
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

  return sessionData
}

module.exports = login
