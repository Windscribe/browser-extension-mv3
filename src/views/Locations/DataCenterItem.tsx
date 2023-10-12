import { useState } from 'react'
import { Text, Flex, Button, Box, type ButtonProps } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { selectLocationByDataCenterId } from 'state/slices/servers'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import {
  addLocationToFavorite,
  removeLocationFromFavorite,
  selectIsInFavorite,
} from 'state/slices/favoriteLocations'
import { useDispatch, useSelector } from 'state/hooks'
import { useGoTo } from 'services/navigation'
import { type DataCenter } from 'api/types'
import { type ThemeUiElement } from 'utils/types'
import { IconButton } from 'components'
import { addOverlay } from 'state/slices/overlay'
import { useWindowOpening } from 'components/hooks'
import sendMessage from 'services/runtime/sendMessage'

import HeartIcon from 'assets/img/heart.svg'
import HeartBreakIcon from 'assets/img/heartBreak.svg'
import HeartOutlineIcon from 'assets/img/heartOutline.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import CheckmarkIcon from 'assets/img/checkmark.svg'
import StarIcon from 'assets/img/star.svg'

type DataCenterItem = ButtonProps & {
  isPremium?: boolean
  dataCenter: DataCenter
  isFavorite?: boolean
}

const DataCenterItem: ThemeUiElement<DataCenterItem> = ({
  isPremium,
  dataCenter,
  isFavorite = false,
}) => {
  const dispatch = useDispatch()
  const goToHome = useGoTo('Home')
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const isInFavorite = useSelector(s => selectIsInFavorite(s, dataCenter.id))
  const location = useSelector(s => selectLocationByDataCenterId(s, dataCenter.id))
  const locationLoad = useSelector(s => s.locationLoad)
  const autopilotSelected = useSelector(s => s.autopilot.autopilotSelected)

  const [showBrokenHeart, setShowBrokenHeart] = useState(false)

  const { openWindowUsingTempSession } = useWindowOpening()

  const showPro = !isPremium && dataCenter.pro

  const handleClick = async (dataCenter: DataCenter) => {
    if (showPro) {
      await openWindowUsingTempSession('upgrade?pcpid=upgrade_ext1')
    } else if (!dataCenter.hosts || dataCenter.hosts.length === 0) {
      dispatch(addOverlay('locationDown'))
    } else {
      location && dispatch(setCurrentLocation(location))
      goToHome()
      dispatch(setCurrentDataCenter(dataCenter))
      dispatch(setAutopilotSelected(false))
      await sendMessage({ what: 'connectProxy', hosts: dataCenter.hosts })
    }
  }

  const handleHeartIconClick: React.MouseEventHandler = async e => {
    e.stopPropagation()
    isInFavorite
      ? await dispatch(removeLocationFromFavorite(dataCenter.id))
      : await dispatch(addLocationToFavorite(dataCenter))
  }

  const handleMouseEnter = () => setShowBrokenHeart(true)

  const handleMouseLeave = () => setShowBrokenHeart(false)

  const getUsageColor = (percentage: number) => {
    if (showPro) return 'transparent'
    if (percentage < 50) return 'neonGreen'
    if (percentage < 75) return 'lemonYellow'
    return 'rubyRed'
  }

  const currentlySelected = currentDataCenter?.id === dataCenter.id && !autopilotSelected

  return (
    <>
      <Flex
        id={`${dataCenter.id}`}
        key={dataCenter.id}
        as="li"
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px',
          pr: '16px',
          borderBottomWidth: '2px',
          borderBottomColor: 'border',

          borderBottomStyle: 'solid',
          listStyleType: 'none',
        }}
      >
        {!showPro ? (
          <IconButton
            data-testid="heart-icon-button"
            onClick={handleHeartIconClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ height: '16px', minWidth: '16px', mr: '24px', p: 0 }}
          >
            <HeartButtonIcon {...{ showBrokenHeart, isInFavorite }} />
          </IconButton>
        ) : null}
        <Button
          onClick={() => handleClick(dataCenter)}
          variant="simple"
          sx={{
            py: '16px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            color: currentlySelected ? 'primaryText' : 'secondaryText',
            alignItems: 'center',
            position: 'relative',
            transition: 'color 0.3s',
            'svg > path': {
              transition: 'fill 0.3s',
            },
            span: {
              transition: 'opacity 0.3s, visibility 0.3s',
            },
            ':hover': {
              color: 'primaryText',
              'svg > *': {
                fill: 'primaryText',
              },
              div: {
                opacity: 1,
                visibility: 'visible',
              },
            },
          }}
        >
          <Flex sx={{ alignItems: 'center', minWidth: 'auto' }}>
            {showPro ? (
              <StarIcon sx={{ height: '16px', mr: '24px', p: 0, fill: 'secondaryText' }} />
            ) : null}
            <Box sx={{ fontWeight: '600', mr: '4px' }} data-testid="data-center-city">
              {dataCenter.city}
            </Box>
            <Box sx={{ fontWeight: '400', whiteSpace: 'nowrap' }} data-testid="data-center-nick">
              {dataCenter.nick}
            </Box>
          </Flex>
          {showPro ? (
            <Flex
              sx={{
                visibility: 'hidden',
                opacity: 0,
                position: 'absolute',
                right: '0',
                transition: '0.3s',
              }}
            >
              <Box
                sx={{
                  width: '60px',
                  backgroundImage: t => `
                    linear-gradient(
                      to right,
                      ${alpha(`${isFavorite ? 'background' : 'foreground'}`, 0)(t)},
                      ${alpha(`${isFavorite ? 'background' : 'foreground'}`, 1)(t)}
                    )
                  `,
                }}
              />
              <Text
                sx={{
                  fontWeight: '600',
                  backgroundColor: isFavorite ? 'background' : 'foreground',
                }}
              >
                UPGRADE
              </Text>
            </Flex>
          ) : (
            <>
              {currentlySelected ? (
                <CheckmarkIcon
                  data-testid="checkmark-icon"
                  sx={{
                    fill: 'primaryText',
                  }}
                />
              ) : (
                <ArrowRightIcon
                  data-testid="arrow-right-icon"
                  sx={{
                    fill: 'secondaryText',
                  }}
                />
              )}
            </>
          )}
        </Button>
      </Flex>
      <Box
        sx={{
          mt: '-2px',
          height: '2px',
          width: `${dataCenter.health}%`,
          display: locationLoad ? 'block' : 'none',
        }}
        bg={getUsageColor(dataCenter.health)}
        opacity="0.5"
      />
    </>
  )
}

const HeartButtonIcon: React.FC<{ isInFavorite: boolean; showBrokenHeart: boolean }> = ({
  isInFavorite,
  showBrokenHeart,
}) => (
  <>
    {!isInFavorite ? (
      <HeartOutlineIcon
        sx={{
          fill: 'secondaryText',
          '&:hover': {
            fill: 'primaryText',
          },
        }}
      />
    ) : showBrokenHeart ? (
      <HeartBreakIcon
        sx={{
          fill: 'primaryText',
        }}
      />
    ) : (
      <HeartIcon />
    )}
  </>
)

export default DataCenterItem
