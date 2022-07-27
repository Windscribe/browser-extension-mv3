import { useSelector, useDispatch } from 'state/hooks'
import { Box } from 'theme-ui'

export default () => {
  const sessionData = useSelector(state => state.session.data)

  return <Box sx={{ color: 'white', lineBreak: 'anywhere' }}>{JSON.stringify(sessionData)}</Box>
}
