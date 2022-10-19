import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from 'routes/index'
import RouteLogin from 'routes/login/index'
import RouteHome from 'routes/home/index'
import RouteSections from 'routes/sections/index'
import RouteSection from 'routes/sections/#id/index'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<RouteLogin />} />
        <Route path='/' element={<RouteRoot />}>
          <Route path='' element={<RouteHome />} />
          <Route path='sections/:sectionId' element={<RouteSection />} />
          <Route path='sections' element={<RouteSections />} />
          <Route path='*' element={<div>NOT FOUND</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
