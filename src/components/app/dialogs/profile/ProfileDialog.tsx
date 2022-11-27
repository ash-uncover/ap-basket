import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import AuthSelectors from 'store/auth/auth.selectors'
import UsersSelectors from 'store/rest/users/users.selectors'

import AppSlice from 'store/app/app.slice'

import {
  Avatar,
  Button,
  ButtonDesigns,
  Dialog,
  FormInput,
} from '@uncover/fundamentals-react'

const ProfileDialog = () => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)
  const user = useSelector(UsersSelectors.user(userId))

  // Events //

  const onClose = () => {
    dispatch(AppSlice.actions.closeDialog())
  }

  // Rendering //

  return (
    <Dialog
      title={t('app.profile.dialog.title')}
      footer={{
        right: [(
          <Button
            design={ButtonDesigns.EMPHASIZED}
            text={t('OK')}
            onClick={onClose}
          />
        )]
      }}
    >
      <div className='fd-dialog__content-centered'
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Avatar
          circle
          label={`${user.data.firstName} ${user.data.lastName}`}
          initials={`${user.data.firstName.substring(0, 1)}${user.data.lastName.substring(0, 1)}`}
          size='xl'
        />
      </div>

      <div
        className='fd-form-group'
        style={{
          padding: '0 2rem'
        }}>
        <FormInput
          label={t('app.profile.dialog.fields.firstName')}
          readOnly
          value={user.data.firstName}
        />
        <FormInput
          label={t('app.profile.dialog.fields.lastName')}
          readOnly
          value={user.data.lastName}
        />
        <FormInput
          label={t('app.profile.dialog.fields.email')}
          readOnly
          value={user.data.email}
        />
      </div>

    </Dialog>
  )
}

export default ProfileDialog
