import { useSelector } from 'state/hooks'
import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'components/types'

const Home: ThemeUiElement = () => {
  const sessionData = useSelector(state => state.session.data)

  return <Box sx={{ color: 'white', lineBreak: 'anywhere' }}>{JSON.stringify(sessionData)}</Box>
}

export default Home
