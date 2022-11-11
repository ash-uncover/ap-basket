import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  BusyIndicator,
  Title,
} from 'fundamental-react'

import DataStates from 'lib/constants/DataStates'

import { useMatch, useNavigate } from 'react-router-dom'

import './Section.css'
import { useSection } from 'lib/helpers/hooks/sections.hooks'
import { IconTabBar } from '@uncover/fundamentals-react'

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

  const section = useSection(sectionId)

  // Events//

  const onTabSelect = (tabId) => {
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
        <div className='section app-content fd-page'>
          <div
            className='app-page-header'
            style={{
              margin: '-2rem -2rem 0 -2rem',
              padding: '2rem 2rem 0 2rem',
            }}
          >
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
          </div>
          <section className='section-content'>

            <Title className='section-title' level={2}>
              {t((SECTION_TABS.find(tab => tab.id === match?.params.tabId) || SECTION_TAB.GENERAL)?.title)}
            </Title>
            {children}
          </section>
        </div>
      )
    }
  }
}

export default Section
