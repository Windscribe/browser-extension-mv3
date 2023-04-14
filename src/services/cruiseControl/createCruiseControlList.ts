// import { flatten } from 'lodash'
// import pickHosts from './pickHosts'
// import { store } from 'state'
import { ServerList, CruiseControlDomainsData } from 'api/types'

export default (
  serverlist: ServerList,
  isPremium = 0,
  cruiseControlDomains: CruiseControlDomainsData,
): any => {
  //we only care about servers we can actually access
  const filteredServerList = serverlist
    .filter(location => location.premium_only <= isPremium)
    .map(filteredLocation => {
      const filteredGroups = filteredLocation.groups?.filter(
        dataCenter => dataCenter.pro <= isPremium,
      )
      return { ...filteredLocation, groups: filteredGroups }
    })

  return filteredServerList
    .filter(loc => Object.keys(cruiseControlDomains).includes(loc.short_name))
    .map(loc => ({
      ...loc,
      domains: cruiseControlDomains[loc.short_name],
      hosts: Object.values(loc.groups)
        ?.map(group => group.hosts)
        .filter(Boolean)
        .flat(),
    }))
}
