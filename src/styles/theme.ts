import type { Theme } from 'theme-ui'

export const theme: Theme = {
  styles: {
    root: {
      body: {
        fontSize: '14px',
      },
      width: '324px',
      height: '298px',
    },
  },
  config: {
    initialColorModeName: 'dark',
  },
  rawColors: {
    black: '#020d1c',
    white: '#fff',
    blue: '#006aff',
    green: '#55ff8a',
    yellow: '#ffef02',
    red: '#FF3B3B',
    warmgrey: '#777',
    lowwhite: 'rgba(255, 255, 255, 0.1)',
    background: '#1a2432',
    foreground: 'rgba(216, 216, 216, 0.1)',
    primaryText: '#fff',
    secondaryText: 'rgba(255, 255, 255, 0.5)',
    softText: 'black',
    border: 'rgba(255, 255, 255, 0.05)',
    modes: {
      light: {
        background: '#fff',
        foreground: 'rgba(2, 13, 28, 0.1)',
        primaryText: 'black',
        secondaryText: 'rgba(2, 13, 28 0.5)',
        softText: 'white',
        border: 'rgba(2, 13, 28, 0.05)',
      },
    },
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
