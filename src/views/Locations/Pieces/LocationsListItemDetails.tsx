import { useState } from 'react'
import { Box, Text, Flex } from 'theme-ui'

import HeartIcon from 'assets/img/heart-outline.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import CheckmarkIcon from 'assets/img/checkmark.svg'
import { type Datacenter } from '../types'

type LocationsListItemDetailsProps = {
  datacenters: Datacenter[]
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({ datacenters }) => {
  const [chosenId, setChosenId] = useState<number>()
  // TODO add dispatch action
  const handleClick: React.MouseEventHandler = e => setChosenId(+e.currentTarget.id)

  return (
    <>
      {datacenters.map(({ id, city, nick }) => (
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

            color: `${chosenId === id ? 'primaryText' : 'secondaryText'}`,
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
          {chosenId === id ? (
            <CheckmarkIcon
              sx={{
                fill: 'primaryText',
              }}
            />
          ) : (
            <ArrowRightIcon
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
