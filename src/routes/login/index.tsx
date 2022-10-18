import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import authSelectors from 'store/auth/auth.selectors'

import Login from 'components/auth/Login'

const RouteLogin = () => {

  // Hooks //

  const token = useSelector(authSelectors.token)

  // Rendering //

  if (token) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  return (
    <Login />
  )
}

export default RouteLogin
