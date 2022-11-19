import React from 'react'
import { useSelector } from 'react-redux'
import AppSelectors from 'store/app/app.selectors'
import ProfileDialog from './profile/ProfileDialog'
import CreateSessionDialog from './session/CreateSessionDialog'
import SettingsDialog from './settings/SettingsDialog'

export const Dialog = {
  PROFILE_PROFILE: 'PROFILE_PROFILE',
  PROFILE_SETTINGS: 'PROFILE_SETTINGS',
  SESSION_CREATE: 'SESSION_CREATE',
}

const DialogsRenderer = () => {

  // Hooks //

  const dialog = useSelector(AppSelectors.dialog)
  const dialogParams = useSelector(AppSelectors.dialogParams)

  // Rendering //

  const renderDialog = () => {
    switch (dialog) {
      case Dialog.PROFILE_PROFILE: return <ProfileDialog {...dialogParams} />
      case Dialog.PROFILE_SETTINGS: return <SettingsDialog {...dialogParams} />
      case Dialog.SESSION_CREATE: return <CreateSessionDialog {...dialogParams} />
      default: return null
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
          zIndex: 100,
        }}
      >
        {dialogRender}
      </div>
    )
  }
  return null
}

export default DialogsRenderer
