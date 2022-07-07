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
    white: '#fff',
    blue: '#006aff',
    green: '#55ff8a',
    yellow: '#ffef02',
    red: '#FF3B3B',
    modes: {
      light: {
        background: '#fff',
        foreground: 'rgba(2, 13, 28, 0.1)',
        primaryText: '#020d1c',
        secondaryText: '#rgba(255, 255, 255, 0.5)',
      },
    },
  },
}
