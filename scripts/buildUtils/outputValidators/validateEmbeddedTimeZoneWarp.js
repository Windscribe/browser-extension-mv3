const fs = require('fs')
const sha256 = require('crypto-js/sha256')
const path = require('path')
const getTimeWarp = require('../utils/getTimeWarp')

async function validateEmbeddedTimeZoneWarp(serverListData) {
  const timeZones = serverListData.data
    .map(server => {
      return { id: server.id, tz: server.tz }
    })
    .filter(timeZone => timeZone.tz)
    .map(timeZone => {
      return {
        id: timeZone.id,
        tz: getTimeWarp(timeZone.tz),
      }
    })
    .filter(
      timeZone =>
        timeZone.tz &&
        timeZone.tz.offset !== null &&
        timeZone.tz.offset !== undefined &&
        timeZone.tz.desiredTimezone !== null &&
        timeZone.tz.desiredTimezone !== undefined,
    )
    .map(spoofedTime => {
      return {
        spoofedTime,
        // cannot pass in number to sha256
        fileName: sha256(spoofedTime.id.toString()).toString() + 'tzw',
      }
    })

  const fileOperations = timeZones.map(async timeZoneData => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'build',

      timeZoneData.fileName + '.bundle.js',
    )

    try {
      const fileContent = await fs.readFileSync(filePath, 'utf-8')

      if (!fileContent) {
        console.error('Content does not exist', fileContent, timeZoneData)
        return
      }

      if (!fileContent.includes(timeZoneData.spoofedTime.tz.desiredTimezone)) {
        console.error('Content not embedded correctly', timeZoneData)
      }

      // no output if nothing is wrong
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`, timeZoneData)
      } else {
        console.error(`Error reading file ${filePath}:`, err, timeZoneData)
      }
    }
  })

  await Promise.all(fileOperations)
}

module.exports = validateEmbeddedTimeZoneWarp
