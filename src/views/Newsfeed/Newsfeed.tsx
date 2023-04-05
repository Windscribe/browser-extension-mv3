import { Box } from 'theme-ui'

import { useDispatch, useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import { Header, ScrollableBox } from 'components'
import NewsfeedItem from './NewsfeedItem'
import { markNewsAsViewed } from 'state/slices/newsfeed'
import React, { useState } from 'react'

const Newsfeed: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(s => s.newsfeed.notifications)
  const viewedNewsIds = useSelector(s => s.newsfeed.viewedNewsIds)
  const [expandedId, setExpandedId] = useState<number>(-1)

  const handleItemClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    let id = Number(e.currentTarget?.dataset?.id) || -1

    // close if it's already expanded
    if (id === expandedId) {
      id = -1
    }

    ~id && (await dispatch(markNewsAsViewed(id)))
    setExpandedId(id)
  }

  return (
    <Box data-testid="newsfeed-page" bg="background">
      <Header title="News Feed" />
      <ScrollableBox>
        {notifications.map(({ id, date, title, message }) => (
          <NewsfeedItem
            key={id}
            isViewed={viewedNewsIds.includes(id)}
            isExpanded={expandedId === id}
            {...{ id, date, title, message, handleItemClick }}
          />
        ))}
      </ScrollableBox>
    </Box>
  )
}

export default Newsfeed
