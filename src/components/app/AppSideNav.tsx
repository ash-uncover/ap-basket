import React from "react"
import { useSelector } from "react-redux"
import { useLocation, useMatch, useNavigate } from "react-router-dom"

import { useUserMembers, useUserSections } from "lib/helpers/hooks/users.hooks"
import { useSection } from "lib/helpers/hooks/sections.hooks"

import AuthSelectors from "store/auth/auth.selectors"

import DataStates, { mergeDataStates } from "lib/constants/DataStates"

import {
  VerticalNavigation,
  VerticalNavigationItem,
} from "@uncover/fundamentals-react"

import "./AppSideNav.css"

const AppSideNav = ({}) => {

  // Hooks //

  const navigate = useNavigate()

  const location = useLocation()

  const onItemSelect = (item) => {
    navigate(item)
  }

  // Rendering //

  return (
    <VerticalNavigation label="" itemsLabel="">
      <VerticalNavigationItem
        id="/"
        glyph="home"
        selected={location.pathname === "/"}
        text={"Home"}
        onItemSelect={onItemSelect}
      />
      <SectionsSideNav onItemSelect={onItemSelect} />
    </VerticalNavigation>
  )
}

const SectionsSideNav = ({ onItemSelect }) => {
  // Hooks //

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)
  const sections = useUserSections(userId)
  const status = mergeDataStates([members.status, sections.status])

  // Rendering //

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <VerticalNavigationItem
          key="/sections-loading"
          id="/sections"
          glyph="company-view"
          selected={location.pathname === "/sections"}
          text={"Sections"}
        />
      )
    }
    case DataStates.FAILURE: {
      return <div>error</div>
    }
    default: {
      sections?.data?.sort((section1, section2) => {
        return section1.data.name.localeCompare(section2.data.name)
      })
      return (
        <VerticalNavigationItem
          key="/sections"
          id="/sections"
          glyph="company-view"
          expanded={true}
          selected={location.pathname === "/sections"}
          text={"Sections"}
          onItemSelect={onItemSelect}
        >
          {sections?.data?.map((section) => {
            return (
              <SectionSideNav
                key={section.data.id}
                sectionId={section.data.id}
                onItemSelect={onItemSelect}
              />
            )
          })}
        </VerticalNavigationItem>
      )
    }
  }
}

const SectionSideNav = ({ sectionId, onItemSelect }) => {
  // Hooks //

  const section = useSection(sectionId)
  const match = useMatch("/sections/:sectionId/*")

  // Events //

  // Rendering //

  const href = `/sections/${sectionId}`

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return <div>loading</div>
    }
    case DataStates.FAILURE: {
      return <div>error</div>
    }
    default: {
      return (
        <VerticalNavigationItem
          key={href}
          id={href}
          selected={match?.params.sectionId === sectionId}
          text={section.data.name}
          onItemSelect={onItemSelect}
        />
      )
    }
  }
}

export default AppSideNav
