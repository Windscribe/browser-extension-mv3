import {
  workerBlockScriptId,
  splitPersonalityScriptId,
  locationWarpScriptId,
  languageWarpScriptId,
  timeZoneWarpScriptId,
  fontAntiFingerprintingScriptId,
  screenResAntiFingerprintingScriptId,
  fingerprintjsAntiFingerprintingScriptId,
  audioAntiFingerprintingScriptId,
  canvasAntiFingerprintingScriptId,
} from './constants'
import { toExcludeMatchesURL, updateScript } from './scriptController'

// taken from mv2
export const ALLOWLIST_DOMAIN_TABLE = {
  'youtube.com': ['googlevideo.com'],
  'www.youtube.com': ['googlevideo.com'],
  'netflix.com': ['nflxvideo.net'],
  'www.netflix.com': ['nflxvideo.net'],
}

type Keys = keyof typeof ALLOWLIST_DOMAIN_TABLE

export const domainDependents = (domain: string): string[] => {
  const deps = ALLOWLIST_DOMAIN_TABLE[domain as Keys]

  if (!deps) {
    return []
  } else {
    return deps
  }
}

type ScriptExcludeMatches = {
  workerBlockScriptExcludeMatches: string[] | undefined
  splitPersonalityScriptExcludeMatches: string[] | undefined
  locationWarpScriptExcludeMatches: string[] | undefined
  languageWarpScriptExcludeMatches: string[] | undefined
  timeZoneWarpScriptExcludeMatches: string[] | undefined
  fontAntiFingerprintingScriptExcludeMatches: string[] | undefined
  screenResAntiFingerprintingScriptExcludeMatches: string[] | undefined
  canvasAntiFingerprintingScriptExcludeMatches: string[] | undefined
  audioAntiFingerprintingScriptExcludeMatches: string[] | undefined
  fingerprintjsAntiFingerprintingScriptExcludeMatches: string[] | undefined
}

export const getAllExcludeMatches = async (): Promise<ScriptExcludeMatches> => {
  // one bulk call to get all the scripts
  const scripts = await chrome.scripting.getRegisteredContentScripts({
    ids: [
      workerBlockScriptId,
      splitPersonalityScriptId,
      locationWarpScriptId,
      languageWarpScriptId,
      timeZoneWarpScriptId,
      fontAntiFingerprintingScriptId,
      screenResAntiFingerprintingScriptId,
      canvasAntiFingerprintingScriptId,
      audioAntiFingerprintingScriptId,
      fingerprintjsAntiFingerprintingScriptId,
    ],
  })

  // one by one to get the exclude matches, faster then individual calls to getRegisteredContentScripts
  const splitPersonalityScript = scripts.find(script => script.id === splitPersonalityScriptId)
  const workerBlockScript = scripts.find(script => script.id === workerBlockScriptId)
  const locationWarpScript = scripts.find(script => script.id === locationWarpScriptId)
  const languageWarpScript = scripts.find(script => script.id === languageWarpScriptId)
  const timeZoneWarpScript = scripts.find(script => script.id === timeZoneWarpScriptId)
  const fontAntiFingerprintingScript = scripts.find(
    script => script.id === fontAntiFingerprintingScriptId,
  )
  const screenResAntiFingerprintingScript = scripts.find(
    script => script.id === screenResAntiFingerprintingScriptId,
  )
  const canvasAntiFingerprintingScript = scripts.find(
    script => script.id === canvasAntiFingerprintingScriptId,
  )
  const audioAntiFingerprintingScript = scripts.find(
    script => script.id === audioAntiFingerprintingScriptId,
  )
  const fingerprintjsAntiFingerprintingScript = scripts.find(
    script => script.id === fingerprintjsAntiFingerprintingScriptId,
  )

  return {
    workerBlockScriptExcludeMatches: workerBlockScript?.excludeMatches,
    splitPersonalityScriptExcludeMatches: splitPersonalityScript?.excludeMatches,
    locationWarpScriptExcludeMatches: locationWarpScript?.excludeMatches,
    languageWarpScriptExcludeMatches: languageWarpScript?.excludeMatches,
    timeZoneWarpScriptExcludeMatches: timeZoneWarpScript?.excludeMatches,
    fontAntiFingerprintingScriptExcludeMatches: fontAntiFingerprintingScript?.excludeMatches,
    screenResAntiFingerprintingScriptExcludeMatches:
      screenResAntiFingerprintingScript?.excludeMatches,
    canvasAntiFingerprintingScriptExcludeMatches: canvasAntiFingerprintingScript?.excludeMatches,
    audioAntiFingerprintingScriptExcludeMatches: audioAntiFingerprintingScript?.excludeMatches,
    fingerprintjsAntiFingerprintingScriptExcludeMatches:
      fingerprintjsAntiFingerprintingScript?.excludeMatches,
  }
}

export const removeFromExludeScriptMatches = async (
  domain: string,
  isAllSubdomainsIncluded: boolean,
): Promise<void> => {
  const filter = (urlScheme: string): boolean => {
    return urlScheme !== toExcludeMatchesURL(domain, isAllSubdomainsIncluded)
  }

  const {
    workerBlockScriptExcludeMatches,
    languageWarpScriptExcludeMatches,
    locationWarpScriptExcludeMatches,
    splitPersonalityScriptExcludeMatches,
    timeZoneWarpScriptExcludeMatches,
    fontAntiFingerprintingScriptExcludeMatches,
    screenResAntiFingerprintingScriptExcludeMatches,
    canvasAntiFingerprintingScriptExcludeMatches,
    audioAntiFingerprintingScriptExcludeMatches,
    fingerprintjsAntiFingerprintingScriptExcludeMatches,
  } = await getAllExcludeMatches()

  if (workerBlockScriptExcludeMatches) {
    const newExcludeMatches = workerBlockScriptExcludeMatches.filter(filter)
    await updateScript({
      id: workerBlockScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (splitPersonalityScriptExcludeMatches) {
    const newExcludeMatches = splitPersonalityScriptExcludeMatches.filter(filter)
    await updateScript({
      id: splitPersonalityScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (locationWarpScriptExcludeMatches) {
    const newExcludeMatches = locationWarpScriptExcludeMatches.filter(filter)

    await updateScript({
      id: locationWarpScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (languageWarpScriptExcludeMatches) {
    const newExcludeMatches = languageWarpScriptExcludeMatches.filter(filter)

    await updateScript({
      id: languageWarpScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (timeZoneWarpScriptExcludeMatches) {
    const newExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(filter)

    await updateScript({
      id: timeZoneWarpScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (fontAntiFingerprintingScriptExcludeMatches) {
    const newExcludeMatches = fontAntiFingerprintingScriptExcludeMatches.filter(filter)

    await updateScript({
      id: fontAntiFingerprintingScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (screenResAntiFingerprintingScriptExcludeMatches) {
    const newExcludeMatches = screenResAntiFingerprintingScriptExcludeMatches.filter(filter)

    await updateScript({
      id: screenResAntiFingerprintingScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (canvasAntiFingerprintingScriptExcludeMatches) {
    const newExcludeMatches = canvasAntiFingerprintingScriptExcludeMatches.filter(filter)

    await updateScript({
      id: canvasAntiFingerprintingScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (audioAntiFingerprintingScriptExcludeMatches) {
    const newExcludeMatches = audioAntiFingerprintingScriptExcludeMatches.filter(filter)

    await updateScript({
      id: audioAntiFingerprintingScriptId,
      excludeMatches: newExcludeMatches,
    })
  }

  if (fingerprintjsAntiFingerprintingScriptExcludeMatches) {
    const newExcludeMatches = fingerprintjsAntiFingerprintingScriptExcludeMatches.filter(filter)

    await updateScript({
      id: fingerprintjsAntiFingerprintingScriptId,
      excludeMatches: newExcludeMatches,
    })
  }
}

export const addToExcludeScriptMatches = async (
  domain: string,
  isPrivacyFeaturesAllowed: boolean,
  isAllSubdomainsIncluded: boolean,
): Promise<void> => {
  const {
    workerBlockScriptExcludeMatches,
    languageWarpScriptExcludeMatches,
    locationWarpScriptExcludeMatches,
    splitPersonalityScriptExcludeMatches,
    timeZoneWarpScriptExcludeMatches,
    fontAntiFingerprintingScriptExcludeMatches,
    screenResAntiFingerprintingScriptExcludeMatches,
    canvasAntiFingerprintingScriptExcludeMatches,
    audioAntiFingerprintingScriptExcludeMatches,
    fingerprintjsAntiFingerprintingScriptExcludeMatches,
  } = await getAllExcludeMatches()

  const currentExcludeURL = toExcludeMatchesURL(domain, !isAllSubdomainsIncluded)
  const newExcludeURL = toExcludeMatchesURL(domain, isAllSubdomainsIncluded)

  // adding
  if (workerBlockScriptExcludeMatches) {
    const updatedExcludeMatches = workerBlockScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: workerBlockScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (splitPersonalityScriptExcludeMatches) {
    const updatedExcludeMatches = splitPersonalityScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: splitPersonalityScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (locationWarpScriptExcludeMatches) {
    const updatedExcludeMatches = locationWarpScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: locationWarpScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (languageWarpScriptExcludeMatches) {
    const updatedExcludeMatches = languageWarpScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: languageWarpScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (timeZoneWarpScriptExcludeMatches) {
    const updatedExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }
    await updateScript({
      id: timeZoneWarpScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (fontAntiFingerprintingScriptExcludeMatches) {
    const updatedExcludeMatches = fontAntiFingerprintingScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: fontAntiFingerprintingScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (screenResAntiFingerprintingScriptExcludeMatches) {
    const updatedExcludeMatches = screenResAntiFingerprintingScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: screenResAntiFingerprintingScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (canvasAntiFingerprintingScriptExcludeMatches) {
    const updatedExcludeMatches = canvasAntiFingerprintingScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: canvasAntiFingerprintingScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (audioAntiFingerprintingScriptExcludeMatches) {
    const updatedExcludeMatches = audioAntiFingerprintingScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: audioAntiFingerprintingScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }

  if (fingerprintjsAntiFingerprintingScriptExcludeMatches) {
    const updatedExcludeMatches = fingerprintjsAntiFingerprintingScriptExcludeMatches.filter(
      urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
    )

    if (isPrivacyFeaturesAllowed) {
      updatedExcludeMatches.push(newExcludeURL)
    }

    await updateScript({
      id: fingerprintjsAntiFingerprintingScriptId,
      excludeMatches: updatedExcludeMatches,
    })
  }
}
