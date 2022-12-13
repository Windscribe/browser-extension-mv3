import { Text, Flex, Button, Box, type ButtonProps } from 'theme-ui'
import Highlighter from 'react-highlight-words'

import { selectLocationByDataCenterId } from 'state/slices/servers'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import {
  addLocationToFavorite,
  removeLocationFromFavorite,
  selectIsInFavorite,
} from 'state/slices/favoriteLocations'
import { connectProxy } from 'state/slices/proxy'
import { useDispatch, useSelector } from 'state/hooks'
import { useGoTo } from 'services/navigation'
import { type DataCenter } from 'api/types'
import { type ThemeUiElement } from 'utils/types'
import { IconButton } from 'components'

import HeartIcon from 'assets/img/heart.svg'
import HeartBreakIcon from 'assets/img/heartBreak.svg'
import HeartOutlineIcon from 'assets/img/heartOutline.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import CheckmarkIcon from 'assets/img/checkmark.svg'
import { useState } from 'react'

type DataCenterItem = ButtonProps & {
  dataCenter: DataCenter
  searchText?: string
}

const DataCenterItem: ThemeUiElement<DataCenterItem> = ({ dataCenter, searchText = '' }) => {
  const dispatch = useDispatch()
  const goToHome = useGoTo('Home')
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const isInFavorite = useSelector(s => selectIsInFavorite(s, dataCenter.id))
  const location = useSelector(s => selectLocationByDataCenterId(s, dataCenter.id))
  const [showBrokenHeart, setShowBrokenHeart] = useState(false)

  const handleClick = (dataCenter: DataCenter) => {
    location && dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))
    dispatch(setAutopilotSelected(false))
    // TODO dataCenter could not has hosts, maybe should use ovpn_x509 instead?
    dispatch(connectProxy(dataCenter.hosts))
    goToHome()
  }

  const handleHeartIconClick: React.MouseEventHandler = async e => {
    e.stopPropagation()
    isInFavorite
      ? await dispatch(removeLocationFromFavorite(dataCenter.id))
      : await dispatch(addLocationToFavorite(dataCenter))
  }

  const handleMouseEnter = () => setShowBrokenHeart(true)

  const handleMouseLeave = () => setShowBrokenHeart(false)

  return (
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
      <IconButton
        onClick={handleHeartIconClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ height: '16px', mr: '24px', p: 0 }}
      >
        <HeartButtonIcon {...{ showBrokenHeart, isInFavorite }} />
      </IconButton>
      <Button
        onClick={() => handleClick(dataCenter)}
        variant="simple"
        sx={{
          py: '16px',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          color: currentDataCenter?.id === dataCenter.id ? 'primaryText' : 'secondaryText',
          transition: 'transform ease-in-out 0.2s',
          '&:hover': {
            color: 'primaryText',
            '& > svg': {
              fill: 'primaryText',
            },
          },
        }}
      >
        <Box>
          <Text sx={{ fontWeight: '600' }}>
            <Highlighter
              data-testid="data-center-city"
              searchWords={[searchText]}
              textToHighlight={dataCenter.city}
            />
          </Text>
          &nbsp;
          <Text sx={{ fontWeight: '400' }}>
            <Highlighter
              data-testid="data-center-nick"
              searchWords={[searchText]}
              textToHighlight={dataCenter.nick}
            />
          </Text>
        </Box>
        {currentDataCenter?.id === dataCenter.id ? (
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
      </Button>
    </Flex>
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
          path: {
            scale: '0.4',
          },
        }}
      />
    ) : (
      <HeartIcon />
    )}
  </>
)

export default DataCenterItem
