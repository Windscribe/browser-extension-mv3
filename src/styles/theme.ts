import type { Theme } from 'theme-ui'

import { rawColors } from './colors'
import { zIndices } from './zIndices'

export const theme: Theme = {
  rawColors,
  zIndices,
  styles: {
    root: {
      body: {
        fontSize: '14px',
      },
      width: '324px',
      // minHeight: '298px',
      height: 'auto',
      backgroundColor: 'white',
    },
  },
  config: {
    initialColorModeName: 'dark',
  },
  links: {
    primary: {
      textDecoration: 'none',
      color: 'secondaryText',
      '&:hover': { color: 'primaryText' },
    },
  },
  buttons: {
    simple: {
      cursor: 'pointer',
      backgroundColor: 'transparent',
      padding: 0,
      textAlign: 'left',
    },
    circle: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      color: 'primaryText',
      backgroundColor: 'foreground',
      padding: 0,
    },
    rounded: {
      cursor: 'pointer',
      borderRadius: '20px',
    },
    rectangle: {
      cursor: 'pointer',
      width: '260px',
      height: '48px',
      pt: '16px',
      px: '16px',
      pb: '15px',
      borderRadius: '6px',
      ':hover': {
        backgroundColor: 'white',
        color: 'softBlack',
        div: {
          color: 'background',
        },
        span: {
          color: 'background',
        },
        svg: {
          fill: 'background',
        },
      },
    },
    menu: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      padding: '0 16px 0 0',
      width: '100%',
      alignItems: 'center',
      height: '48px',
      border: '2px',
      borderBottomColor: 'border',
      borderBottomStyle: 'solid',
      fontWeight: 600,
      color: 'secondaryText',
      '&:hover': {
        color: 'primaryText',
        '& > svg': {
          fill: 'primaryText',
        },
      },
    },
  },
  forms: {
    label: {
      width: 'auto',
    },
    input: {
      height: '40px',
      backgroundColor: 'foreground',
      color: 'primaryText',
      border: '0',
      px: '16px',
      '&:focus': {
        borderColor: 'primary',
        outline: 'none',
      },
      '&:-webkit-autofill': {
        WebkitTextFillColor: 'primaryText',
      },
    },
  },
}
