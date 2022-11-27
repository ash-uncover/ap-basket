import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AuthSelectors from 'store/auth/auth.selectors'

import {
  BusyIndicator,
  Page,
  PageBody,
  PageHeader,
  Title,
  TitleLevels,
} from '@uncover/fundamentals-react'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'

import './Sections.css'
import { useUserMembers, useUserSections } from 'lib/helpers/hooks/users.hooks'
import { useSection, useSectionMembers } from 'lib/helpers/hooks/sections.hooks'
import { Tile } from '@uncover/fundamentals-react'

const Sections = ({ }) => {

  // Hooks //

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)
  const sections = useUserSections(userId)
  const status = mergeDataStates([members.status, sections.status])

  // Rendering //

  const renderSections = () => {
    switch (status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <Tile title={t('loading.default')} />
        )
      }
      case DataStates.FAILURE: {
        return (
          <Tile title={t('ERROR')} />
        )
      }
      default: {
        if (!sections?.data?.length) {
          return (
            <div>{t('app.sections.none')}</div>
          )
        }
        sections?.data?.sort((section1, section2) => {
          return section1.data.name.localeCompare(section2.data.name)
        })
        return sections?.data?.map(section => {
          return (
            <SectionTile
              key={section.data.id}
              sectionId={section.data.id}
            />
          )
        })
      }
    }
  }

  return (
    <Page className='app-content fd-page'>
      <PageHeader
        title={t('app.sections.title')}
      />
      <PageBody>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem' }}>
          {renderSections()}
        </div>
      </PageBody>
    </Page >
  )
}

const SectionTile = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()

  const section = useSection(sectionId)
  const members = useSectionMembers(sectionId)
  const status = mergeDataStates([members.status, section.dataStatus])

  const navigate = useNavigate()

  // Events //

  const onClick = () => {
    navigate(`/sections/${sectionId}`);
  }

  // Rendering //

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <Tile title={'loading'}>
          <BusyIndicator show size='m' />
        </Tile>
      )
    }
    case DataStates.FAILURE: {
      return (
        <Tile title={'error'}>

        </Tile>
      )
    }
    default: {
      return (
        <Tile
          title={section.data.name}
          footer={t('app.sections.members', { count: members?.data?.length })}
          onClick={onClick}
        />
      )
    }
  }
}
export default Sections
