const fs = require('fs')
const locales = require('../constants/locales')
const sha256 = require('crypto-js/sha256')
const path = require('path')

async function validateEmbeddedLocationWarp(serverListData) {
  const locationLocales = serverListData.data
    .map(server => {
      return { id: server.id, locale: locales[server.country_code ?? 'AUTO'].locale ?? 'en' }
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        dataCenter,
        fileName: sha256(dataCenter.id.toString()).toString() + 'lnw',
      }
    })

  const fileOperations = locationLocales.map(async location => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'build',

      location.fileName + '.bundle.js',
    )

    try {
      const fileContent = await fs.readFileSync(filePath, 'utf-8')

      if (!fileContent) {
        console.error('Content does not exist', fileContent, location)
        return
      }

      if (!fileContent.includes(location.dataCenter.locale)) {
        console.error('Content not embedded correctly', location)
      }

      // no output if nothing is wrong
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`, location)
      } else {
        console.error(`Error reading file ${filePath}:`, err, location)
      }
    }
  })

  await Promise.all(fileOperations)
}

module.exports = validateEmbeddedLocationWarp
