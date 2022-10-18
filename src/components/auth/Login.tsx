import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from "react-router-dom"
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  FormGroup,
  FormInput,
  FormItem,
  FormLabel,
} from 'fundamental-react'

import authSelectors from 'store/auth/auth.selectors'

import { login } from 'lib/helpers/auth.helper'

const Login = () => {

  // Hooks //

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const user = useSelector(authSelectors.username)

  const [username, setUsername] = useState(user || '')
  const [password, setPassword] = useState('')

  const loginUsername = useRef(null)

  useEffect(() => {
    loginUsername.current.focus()
  }, [])

  // Events //

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = (event) => {
    event.preventDefault()
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
        actions={[(
          <Button
            option='emphasized'
            disabled={!username}
            onClick={onLogin}
          >
            {t('auth.login.submit')}
          </Button>
        )]}
        show={true}
        title={t('auth.login.title')}
      >
        <FormGroup>
          <FormItem>
            <FormLabel htmlFor='loginUsername'>
              {t('auth.login.fields.username.name')}
            </FormLabel>
            <FormInput
              id='loginUsername'
              ref={loginUsername}
              placeholder={t('auth.login.fields.username.placeholder')}
              value={username}
              onChange={onUsernameChange}
            />
          </FormItem>
        </FormGroup>

        <FormGroup>
          <FormItem>
            <FormLabel htmlFor='loginPassword'>
              {t('auth.login.fields.password.name')}
            </FormLabel>
            <FormInput
              id='loginPassword'
              placeholder={t('auth.login.fields.password.placeholder')}
              type='password'
              value={password}
              onChange={onPasswordChange}
            />
          </FormItem>
        </FormGroup>
      </Dialog>
    </div>
  )
}

export default Login
