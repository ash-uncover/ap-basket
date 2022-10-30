import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Button,
  Dialog,
  FormGroup,
  FormInput,
  FormItem,
  FormLabel,
} from 'fundamental-react'

import AuthSelectors from 'store/auth/auth.selectors'
import UsersSelectors from 'store/rest/users/users.selectors'

import './ProfileDialog.css'

const ProfileDialog = ({
  show,
  onClose
}) => {

  // Hooks //

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)
  const user = useSelector(UsersSelectors.user(userId))

  // Events //

  // Rendering //

  return (
    <Dialog
      className='profile-dialog'
      actions={[(
        <Button
          option='emphasized'
          onClick={onClose}
        >
          {t('OK')}
        </Button>
      )]}
      show={show}
      title={t('app.profile.dialog.title')}
    >
      <div className='fd-dialog__content-centered'
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Avatar
          circle
          label={`${user.data.firstName} ${user.data.lastName}`}
          size='xl'
        >
          {`${user.data.firstName.substring(0, 1)}${user.data.lastName.substring(0, 1)}`}
        </Avatar>
      </div>

      <FormGroup>
        <FormItem isHorizontal>
          <FormLabel htmlFor='userFirstName'>
            {t('app.profile.dialog.fields.firstName')}
          </FormLabel>
          <FormInput
            id='userFirstName'
            value={user.data.firstName}
          />
        </FormItem>
      </FormGroup>

      <FormGroup>
        <FormItem isHorizontal>
          <FormLabel htmlFor='userLastName'>
            {t('app.profile.dialog.fields.lastName')}
          </FormLabel>
          <FormInput
            id='userLastName'
            value={user.data.lastName}
          />
        </FormItem>
      </FormGroup>

      <FormGroup>
        <FormItem isHorizontal>
          <FormLabel htmlFor='userEmail'>
            {t('app.profile.dialog.fields.email')}
          </FormLabel>
          <FormInput
            id='userEmail'
            value={user.data.email}
          />
        </FormItem>
      </FormGroup>

    </Dialog>
  )
}

export default ProfileDialog
