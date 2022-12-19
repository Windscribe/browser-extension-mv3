import { useEffect, useState } from 'react'

import { getCurrentTabHostname } from 'services/currentTab'

export default (): string => {
  const [currentTabHostname, setCurrentTabHostname] = useState('')

  useEffect(() => {
    const defineCurrentTabHostname = async () => {
      const url = await getCurrentTabHostname()
      setCurrentTabHostname(url)
    }
    defineCurrentTabHostname()
  }, [])

  return currentTabHostname
}
