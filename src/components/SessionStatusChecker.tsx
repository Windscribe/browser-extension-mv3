import { useEffect } from 'react'

import { useDispatch, useDispatchAlias } from 'state/hooks'
import { CHECK_SESSION_STATUS } from 'state/slices/session'

const SessionStatusChecker: React.FC = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  useEffect(() => {
    const cb = async () => {
      await dispatchAlias(CHECK_SESSION_STATUS)
    }
    cb()
  }, [dispatch, dispatchAlias])
  return <></>
}

export default SessionStatusChecker
