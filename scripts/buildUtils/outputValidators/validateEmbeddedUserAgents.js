const fs = require('fs')

const sha256 = require('crypto-js/sha256')
const path = require('path')

async function validateEmbeddedUserAgents(userAgentsData) {
  const x = userAgentsData.split(/\r?\n/).map(userAgent => {
    return {
      fileName: sha256(userAgent.toString()).toString(),
      userAgent,
    }
  })

  const fileOperations = x.map(async userAgent => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'build',

      userAgent.fileName + '.bundle.js',
    )

    try {
      const fileContent = await fs.readFileSync(filePath, 'utf-8')

      if (!fileContent) {
        console.error('Content does not exist', fileContent, userAgent)
        return
      }

      if (!fileContent.includes(userAgent.userAgent)) {
        console.error('Content not embedded correctly', userAgent)
      }

      // else it ok and not out put will be generated
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`, userAgent)
      } else {
        console.error(`Error reading file ${filePath}:`, err, userAgent)
      }
    }
  })

  await Promise.all(fileOperations)
}

module.exports = validateEmbeddedUserAgents
