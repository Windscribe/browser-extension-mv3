import type { Theme } from 'theme-ui'

export const theme: Theme = {
  config: {
    initialColorModeName: 'dark',
  },
  colors: {
    black: '#020d1c',
    offblack: '#020d1ce6',
    halfblack: 'rgba(2, 13, 28, 0.5)',
    quarterblack: 'rgba(2, 13, 28, 0.25)',
    microblack: 'rgba(2, 13, 28, 0.1)',
    nanoblack: 'rgba(2, 13, 28, 0.05)',
    white: '#ffffff',
    offwhite: '#ffffffe6',
    halfwhite: 'rgba(255, 255, 255, 0.5)',
    quarterwhite: 'rgba(255, 255, 255, 0.25)',
    microwhite: 'rgba(255, 255, 255, 0.1)',
    nanowhite: 'rgba(255, 255, 255, 0.05)',
    darkgrey: '#1a2432',
    halfdarkgrey: 'rgba(255, 255, 255, 0.08)',
    green: '#55ff8a',
    lightGreen: 'rgba(49, 151, 91, 0.7)',

    trueblack: 'rgba(0, 0, 0)',
    truehalfblack: 'rgba(0, 0, 0, 0.5)',
    truemicroblack: 'rgba(0, 0, 0, 0.15)',
    truenanoblack: 'rgba(0, 0, 0, 0.08)',

    lightblue: '#a0feda',
    orange: '#ff8e00',
    primary: '#006aff',
    primarylight: '#006affc0',
    redLight: '#ff3b3bc0',
    red: '#ff3b3b',
    yellow: '#ffe600',
    purple: '#9013FE',
    modes: {
      light: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
  },
}
