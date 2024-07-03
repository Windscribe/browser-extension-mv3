import { languageWarpScriptId, locationWarpScriptId, timeZoneWarpScriptId } from './constants'

type ScriptType =
  | typeof languageWarpScriptId
  | typeof locationWarpScriptId
  | typeof timeZoneWarpScriptId

export const getBundleNamePostFix = (scriptType: ScriptType): string => {
  switch (scriptType) {
    case 'languageWarpScript':
      return 'lnw'
    case 'locationWarpScript':
      return 'lcw'
    case 'timeZoneWarpScript':
      return 'tzw'
  }
}
