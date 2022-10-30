import React from 'react'
import { useSelector } from 'react-redux'
import AppSelectors from 'store/app/app.selectors'
import CreateSessionDialog from './session/CreateSessionDialog'

export const Dialog = {
  SESSION_CREATE: 'SESSION_CREATE'
}

const DialogsRenderer = () => {

  // Hooks //

  const dialog = useSelector(AppSelectors.dialog)

  // Rendering //

  const renderDialog = () => {
    switch (dialog) {
      case Dialog.SESSION_CREATE: {
        return (
          <CreateSessionDialog />
        )
      }
      default: {
        return null
      }
    }
  }

  const dialogRender = renderDialog()

  if (dialogRender) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {dialogRender}
      </div>
    )
  }
  return null
}

export default DialogsRenderer
