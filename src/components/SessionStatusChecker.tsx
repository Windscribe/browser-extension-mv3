import { useEffect } from 'react'

import { useDispatch, useDispatchAlias } from 'state/hooks'
import { CHECK_SESSION_STATUS } from 'state/slices/session'
import { setCurrentIp } from 'state/slices/proxy'
import { checkIp } from 'services'

const SessionStatusChecker: React.FC = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  useEffect(() => {
    const cb = async () => {
      await dispatchAlias(CHECK_SESSION_STATUS)
      const currentIp = await checkIp()
      dispatch(setCurrentIp(currentIp))
    }
    cb()
  }, [dispatch, dispatchAlias])
  return <></>
}

export default SessionStatusChecker
