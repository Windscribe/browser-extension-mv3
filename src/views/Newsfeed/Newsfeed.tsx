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
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleItemClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number(e.currentTarget?.dataset?.id) || null

    // close if it's already expanded
    if (id === expandedId) {
      setExpandedId(null)
      return
    }

    id && (await dispatch(markNewsAsViewed(id)))
    setExpandedId(id)
  }

  return (
    <Box data-testid="newsfeed-page" bg="background">
      <Header title="News Feed" />
      <ScrollableBox>
        {notifications
          .sort((a, b) => b.date - a.date)
          .map(({ id, date, title, message }) => (
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
