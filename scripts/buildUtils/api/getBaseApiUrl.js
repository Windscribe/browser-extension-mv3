function getBaseApiUrl(useAssets = false) {
  // staging.windscribe.com or windscribe.com
  let domain = 'windscribe.com'

  url = useAssets ? `assets.${domain}` : `api.${domain}`

  return `https://${url}/`
}

module.exports = getBaseApiUrl
