import { Box, Text, Flex } from 'theme-ui'

import HeartIcon from 'assets/img/heart-outline.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import CheckmarkIcon from 'assets/img/checkmark.svg'
import { setCurrentDataCenterById } from 'state/slices/servers'
import { useDispatch, useSelector } from 'state/hooks'
import { useGoTo } from 'services/navigation'

type LocationsListItemDetailsProps = {
  dataCentersIds?: number[]
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({ dataCentersIds }) => {
  const dispatch = useDispatch()
  const goToHome = useGoTo('Home')
  const currentDataCenterId = useSelector(s => s.servers.currentDataCenter?.id)
  //TODO rewrite to avoid rerendering
  const dataCenters = useSelector(s => dataCentersIds?.map(id => s.servers.dataCenters[id]))

  const handleClick: React.MouseEventHandler = e => {
    const dataCenterId = +e.currentTarget.id
    dispatch(setCurrentDataCenterById(dataCenterId))
    goToHome()
  }

  return (
    <>
      {dataCenters?.map(({ id, city, nick }) => (
        <Box
          id={`${id}`}
          key={id}
          as="li"
          onClick={handleClick}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '48px',
            padding: '16px 16px 16px 0px',

            color: `${currentDataCenterId === id ? 'primaryText' : 'secondaryText'}`,
            borderBottomWidth: '2px',
            borderBottomColor: 'border',
            borderBottomStyle: 'solid',
            transition: 'transform ease-in-out 0.2s',
            cursor: 'pointer',

            '&:hover': {
              color: 'primaryText',
              '& > svg': {
                fill: 'primaryText',
              },
            },
          }}
        >
          <Flex>
            <HeartIcon
              sx={{
                marginRight: '16px',
                fill: 'secondaryText',
              }}
            />
            <Text sx={{ fontWeight: '600' }}>{city}</Text>
            &nbsp;
            <Text sx={{ fontWeight: '400' }}>{nick}</Text>
          </Flex>
          {currentDataCenterId === id ? (
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
        </Box>
      ))}
    </>
  )
}

export default LocationsListItemDetails
