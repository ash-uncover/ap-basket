import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import UsersSelectors from 'store/rest/users/users.selectors'
import AuthSelectors from 'store/auth/auth.selectors'

import { logout } from 'lib/helpers/rest/auth.rest.helper'

import {
  ShellBar,
} from '@uncover/fundamentals-react'

import AppSlice from 'store/app/app.slice'
import { Dialog } from './dialogs/Dialogs'

const AppHeader = () => {

  // Hooks

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const userId = useSelector(AuthSelectors.userId)
  const user = useSelector(UsersSelectors.user(userId))

  // Events

  const onOpenProfileDialog = () => {
    dispatch(AppSlice.actions.openDialog({
      dialog: Dialog.PROFILE_PROFILE
    }))
  }

  const onOpenSettingsDialog = () => {
    dispatch(AppSlice.actions.openDialog({
      dialog: Dialog.PROFILE_SETTINGS
    }))
  }

  const onSignOut = () => {
    logout(dispatch)
  }

  // Rendering

  return (
    <ShellBar
      logo='/images/sap-logo.png'
      logoAlt='AMSAP Basket'
      title='AMSAP Basket'
      profile={{
        name: `${user.data.firstName} ${user.data.lastName}`,
        initials: `${user.data.firstName.substring(0, 1)}${user.data.lastName.substring(0, 1)}`,
        menu: [
          {
            id: 'profile',
            text: t('app.header.user.menu.profile'),
            iconBefore: 'person-placeholder',
            onItemSelected: onOpenProfileDialog,
          },
          {
            id: 'settings',
            text: t('app.header.user.menu.settings'),
            iconBefore: 'action-settings',
            onItemSelected: onOpenSettingsDialog,
          },
          {
            id: 'logout',
            text: t('app.header.user.menu.signout'),
            iconBefore: 'log',
            onItemSelected: onSignOut,
          },
        ]
      }}
    />
  )
}

export default AppHeader
