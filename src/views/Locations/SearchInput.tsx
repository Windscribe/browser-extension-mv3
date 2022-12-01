import React, { useState, useRef, useEffect, memo } from 'react'
import { Box, Input, Button } from 'theme-ui'

import SearchIcon from 'assets/img/search.svg'
import CloseIcon from 'assets/img/closeWhitelist.svg'
import { type SearchInputProps, type EventHandler } from './types'

const SearchInput: React.FC<SearchInputProps> = memo(
  ({ onSearchInputChange, onSearchInputClose, focusInitKey }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const [focusInitString, setFocusInitString] = useState('')

    const handleIconClick: EventHandler<HTMLButtonElement> = () => setFocused(!focused)

    const handleBlur: EventHandler = e => {
      if (inputRef.current?.value === '') {
        setFocused(false)
        e.stopPropagation()
      }
    }

    const handleFocus: EventHandler<HTMLInputElement, React.FocusEvent<HTMLInputElement>> = e => {
      if (focusInitString.length > 0 && inputRef.current?.value === '') {
        inputRef.current.value = focusInitString
        onSearchInputChange(e)
      }
    }

    const handleTransitionEnd: EventHandler = () => {
      if (focused) {
        inputRef.current?.focus()
        return
      }
      if (inputRef.current?.value) {
        inputRef.current.value = ''
      }
      onSearchInputClose()
    }

    useEffect(() => {
      setFocused(!!focusInitKey)
      if (!focusInitKey) {
        setFocusInitString('')
      } else {
        setFocusInitString(prevStr => prevStr + focusInitKey)
      }
    }, [focusInitKey])

    return (
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            right: 0,
            width: '32px',
            position: 'absolute',
            transformOrigin: '100% 50%',
            transition: '250ms ease',
            ...(focused && {
              width: '244px',
            }),
          }}
        >
          <SearchIcon
            sx={{
              left: '8px',
              position: 'absolute',
              visibility: 'hidden',
              opacity: 0,
              zIndex: 1,
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'opacity 0.3s ease 0s',
              path: {
                fill: 'secondaryText',
              },
              ...(focused && {
                visibility: 'visible',
                opacity: 1,
              }),
            }}
          />
          <Input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onSearchInputChange}
            onTransitionEnd={handleTransitionEnd}
            sx={{
              width: 0,
              right: 0,
              padding: 0,
              height: '32px',
              position: 'absolute',
              borderRadius: '16px',
              fontWeight: 100,
              fontSize: '14px',
              backgroundColor: 'iconBgSolid',
              transition: '275ms ease',
              ...(focused && {
                width: '244px',
                padding: '0 32px',
              }),
            }}
          />
          <Button
            variant="circle"
            onClick={handleIconClick}
            sx={{
              transition: 'all 0.3s ease 0s',
              '&:hover': {
                svg: {
                  fill: 'primaryText',
                  path: {
                    fill: 'primaryText',
                  },
                },
              },
            }}
          >
            {focused ? (
              <CloseIcon
                sx={{
                  right: '4px',
                  position: 'absolute',
                  fill: 'secondaryText',
                }}
              />
            ) : (
              <SearchIcon
                sx={{
                  right: '8px',
                  position: 'absolute',
                  path: {
                    fill: 'secondaryText',
                  },
                }}
              />
            )}
          </Button>
        </Box>
      </Box>
    )
  },
)

export default SearchInput
