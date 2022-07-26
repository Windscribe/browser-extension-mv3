export const rawColors = {
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
}

export type Colors = Exclude<keyof typeof rawColors, 'modes'>
