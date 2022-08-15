export const rawColors = {
  softBlack: '#020d1c',
  halfBlack: 'rgba(0, 0, 0, 0.5)',
  white: '#fff',
  halfWhite: 'rgba(255, 255, 255, 0.5)',
  lakeBlue: '#006aff',
  neonGreen: '#55ff8a',
  neonGreen70: 'rgba(49, 151, 91, 0.7)',
  bloodRed: '#FF3B3B',
  lowWhite: 'rgba(255, 255, 255, 0.1)',
  background: '#1a2432',
  foreground: 'rgba(216, 216, 216, 0.1)',
  primaryText: '#fff',
  secondaryText: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.05)',
  modes: {
    light: {
      background: '#fff',
      foreground: 'rgba(2, 13, 28, 0.1)',
      primaryText: 'softBlack',
      secondaryText: 'rgba(2, 13, 28, 0.5)',
      softText: 'white',
      border: 'rgba(2, 13, 28, 0.05)',
    },
  },
}

export type Colors = Exclude<keyof typeof rawColors, 'modes'>
