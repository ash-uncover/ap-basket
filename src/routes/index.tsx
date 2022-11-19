import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import authSelectors from 'store/auth/auth.selectors'
import AppHeader from 'components/app/AppHeader'
import AppFooter from 'components/app/AppFooter'
import AppMain from 'components/app/AppMain'
import AppBusy from 'components/app/AppBusy'
import AppSideNav from 'components/app/AppSideNav'
import { login } from 'lib/helpers/rest/auth.rest.helper'

import {
  BusyIndicator,
} from '@uncover/fundamentals-react'

const RouteRoot = () => {

  // Hooks //

  const dispatch = useDispatch()

  const roles = useSelector(authSelectors.roles)
  const token = useSelector(authSelectors.token)
  const username = useSelector(authSelectors.username)

  useEffect(() => {
    if (token && !roles) {
      setTimeout(() => login(dispatch, { username, token }), 0)
    }
  }, [])

  // Rendering //

  if (token) {
    if (roles) {
      return (
        <>
          <AppHeader />
          <AppMain>
            <AppSideNav />
            <Outlet />
          </AppMain>
          <AppFooter />
          <AppBusy />
        </>
      )
    }
    return (
      <div className='fddocs-container' style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <BusyIndicator size='l' />
      </div>
    )
  }

  return (
    <Navigate to='/login' replace={false} />
  )
}

export default RouteRoot
