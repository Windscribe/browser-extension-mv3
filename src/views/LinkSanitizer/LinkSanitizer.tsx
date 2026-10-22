import { useEffect, useRef, useState } from 'react'
import { Box, Textarea } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { Header, OptionBox, ToggleSwitch, ScrollableBox } from 'components'
import ToolTip from 'components/ToolTip'
import { useDispatch, useSelector } from 'state/hooks'
import {
  setLinkSanitizerCustomParams,
  toggleLinkSanitizerGroup,
} from 'state/slices/linkSanitizer'
import {
  enableUrlCleaner,
  disableUrlCleaner,
} from 'services/declarativeNetRequest/updateDynamicRules'
import { getPrivacyFeatureEnabledDomains } from 'utils/networkSpoofing'
import {
  DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
  LINK_SANITIZER_GROUP_IDS,
  LINK_SANITIZER_GROUPS,
  getLinkSanitizerRemoveParamsFromState,
  parseCustomParamsText,
} from 'utils/linkSanitizerParams'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import UrlCleanerIcon from 'assets/img/link.svg'
import { addOverlay } from 'state/slices/overlay'
import { useIsUblockLiteStatus } from 'services/detectUblock'

const LinkSanitizer: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const urlCleanerEnabled = useSelector(s => s.urlCleanerEnabled)
  const linkSanitizer = useSelector(s => s.linkSanitizer) ?? {
    enabledGroups: DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
    customParams: [],
  }
  const allowList = useSelector(s => s.allowlist)
  const showUblockWarningAtLinkSanitizer = useSelector(
    s => s.blocker.showUblockWarningAtLinkSanitizer !== false,
  )
  const ublockStatus = useIsUblockLiteStatus()
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)
  const [customParamsDraft, setCustomParamsDraft] = useState(linkSanitizer.customParams.join(', '))
  const disabledMessage = getLocalizedMessage(
    'wsext_not_available_when_link_sanitizer_disabled',
    currentLanguage,
  )
  const customParamsDraftRef = useRef(customParamsDraft)
  const urlCleanerEnabledRef = useRef(urlCleanerEnabled)
  const linkSanitizerRef = useRef(linkSanitizer)
  const allowListRef = useRef(allowList)
  const lastSavedCustomParamsRef = useRef(linkSanitizer.customParams.join(','))

  customParamsDraftRef.current = customParamsDraft
  urlCleanerEnabledRef.current = urlCleanerEnabled
  linkSanitizerRef.current = linkSanitizer
  allowListRef.current = allowList

  const persistCustomParams = (shouldUpdateDraft: boolean) => {
    if (!urlCleanerEnabledRef.current) {
      return
    }

    const customParams = parseCustomParamsText(customParamsDraftRef.current)
    const serialized = customParams.join(',')

    if (shouldUpdateDraft) {
      setCustomParamsDraft(customParams.join(', '))
    }

    if (serialized === lastSavedCustomParamsRef.current) {
      return
    }

    lastSavedCustomParamsRef.current = serialized

    if (shouldUpdateDraft) {
      showReloadAlert(true)
    }

    dispatch(setLinkSanitizerCustomParams(customParams))
    void enableUrlCleaner(
      getPrivacyFeatureEnabledDomains(allowListRef.current),
      getLinkSanitizerRemoveParamsFromState({
        ...linkSanitizerRef.current,
        customParams,
      }),
    )
  }

  // Save whatever is in the field if this page unmounts before blur, e.g. Back.
  useEffect(() => {
    return () => {
      persistCustomParams(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ublockStatus.status === 'enabled' && showUblockWarningAtLinkSanitizer) {
      dispatch(addOverlay('ublockLinkSanitizer'))
    }
  }, [dispatch, ublockStatus.status, showUblockWarningAtLinkSanitizer])

  const syncRules = async (isEnabled: boolean, nextLinkSanitizer = linkSanitizer) => {
    const dontCleanDomains = getPrivacyFeatureEnabledDomains(allowList)

    if (!isEnabled) {
      await disableUrlCleaner()
      return
    }

    await enableUrlCleaner(
      dontCleanDomains,
      getLinkSanitizerRemoveParamsFromState(nextLinkSanitizer),
    )
  }

  return (
    <Box data-testid="link-sanitizer-page" bg="background">
      <Header
        title={getLocalizedMessage('wsext_link_sanitizer', currentLanguage)}
        {...{ shouldShowReloadAlert, showReloadAlert }}
      />
      <ScrollableBox>
        {LINK_SANITIZER_GROUP_IDS.map(groupId => {
          const group = LINK_SANITIZER_GROUPS[groupId]

          return (
            <OptionBox
              key={groupId}
              Icon={UrlCleanerIcon}
              title={getLocalizedMessage(group.titleKey, currentLanguage)}
              subTitle={getLocalizedMessage(group.descriptionKey, currentLanguage)}
            >
              <ToggleSwitch
                disabled={!urlCleanerEnabled}
                message={disabledMessage}
                onChange={async () => {
                  showReloadAlert(true)
                  const nextEnabledGroups = linkSanitizer.enabledGroups.includes(groupId)
                    ? linkSanitizer.enabledGroups.filter(id => id !== groupId)
                    : [...linkSanitizer.enabledGroups, groupId]
                  dispatch(toggleLinkSanitizerGroup(groupId))
                  await syncRules(urlCleanerEnabled, {
                    ...linkSanitizer,
                    enabledGroups: nextEnabledGroups,
                  })
                }}
                checked={linkSanitizer.enabledGroups.includes(groupId)}
              />
            </OptionBox>
          )
        })}

        <Box
          sx={{
            borderRadius: '8px',
            border: '1px',
            borderColor: 'foreground',
            borderStyle: 'solid',
            width: '100%',
            display: 'inline-block',
            mb: '16px',
          }}
        >
          <Box
            sx={{
              pl: '16px',
              pr: '16px',
              pt: '12px',
              pb: '12px',
              borderRadius: '8px',
              backgroundColor: 'foreground',
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                color: 'primaryText',
                mb: '8px',
              }}
            >
              {getLocalizedMessage('wsext_link_sanitizer_custom_params', currentLanguage)}
            </Box>
            <ToolTip
              message={disabledMessage}
              sx={{ display: urlCleanerEnabled ? 'none' : 'block' }}
            >
              <Textarea
                data-testid="link-sanitizer-custom-params"
                disabled={!urlCleanerEnabled}
                value={customParamsDraft}
                placeholder={getLocalizedMessage(
                  'wsext_link_sanitizer_custom_params_placeholder',
                  currentLanguage,
                )}
                onChange={event => {
                  setCustomParamsDraft(event.target.value)
                }}
                onBlur={() => {
                  persistCustomParams(true)
                }}
                sx={{
                  minHeight: '72px',
                  resize: 'vertical',
                  backgroundColor: 'background',
                  color: 'primaryText',
                  border: '1px solid transparent',
                  px: '16px',
                  py: '8px',
                  fontSize: '12px',
                  opacity: urlCleanerEnabled ? 1 : 0.3,
                  cursor: urlCleanerEnabled ? 'text' : 'not-allowed',
                  '::placeholder': {
                    color: 'secondaryText',
                  },
                  '&:focus': {
                    border: '1px solid',
                    borderColor: 'border',
                    outline: 'none',
                  },
                }}
              />
            </ToolTip>
          </Box>
          <Box
            sx={{
              py: '8px',
              pl: '16px',
              pr: '10px',
              fontSize: '12px',
              color: 'secondaryText',
            }}
          >
            {getLocalizedMessage('wsext_link_sanitizer_custom_params_description', currentLanguage)}
          </Box>
        </Box>
      </ScrollableBox>
    </Box>
  )
}

export default LinkSanitizer
