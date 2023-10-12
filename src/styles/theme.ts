import type { Theme } from 'theme-ui'

import { colors } from './colors'
import { zIndices } from './zIndices'

export const theme: Theme = {
  config: {
    /*
     We can't change a theme by changing initialColorModeName value here,
     because color mode persists in local storage.
     To change a theme we need to use a special hook, e.g.
     const [colorMode, setColorMode] = useColorMode()
    */
    initialColorModeName: 'dark',
    /*
    The useColorSchemeMediaQuery option initializes a color mode
    based on the prefers-color-scheme media query. 
    It makes extension color theme be dependent on OS theme settings,
    so we set this option to false.
    */
    useColorSchemeMediaQuery: false,
  },
  colors,
  zIndices,
  styles: {
    root: {
      body: {
        fontSize: '14px',
      },
      mark: {
        backgroundColor: 'warmGrey',
        color: 'primaryText',
      },
      height: 'auto',
      backgroundColor: 'white',
    },
  },
  links: {
    primary: {
      textDecoration: 'none',
      color: 'secondaryText',
      transition: '0.3s',
      '&:hover': { color: 'primaryText' },
    },
    optionBlock: {
      textDecoration: 'none',
      display: 'flex',
      borderRadius: '8px',
      border: '1px',
      borderColor: 'foreground',
      borderStyle: 'solid',
      color: 'secondaryText',
      fontSize: '12px',
      alignItems: 'center',
      px: '16px',
      height: '48px',
      justifyContent: 'space-between',
      transition: '0.3s',
      'svg > path': {
        transition: '0.3s',
      },
      ':hover': {
        color: 'primaryText',
      },
      '&:hover > svg > path': {
        fill: 'primaryText',
      },
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
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
    rectangle: {
      cursor: 'pointer',
      width: '260px',
      height: '48px',
      pt: '16px',
      px: '16px',
      pb: '15px',
      borderRadius: '6px',
      // TODO: fix all this repeated code
      transition: '0.3s',
      div: {
        transition: '0.3s',
      },
      span: {
        transition: '0.3s',
      },
      svg: {
        transition: '0.3s',
      },
      ':hover': {
        backgroundColor: 'primaryText',
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
    debug: {
      cursor: 'pointer',
      backgroundColor: 'lakeBlue',
      color: 'primarytext',
      ':hover': {
        backgroundColor: 'white',
        color: 'black',
      },
    },
    option: {
      cursor: 'pointer',
      backgroundColor: 'transparent',
      padding: 0,
      color: 'secondaryText',
      ':hover': {
        color: 'primaryText',
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
      border: '1px solid transparent',
      px: '16px',
      '&:focus': {
        border: '1px solid',
        borderColor: 'border',
        outline: 'none',
      },
    },
  },
  text: {
    error: {
      color: 'rubyRed',
    },
    subheader: {
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'secondaryText',
      lineHeight: '1.33',
      letterSpacing: '3px',
    },
  },
}
