import { SHA256 } from 'crypto-js'
import { ScriptType, getBundleNamePostFix } from './getBundleName'
import { doesBundleExistInBuild } from './scriptController'
import { DataCenter, ServerList } from 'api/types'
import { getDistanceFromLatLonInKm } from './getDistanceInKm'
import { pushToDebugLog } from 'services/debugLog'
import shuffle from 'lodash.shuffle'

export const getNearestValidDataCenter = async (
  dataCenterId: number,
  serverList: ServerList,
  currentDataCenter: Partial<DataCenter>,
  isUserPro: 0 | 1 | undefined,
  bundleToCheck: ScriptType,
): Promise<number | undefined> => {
  await pushToDebugLog({
    message: 'Finding nearest location',
    level: 'INFO',
    tag: 'popup',
    data: JSON.stringify({
      // server list would be a bit too big to put here
      dataCenterId,
      currentDataCenter,
      isUserPro,
      bundleToCheck,
    }),
  })

  const locationForCurrentDataCenter = serverList.find(servers =>
    servers.groups?.find(dataCenter => dataCenter.id === dataCenterId),
  )

  const currentDataCenterGps = currentDataCenter.gps?.split(',').map(coord => +coord)

  const isValidGpsCoord =
    currentDataCenterGps &&
    currentDataCenterGps.length === 2 &&
    !isNaN(Number(currentDataCenterGps[0])) &&
    !isNaN(Number(currentDataCenterGps[1]))

  // if theres no valid gps coord for the current data center
  // we cant find the nearest location for the data center
  // what we do instead is look for any valid location other than this one
  // otherwise we look
  // for the nearest data center from the current data center

  if (locationForCurrentDataCenter && isValidGpsCoord) {
    await pushToDebugLog({
      message: 'Location found and gps coords for current data center are valid',
      level: 'INFO',
      tag: 'popup',
    })

    let nearestValidLocations: any[] | undefined = locationForCurrentDataCenter.groups
      ?.filter(item => item.id !== dataCenterId)
      ?.map(dataCenter => {
        return {
          id: dataCenter.id,
          city: dataCenter.city,
          nick: dataCenter.nick,
          pro: dataCenter.pro,
          gps: dataCenter.gps?.split(',').map(coord => +coord),
        }
      })
      .filter(
        item =>
          item.gps &&
          item.gps.length === 2 &&
          !isNaN(Number(item.gps[0])) &&
          !isNaN(Number(item.gps[1])),
      )
      // if user is pro gimme all the locations otherwise only non-pro/free locations
      .filter(item => (isUserPro ? true : !item.pro))
      .map(item => {
        return {
          ...item,
          distance: getDistanceFromLatLonInKm(
            item.gps[0],
            item.gps[1],
            currentDataCenterGps[0],
            currentDataCenterGps[1],
          ),
        }
      })

    if (!nearestValidLocations) {
      await pushToDebugLog({
        message: 'nearestValidLocations is undefined',
        tag: 'popup',
        level: 'WARN',
        data: JSON.stringify(nearestValidLocations),
      })
      return
    }

    for (const location of nearestValidLocations) {
      const bundleName =
        SHA256(location.id.toString()) + getBundleNamePostFix(bundleToCheck) + '.bundle.js'
      const hasBundle = await doesBundleExistInBuild(bundleName)
      location.hasBundle = hasBundle
    }

    nearestValidLocations = nearestValidLocations.filter(item => item.hasBundle)
    nearestValidLocations.sort((a, b) => a.distance - b.distance)

    // have validted locations that are sorted there should be at least one location present here

    if (
      nearestValidLocations.length > 0 &&
      nearestValidLocations[0] &&
      nearestValidLocations[0].id !== null &&
      nearestValidLocations[0].id !== undefined
    ) {
      return nearestValidLocations[0].id
    }

    await pushToDebugLog({
      message: 'Could not find any nearest valid Location',
      tag: 'popup',
      level: 'WARN',
      data: JSON.stringify(nearestValidLocations),
    })

    return
  } else if (locationForCurrentDataCenter && !isValidGpsCoord) {
    await pushToDebugLog({
      message:
        'Location found and gps coords for current data center are not valid - picking any random location from server list',
      level: 'INFO',
      tag: 'popup',
    })
    // get any random location in the same country since there is no valid current data center gps coords
    // get any location other than the current one
    let nearestValidLocations: any[] | undefined = locationForCurrentDataCenter.groups
      ?.filter(item => item.id !== dataCenterId)
      ?.map(dataCenter => {
        return {
          id: dataCenter.id,
          city: dataCenter.city,
          nick: dataCenter.nick,
          pro: dataCenter.pro,
          gps: dataCenter.gps?.split(',').map(coord => +coord),
        }
      })
      .filter(
        item =>
          item.gps &&
          item.gps.length === 2 &&
          !isNaN(Number(item.gps[0])) &&
          !isNaN(Number(item.gps[1])),
      )
      // if user is pro gimme all the locations otherwise only non-pro/free locations
      .filter(item => (isUserPro ? true : !item.pro))

    if (!nearestValidLocations) {
      await pushToDebugLog({
        message: 'nearestValidLocations is undefined',
        tag: 'popup',
        level: 'WARN',
        data: JSON.stringify(nearestValidLocations),
      })
      return
    }

    for (const location of nearestValidLocations) {
      const bundleName =
        SHA256(location.id.toString()) + getBundleNamePostFix(bundleToCheck) + '.bundle.js'
      const hasBundle = await doesBundleExistInBuild(bundleName)
      location.hasBundle = hasBundle
    }

    nearestValidLocations = nearestValidLocations.filter(item => item.hasBundle)
    nearestValidLocations = shuffle(nearestValidLocations)

    if (
      nearestValidLocations.length > 0 &&
      nearestValidLocations[0] &&
      nearestValidLocations[0].id !== null &&
      nearestValidLocations[0].id !== undefined
    ) {
      return nearestValidLocations[0].id
    }

    await pushToDebugLog({
      message: 'Could not find any nearest valid Location',
      tag: 'popup',
      level: 'WARN',
      data: JSON.stringify(nearestValidLocations),
    })

    return
  } else {
    // could not find any valid location at all
    // can only log it then
    pushToDebugLog({
      message: 'Could not find any nearest data center',
      tag: 'popup',
      level: 'WARN',
      data: JSON.stringify({
        // server list would be a bit too big to put here
        dataCenterId,
        currentDataCenter,
        isUserPro,
        bundleToCheck,
      }),
    })
    return
  }
}
