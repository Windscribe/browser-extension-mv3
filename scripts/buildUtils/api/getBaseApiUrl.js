function getBaseApiUrl(useAssets = false) {
  // staging.windscribe.com or windscribe.com
  let domain = process.env.API_URL ?? 'staging.windscribe.com'

  if (process.env.NODE_ENV === 'production') {
    url = useAssets ? `assets.${domain}` : `api.${domain}`
  } else {
    url = useAssets ? `assets-${domain}` : `api-${domain}`
  }

  return `https://${url}/`
}

module.exports = getBaseApiUrl
