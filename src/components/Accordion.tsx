import React, { useState } from 'react'
import { Box } from 'theme-ui'

import Rectangle from './Rectangle'

export type AccordionSummaryPropsType = {
  isExpanded: boolean
}

export type AccordionDetailsPropsType = {
  isExpanded: boolean
}

type AccordionProps = {
  Summary: React.FC<AccordionSummaryPropsType>
  Details: React.FC<AccordionDetailsPropsType>
}

const Accordion: React.FC<AccordionProps> = ({ Summary, Details }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLocationClick: React.MouseEventHandler<HTMLDivElement> = () =>
    setIsExpanded(!isExpanded)

  return (
    <Box mb="16px">
      <Rectangle
        onClick={handleLocationClick}
        sx={{
          cursor: 'pointer',
          ...(isExpanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: '2px',
            borderBottomColor: 'border',
            borderBottomStyle: 'solid',
          }),
        }}
      >
        <Summary isExpanded={isExpanded} />
      </Rectangle>
      {isExpanded && (
        <Box
          data-testid="accordion-details-list"
          pb="16px"
          as="ul"
          sx={{
            paddingBottom: '16px',
            paddingLeft: '16px',
            backgroundColor: 'foreground',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          <Details isExpanded={isExpanded} />
        </Box>
      )}
    </Box>
  )
}

export default Accordion
