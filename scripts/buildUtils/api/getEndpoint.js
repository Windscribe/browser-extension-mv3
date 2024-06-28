const md5 = require('crypto-js/md5')
const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'

function getEndpoint(endPoint, parameters) {
  const time = Math.round(new Date().getTime() / 1000).toString()
  const clientAuthHash = md5(`${CLIENT_AUTH_SECRET}${time}`).toString()

  let queryString = `${endPoint}?platform=chrome&time=${time}&client_auth_hash=${clientAuthHash}`

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      queryString = queryString + `&${key}=${value}`
    })
  }

  // always get data from prod domain
  let domain = 'windscribe.com'

  // dont need assets, that's why useAssets is not here
  url = `api.${domain}`

  return `https://${url}/${queryString}`
}

module.exports = getEndpoint
