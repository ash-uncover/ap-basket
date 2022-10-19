import React from 'react'

import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSection } from 'lib/helpers/sections.helper'
import { useUserMembers } from 'lib/helpers/users.helper'

import AuthSelectors from 'store/auth/auth.selectors'

import { VerticalNavigation, VerticalNavigationItem } from 'components/fiori/VerticalNavigation'

import DataStates from 'lib/constants/DataStates'

import './AppSideNav.css'

const AppSideNav = ({ }) => {

  // Hooks //

  const navigate = useNavigate()

  const location = useLocation()

  const onItemSelect = (item) => {
    navigate(item)
  }

  // Rendering //

  return (
    <VerticalNavigation
      label=''
      itemsLabel=''
    >
      <VerticalNavigationItem
        id='/'
        glyph='home'
        selected={location.pathname === '/'}
        text={'Home'}
        onItemSelect={onItemSelect}
      />
      <SectionsSideNav
        onItemSelect={onItemSelect}
      />
    </VerticalNavigation>
  )
}

const SectionsSideNav = ({ onItemSelect }) => {

  // Hooks //

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)

  // Rendering //

  switch (members.status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <VerticalNavigationItem
          key='/sections-loading'
          id='/sections'
          glyph='company-view'
          selected={location.pathname === '/sections'}
          text={'Sections'}
        />
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <VerticalNavigationItem
          key='/sections'
          id='/sections'
          glyph='company-view'
          expanded={true}
          selected={location.pathname === '/sections'}
          text={'Sections'}
          onItemSelect={onItemSelect}
        >
          {members.data.map((member) => {
            return (
              <SectionSideNav
                key={member.data.sectionId}
                id={member.data.sectionId}
                onItemSelect={onItemSelect}
              />
            )
          })}
        </VerticalNavigationItem>
      )
    }
  }
}

const SectionSideNav = ({ id, onItemSelect }) => {

  // Hooks //

  const section = useSection(id)
  const location = useLocation()

  // Events //


  // Rendering //

  const href = `/sections/${id}`

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
        <VerticalNavigationItem
          key={href}
          id={href}
          selected={location.pathname === href}
          text={section.data.name}
          onItemSelect={onItemSelect}
        />
      )
    }
  }
}

export default AppSideNav
