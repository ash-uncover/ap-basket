import React from 'react'

import {
  SideNav,
} from 'fundamental-react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUserMembers } from 'lib/helpers/users.helper'

import AuthSelectors from 'store/auth/auth.selectors'

import './AppSideNav.css'
import DataStates from 'lib/constants/DataStates'
import { useSection } from 'lib/helpers/sections.helper'

const AppSideNav = ({ }) => {

  // Hooks //

  const navigate = useNavigate()

  const location = useLocation()
  const pathname = location.pathname.split('/').filter(p => !!p)[0] || 'home'

  const onItemSelect = (event, item) => {
    event.preventDefault()
    event.stopPropagation()
    const path = `/${item !== 'home' ? item : ''}`
    navigate(path)
  }

  // Rendering //

  return (
    <SideNav
      onItemSelect={onItemSelect}
      selectedId={pathname}
      skipLink={{ href: '', label: '' }}
    >
      <SideNav.List
        data-sample='Sample'
      >
        <SideNav.ListItem
          glyph='home'
          id='home'
          name='Home'
          url='/'
        />
        <SideNav.ListItem
          glyph='company-view'
          id='sections'
          name='Sections'
          expanded={true}
          url='/sections'
        >
          <SectionsSideNav />
        </SideNav.ListItem>
      </SideNav.List>
    </SideNav>
  )
}

const SectionsSideNav = ({ }) => {
  // Hooks //

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)

  // Rendering //

  switch (members.status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <div>loading</div>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <SideNav.List level={2}>
          {members.data.map(member => <SectionSideNav key={member.data.id} id={member.data.sectionId} />)}
        </SideNav.List>
      )
    }
  }
}

const SectionSideNav = ({ id }) => {

  // Hooks //

  const section = useSection(id)

  // Rendering //

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <div>loading</div>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <SideNav.ListItem
          id={`sections/${id}`}
          glyph='group'
          name={section.data.name}
          url={`sections/${id}`}
        />
      )
    }
  }
}

export default AppSideNav
