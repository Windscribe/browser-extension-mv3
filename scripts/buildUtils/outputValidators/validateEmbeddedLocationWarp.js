const fs = require('fs')

const sha256 = require('crypto-js/sha256')
const path = require('path')

// matches the output of webpack
function toJsLiteral(num) {
  // Check if the input is a number and is finite
  if (typeof num !== 'number' || !isFinite(num)) {
    throw new Error('Input is not a finite number', num)
  }
  // Convert the number to a string
  let numStr = num.toString()

  if (Math.abs(num) < 1 && num !== 0) {
    // Remove the leading zero but keep the minus sign if present
    if (numStr.startsWith('-0')) {
      numStr = numStr.replace('-0', '-')
    } else if (numStr.startsWith('0')) {
      numStr = numStr.replace('0', '')
    }
  }

  return numStr
}

async function validateEmbeddedLocationWarp(serverListData) {
  const groups = serverListData.data.map(server => server?.groups ?? []).flat(10)

  const dataCenterGpsCoords = groups
    .map(dataCenter => {
      return {
        id: dataCenter.id,
        gps: dataCenter.gps?.split(','),
      }
    })
    .filter(data => {
      return data.id !== undefined && data.id !== null && data.gps && data.gps.length == 2
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        dataCenter,
        fileName: sha256(dataCenter.id.toString()).toString() + 'lcw',
      }
    })

  const fileOperations = dataCenterGpsCoords.map(async dataCenter => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'build',

      dataCenter.fileName + '.bundle.js',
    )

    try {
      const fileContent = await fs.readFileSync(filePath, 'utf-8')

      if (!fileContent) {
        console.error('Content does not exist', fileContent, dataCenter)
        return
      }

      if (
        !fileContent.includes(toJsLiteral(Number(dataCenter.dataCenter.gps[0]))) ||
        !fileContent.includes(toJsLiteral(Number(dataCenter.dataCenter.gps[1])))
      ) {
        console.error('Content not embedded correctly', dataCenter)
      }

      // no output if nothing is wrong
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`, dataCenter)
      } else {
        console.error(`Error reading file ${filePath}:`, err, dataCenter)
      }
    }
  })

  await Promise.all(fileOperations)
}

module.exports = validateEmbeddedLocationWarp
