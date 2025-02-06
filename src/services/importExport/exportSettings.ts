import { RootState } from 'state'

export const exportSettings = (state: RootState): void => {
  const jsonObject = {
    data: {
      // general settings
      contextMenu: state.contextMenu,
      locationLoad: state.locationLoad,
      allowSystemNotifications: state.allowSystemNotifications,
      //  connection settings
      connectionState: state.connection,
      proxyPort: state.proxyPort,
      // blocker settings
      blockLists: state.blocker.blockLists,
      // privacy settings
      languageWarpEnabled: state.languageWarpEnabled,
      locationWarp: state.locationWarp,
      workerBlock: state.workerBlock,
      timeWarpEnabled: state.timeWarpEnabled,
      webRtcEnabled: state.webRtcEnabled,
      splitPersonalityEnabled: state.splitPersonalityEnabled,
      notificationBlockerEnabled: state.notificationBlockerEnabled,
      adPrivacyEnabled: state.adPrivacyEnabled,
      // allowlists
      allowlist: state.allowlist,
      // theme
      theme: state.theme.value,
      // fav locations
      favoriteLocations: state.favoriteLocations.map(item => item.id),
      locationSorting: state.locationSorting,
    },
    schema_version: 1,
  }

  const blob = new Blob([JSON.stringify(jsonObject, undefined, 2)], {
    type: 'application/json',
  })

  // Create a URL for the blob
  const url = URL.createObjectURL(blob)

  // Create a temporary anchor element to trigger the download
  const a = document.createElement('a')
  a.href = url
  a.download = 'settings.json' // The default filename
  document.body.appendChild(a)
  a.click()

  // Clean up by revoking the object URL and removing the element
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
