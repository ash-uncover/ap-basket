import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSection } from 'lib/helpers/sections.helper'

import {
  BusyIndicator,
  Title,
} from 'fundamental-react'
import { IconTabBar } from 'components/fiori/icontabbar/IconTabBar'

import DataStates from 'lib/constants/DataStates'

import './Section.css'
import { useMatch, useNavigate } from 'react-router-dom'

const SECTION_TAB = {
  GENERAL: {
    id: 'general',
    title: 'app.section.tabs.general.title'
  },
  SESSIONS: {
    id: 'sessions',
    title: 'app.section.tabs.sessions.title'
  },
  MEMBERS: {
    id: 'members',
    title: 'app.section.tabs.members.title'
  },
}
const SECTION_TABS = Object.values(SECTION_TAB)

const Section = ({ sectionId, children }) => {

  // Hooks //

  const { t } = useTranslation()
  const navigate = useNavigate()
  const match = useMatch('/sections/:sectionId/:tabId')

  const [selectedTab, setSelectedTab] = useState(SECTION_TAB.GENERAL.id)
  const section = useSection(sectionId)

  // Events//

  const onTabSelect = (tabId) => {
    setSelectedTab(tabId)
    navigate(`/sections/${sectionId}/${tabId}`)
  }

  // Rendering //

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <BusyIndicator show size='l' />
      )
    }
    case DataStates.FAILURE: {
      return (
          <div>error</div>
      )
    }
    default: {
      return (
        <div className='section app-content'>
          <Title level={1}>
            {t('app.section.title', { name: section.data.name })}
          </Title>
          <IconTabBar
            selectedTab={match?.params.tabId || SECTION_TAB.GENERAL.id}
            tabs={SECTION_TABS.map(tab => ({
              ...tab,
              title: t(tab.title)
            }))}
            onTabSelect={onTabSelect}
          />
          <section className='section-content'>
            <Title className='section-title' level={2}>
              {t(SECTION_TABS.find(tab => tab.id === selectedTab)?.title)}
            </Title>
            {children}
          </section>
        </div>
      )
    }
  }
}

export default Section
