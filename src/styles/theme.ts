import type { Theme } from 'theme-ui'

import { rawColors } from './colors'

export const theme: Theme = {
  rawColors,
  styles: {
    root: {
      body: {
        fontSize: '14px',
      },
      width: '324px',
      minHeight: '298px',
      height: 'auto',
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
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      color: 'primaryText',
      backgroundColor: 'foreground',
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
        color: 'black',
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
  },
  forms: {
    label: {
      fontWeight: '600',
      color: 'primaryText',
      mt: '16px',
      mb: '8px',
      mr: '16px',
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
