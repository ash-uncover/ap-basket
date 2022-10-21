import React from 'react'

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from 'routes/index'
import RouteLogin from 'routes/login/index'
import RouteHome from 'routes/home/index'
import RouteSections from 'routes/sections'
import RouteSection from 'routes/sections/#id'
import RouteSectionGeneral from 'routes/sections/#id/general'
import RouteSectionSessions from 'routes/sections/#id/sessions'
import RouteSectionMembers from 'routes/sections/#id/members'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<RouteLogin />} />
        <Route path='/' element={<RouteRoot />}>
          <Route path='' element={<RouteHome />} />
          <Route path='sections/:sectionId' element={<RouteSection />}>
            <Route path='' element={<RouteSectionGeneral />} />
            <Route path='general' element={<RouteSectionGeneral />} />
            <Route path='sessions' element={<RouteSectionSessions />} />
            <Route path='members' element={<RouteSectionMembers />} />
          </Route>
          <Route path='sections' element={<RouteSections />} />
          <Route path='*' element={<div>NOT FOUND</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Root
