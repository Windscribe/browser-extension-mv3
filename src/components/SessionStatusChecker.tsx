import { useEffect } from 'react'

import { useDispatchAlias } from 'state/hooks'
import { CHECK_SESSION_STATUS } from 'state/slices/session'

const SessionStatusChecker: React.FC = () => {
  const dispatchAlias = useDispatchAlias()

  useEffect(() => {
    const cb = async () => {
      await dispatchAlias(CHECK_SESSION_STATUS)
    }
    cb()
  }, [dispatchAlias])
  return <></>
}

export default SessionStatusChecker
