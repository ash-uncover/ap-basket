import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSection } from 'lib/helpers/hooks/sections.hooks'

import DataStates from 'lib/constants/DataStates'

import {
  AccentColors,
  BusyIndicator,
  BusyIndicatorSizes,
  Button,
  InfoLabel,
  ObjectMarker,
  ObjectNumber,
  ObjectStatus,
  Page,
  PageHeader,
  PageHeaderAttribute,
  PageBody,
  IconTabBar,
  Semantics,
  Title,
  TitleLevels,
} from '@uncover/fundamentals-react'

import './Section.css'

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
        <BusyIndicator size={BusyIndicatorSizes.LARGE} />
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <Page className='app-content'>
          <PageHeader
            hideBoxShadow
            avatar={{
              initials: 'BA'
            }}
            title={t('app.section.title', { name: section.data.name })}
            actions={[
              <Button icon='cart' compact />
            ]}
            subtitle='This section is so cool'
            attributes={[
              <PageHeaderAttribute
                label='Marker 1'
                semantic={Semantics.POSITIVE}
                text='Positive Maker'
                type='status'
              />,
              <PageHeaderAttribute
                label='Marker 2'
                semantic={Semantics.NEGATIVE}
                text='-2345.78€'
                type='status'
              />,
              <PageHeaderAttribute
                label='My property'
                text='Text Property are used for longer text such as description that can span a lot and require several lines to display.'
                type='text'
              />,
            ]}
          >
          </PageHeader>

          <PageBody>
            <IconTabBar
              selectedTab={match?.params.tabId || SECTION_TAB.GENERAL.id}
              tabs={SECTION_TABS.map(tab => ({
                ...tab,
                title: t(tab.title)
              }))}
              onTabSelect={onTabSelect}
            />
            <Title className='section-title' level={TitleLevels.H2}>
              {t((SECTION_TABS.find(tab => tab.id === match?.params.tabId) || SECTION_TAB.GENERAL)?.title)}
            </Title>
            {children}
          </PageBody>

        </Page>
      )
    }
  }
}

export default Section
