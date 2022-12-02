import type { CSSObject, ColorModesScale } from 'theme-ui'

const linkOutLight = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4gICAgPHBhdGggZmlsbD0iIzAyMEQxQyIgZmlsbC1vcGFjaXR5PSIuNSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNyAuMDYydjIuMDIxQTYuMDAyIDYuMDAyIDAgMCAwIDggMTRhNi4wMDIgNi4wMDIgMCAwIDAgNS45MTctNWgyLjAyMUE4LjAwMSA4LjAwMSAwIDAgMSAwIDggOC4wMDEgOC4wMDEgMCAwIDEgNyAuMDYyek0xNiAwdjdoLTJWMy40MTRsLTYgNkw2LjU4NiA4bDYtNkg5VjBoN3oiLz48L3N2Zz4=`
const linkOutDark = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03IC4wNjJ2Mi4wMjFBNi4wMDIgNi4wMDIgMCAwIDAgOCAxNGE2LjAwMiA2LjAwMiAwIDAgMCA1LjkxNy01aDIuMDIxQTguMDAxIDguMDAxIDAgMCAxIDAgOCA4LjAwMSA4LjAwMSAwIDAgMSA3IC4wNjJ6TTE2IDB2N2gtMlYzLjQxNGwtNiA2TDYuNTg2IDhsNi02SDlWMGg3eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsLW9wYWNpdHk9Ii41Ii8+Cjwvc3ZnPgo=`

const getLinkOutIcon = (isDarkTheme: boolean): string =>
  `url(${isDarkTheme ? linkOutDark : linkOutLight})`

export default (isDark: boolean, colors?: ColorModesScale): CSSObject => ({
  p: {
    lineHeight: '20px',
    margin: 0,
  },

  '& a:link, a:visited': {
    color: `${colors?.secondaryText}`,
  },

  br: {
    display: 'block',
    my: '8px',
    mx: 0,
    content: '""',
  },

  '& a.ncta': {
    display: 'block',
    height: '40px',
    padding: '0 12px 0 28px',
    lineHeight: '38px',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '16px',
    borderRadius: '20px',
    border: `solid 2px ${colors?.secondaryText}`,
    color: `${colors?.primaryText}`,
  },

  '& .ncta:after': {
    float: 'right',
    position: 'relative',
    top: '3.5px',
    content: getLinkOutIcon(isDark),
  },
})
