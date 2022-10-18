import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import authSelectors from 'store/auth/auth.selectors'

import AppHeader from 'components/app/AppHeader'
import AppFooter from 'components/app/AppFooter'
import AppMain from 'components/app/AppMain'
import AppBusy from 'components/app/AppBusy'

const RouteRoot = () => {

  // Hooks //

  const token = useSelector(authSelectors.token)

  // Rendering //

  if (token) {
    return (
      <>
        <AppHeader />
        <AppMain />
        <AppFooter />
        <AppBusy />
      </>
    )
  }

  return (
    <Navigate to='/login' replace={false} />
  )
}

export default RouteRoot
