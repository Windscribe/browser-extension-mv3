const sha256 = require('crypto-js/sha256')
const fs = require('fs')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const splitPersonalityContentScriptTemplate = require('./buildUtils/templates/splitPersonalityContentScript')

async function embedUserAgentsForSplitPersonality(config, userAgentsData) {
  // generate intermediate format based on user agent strings
  const uaList = userAgentsData.split(/\r?\n/).map(userAgent => {
    return {
      fileName: sha256(userAgent.toString()).toString(),
      content: splitPersonalityContentScriptTemplate(userAgent),
      userAgent,
    }
  })

  // using fixed paths
  const splitPersonalityGeneratedScriptFolderPath = 'src/pages/contentScripts/splitPersonality/'

  // clear older embedded files except .gitkeep
  const files = fs.readdirSync(splitPersonalityGeneratedScriptFolderPath)

  for (let file of files) {
    if (file === '.gitkeep') {
      continue
    } else {
      fs.rmSync(splitPersonalityGeneratedScriptFolderPath + file)
    }
  }

  // write to src folder which will be included in the build

  for (const uaItem of uaList) {
    const filePath = splitPersonalityGeneratedScriptFolderPath + uaItem.fileName + '.ts'
    fs.writeFileSync(filePath, uaItem.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[uaItem.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'splitPersonality',
      uaItem.fileName + '.ts',
    )
  }

  const userAgentSliceTemplate = require('./buildUtils/templates/userAgentSlice')
  const userAgentSlicePath = 'src/state/slices/userAgent.ts'
  fs.writeFileSync(
    userAgentSlicePath,
    userAgentSliceTemplate(uaList.map(uaItem => `'${uaItem.userAgent}'`)),
  )
  const formatUserAgentFile = `eslint --fix ${userAgentSlicePath}`
  await exec(formatUserAgentFile)

  const formatSplitPersonalityFiles = `eslint --fix ${splitPersonalityGeneratedScriptFolderPath}`

  await exec(formatSplitPersonalityFiles)

  // validate every file is embedded other wise throw an

  console.log('User Agent content scripts embedded into build')
}

module.exports = embedUserAgentsForSplitPersonality
