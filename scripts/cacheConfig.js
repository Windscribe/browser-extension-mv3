const path = require('path')
const { create } = require('flat-cache') // updated import

const CACHE_KEY = 'ws-build-cache'
const CACHE_FILE_DIR = path.resolve(__dirname, '..', '.ws-build-cache') // custom dir to store cache

const CACHE_TTL = 1000 * 60 * 60 // 1 hour in milliseconds
const FORCE_REFRESH = process.env.FORCE_REFRESH === 'true'
const BYPASS_CACHING = process.env.BYPASS_CACHING === 'true'

const buildCache = create({
  cacheId: CACHE_KEY,
  cacheDir: CACHE_FILE_DIR,
  ttl: CACHE_TTL,
})

module.exports = {
  CACHE_TTL,
  FORCE_REFRESH,
  BYPASS_CACHING,
  buildCache,
}
