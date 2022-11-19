import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from "react-router-dom"
import { useTranslation } from 'react-i18next'


import authSelectors from 'store/auth/auth.selectors'
import { login } from 'lib/helpers/rest/auth.rest.helper'

import {
  Button,
  Dialog,
  FormInput,
} from '@uncover/fundamentals-react'

const Login = () => {

  // Hooks //

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const user = useSelector(authSelectors.username)

  const [username, setUsername] = useState(user || '')
  const [password, setPassword] = useState('')

  const loginUsername = useRef(null)

  useEffect(() => {

  }, [])

  // Events //

  const onUsernameChange = (value) => {
    setUsername(value)
  }

  const onPasswordChange = (value) => {
    setPassword(value)
  }

  const onLogin = () => {
    login(dispatch, {
      username,
      password
    })
      .then(() => {
        setPassword('')
        redirect('/')
      })
  }

  // Rendering //

  return (
    <div>
      <Dialog
        title={t('auth.login.title')}
        footer={{
          right: [(
            <Button
              option='emphasized'
              disabled={!username}
              onClick={onLogin}
              text={t('auth.login.submit')}
            />
          )]
        }}
      >
        <div
          className='fd-form-group'
          style={{
            padding: '0 2rem'
          }}>
          <FormInput
            label={t('auth.login.fields.username.name')}
            placeholder={t('auth.login.fields.username.placeholder')}
            value={username}
            onChange={onUsernameChange}
          />
          <FormInput
            label={t('auth.login.fields.password.name')}
            placeholder={t('auth.login.fields.password.placeholder')}
            type='password'
            value={password}
            onChange={onPasswordChange}
          />
        </div>
      </Dialog>
    </div>
  )
}

export default Login
