import { ServerList, CruiseControlDomainsData, CruiseControlItem } from 'api/types'

export default (
  serverlist: ServerList,
  isPremium = 0,
  cruiseControlDomains: CruiseControlDomainsData,
): CruiseControlItem[] => {
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
    .filter(location => Object.keys(cruiseControlDomains).includes(location.short_name))
    .map(location => ({
      domains: cruiseControlDomains[location.short_name],
      hosts: Object.values(location.groups)
        ?.map(group => group.hosts)
        .filter(Boolean)
        .flat(),
    }))
}
