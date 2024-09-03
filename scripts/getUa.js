const fs = require('fs')
const path = require('path')

function getUserAgents() {
  const userAgentsData = fs.readFileSync(path.join(__dirname, '..', 'useragents.txt'), 'utf-8')

  if (!userAgentsData) {
    throw Error('No user agents list is available')
  }

  console.log(path)
  console.log(userAgentsData)
  return userAgentsData
}

module.exports = getUserAgents
