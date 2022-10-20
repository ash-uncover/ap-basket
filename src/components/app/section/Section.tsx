import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import DataStates from 'lib/constants/DataStates'

import { useUser } from 'lib/helpers/users.helper'

import './Section.css'
import SectionMembers from 'components/app/section/SectionMembers'
import Table from 'components/fiori/table/Table'
import SectionSessions from './SectionSessions'
import { IconTabBar } from 'components/fiori/icontabbar/IconTabBar'

const SECTION_TAB = {
  GENERAL: {
    id: 'general',
    title: 'app.section.tabs.general.title'
  },
  MEMBERS: {
    id: 'members',
    title: 'app.section.tabs.members.title'
  },
  SESSIONS: {
    id: 'sessions',
    title: 'app.section.tabs.sessions.title'
  },
}
const SECTION_TABS = Object.values(SECTION_TAB)

const Section = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(SECTION_TAB.GENERAL.id)
  const section = useSection(id)

  // Events//

  const onTabSelect = (id) => {
    setSelectedTab(id)
  }

  // Rendering //

  const renderTab = () => {
    switch (selectedTab) {
      case SECTION_TAB.GENERAL.id: {
        return (
          <>
          </>
        )
      }
      case SECTION_TAB.MEMBERS.id: {
        return (
          <>
            <SectionMembers id={id} />
          </>
        )
      }
      case SECTION_TAB.SESSIONS.id: {
        return (
          <>
            <SectionSessions id={id} />
          </>
        )
      }
      default: {
        return null;
      }
    }
  }

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
            selectedTab={selectedTab}
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
            {renderTab()}
          </section>
        </div>
      )
    }
  }
}

export default Section
