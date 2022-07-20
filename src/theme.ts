import type { Theme } from 'theme-ui'

export const theme: Theme = {
  config: {
    initialColorModeName: 'dark',
  },
  rawColors: {
    background: '#1a2432',
    foreground: '#d8d8d8',
    primaryText: '#fff',
    secondaryText: '#rgba(255, 255, 255, 0.5)',
    black: '#020d1c',
    white: '#fff',
    blue: '#006aff',
    green: '#55ff8a',
    yellow: '#ffef02',
    red: '#FF3B3B',
    modes: {
      light: {
        background: '#fff',
        foreground: 'rgba(2, 13, 28, 0.1)',
        primaryText: 'black',
        secondaryText: 'rgba(2, 13, 28 0.5)',
      },
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
      color: 'primaryText',
      backgroundColor: 'foreground',
    },
    rectangle: {
      cursor: 'pointer',
      borderRadius: '20px',
    },
  },
}
