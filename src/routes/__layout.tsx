import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from 'routes/index'
import RouteLogin from 'routes/login/index'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<RouteLogin />} />
        <Route path='*' element={<RouteRoot />} />
      </Routes>
    </Router>
  )
}

export default Root
