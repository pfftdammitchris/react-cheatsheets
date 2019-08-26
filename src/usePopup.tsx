import React from 'react'
import { isFunction } from './utils'

export interface UsePopupParams {
  context?: any
  timeout?: number
  onOpen?: (args?: any) => void
  onClose?: (args?: any) => any
}

export interface UsePopupReturnValues {
  context: any
  opened: boolean
  onOpen: (args?: any) => void
  onClose: (args?: any) => void
}

const usePopup = ({
  timeout = 3000,
  onOpen: onOpenProp,
  onClose: onCloseProp,
}: UsePopupParams): UsePopupReturnValues => {
  const [opened, setOpened] = React.useState(false)
  const [context, setContext] = React.useState({})
  const timeoutRef = React.useRef<any>()

  function onOpen({ context }: { context?: any } = {}) {
    if (!opened) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        onClose()
      }, timeout)
      if (context) setContext(context)
      setOpened(true)
      if (isFunction(onOpenProp)) onOpenProp()
    }
  }

  function onClose({ clear = false }: { clear?: boolean } = {}) {
    clearTimeout(timeoutRef.current)
    setOpened(false)
    if (clear) setContext({})
    if (isFunction(onCloseProp)) onCloseProp()
  }

  return {
    context,
    opened,
    onOpen,
    onClose,
  }
}

export default usePopup
