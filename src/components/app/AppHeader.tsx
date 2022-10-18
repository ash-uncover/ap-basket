import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import ProfileDialog from 'components/app/profile/ProfileDialog'
import SettingsDialog from 'components/app/settings/SettingsDialog'

import {
  Shellbar,
} from 'fundamental-react'

import UsersSelectors from 'store/rest/users/users.selectors'
import AuthSelectors from 'store/auth/auth.selectors'

import './AppHeader.css'
import { logout } from 'lib/helpers/auth.helper'

const AppHeader = () => {

  // Hooks

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  const userId = useSelector(AuthSelectors.userId)
  const user = useSelector(UsersSelectors.user(userId))

  // Events

  const hideProfilePopover = () => {
    const popover = document.getElementById('fd-shellbar-profile-popover')
    if (popover) {
      popover.style.display = 'none'
    }
  }

  const onOpenProfileDialog = () => {
    setShowProfileDialog(true)
    hideProfilePopover()
  }
  const onCloseProfileDialog = () => {
    setShowProfileDialog(false)
  }

  const onOpenSettingsDialog = () => {
    setShowSettingsDialog(true)
    hideProfilePopover()
  }
  const onCloseSettingsDialog = () => {
    setShowSettingsDialog(false)
  }

  const onSignOut = () => {
    logout(dispatch)
  }

  // Rendering

  return (
    <>
      <Shellbar
        logo={<img alt='SAP' src='//unpkg.com/fundamental-styles/dist/images/sap-logo.png' />}
        productTitle='AMSAP Basket'
        profile={{
          userName: `${user.data.firstName} ${user.data.lastName}`,
          initials: `${user.data.firstName.substring(0, 1)}${user.data.lastName.substring(0, 1)}`
        }}
        profileMenu={[{
          name: t('app.header.user.menu.profile'),
          glyph: 'person-placeholder',
          callback: onOpenProfileDialog
        }, {
          name: t('app.header.user.menu.settings'),
          glyph: 'action-settings',
          callback: onOpenSettingsDialog
        }, {
          name: t('app.header.user.menu.signout'),
          glyph: 'log',
          callback: onSignOut
        }]}
      />
      {showProfileDialog ?
        <ProfileDialog
          onClose={onCloseProfileDialog}
        />
        : null}
      {showSettingsDialog ?
        <SettingsDialog
          onClose={onCloseSettingsDialog}
        />
        : null}
    </>
  )
}

export default AppHeader
