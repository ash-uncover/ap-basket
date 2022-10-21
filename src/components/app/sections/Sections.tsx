import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'
import { useUserMembers, useUserSections } from 'lib/helpers/users.helper'

import AuthSelectors from 'store/auth/auth.selectors'

import {
  BusyIndicator,
  Title,
} from 'fundamental-react'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'

import './Sections.css'
import { Tile } from 'components/fiori/tile/Tile'

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
              members={members.data.length}
            />
          )
        })
      }
    }
  }

  return (
    <div className='app-content sections'>
      <Title level={1}>
        {t('app.sections.title')}
      </Title>
      <div className='sections-container'>
        {renderSections()}
      </div>
    </div>
  )
}

const SectionTile = ({ sectionId, members }) => {

  // Hooks //

  const { t } = useTranslation()

  const section = useSection(sectionId)
  const navigate = useNavigate()

  // Events //

  const onClick = () => {
    navigate(`/sections/${sectionId}`);
  }

  // Rendering //

  switch (section.dataStatus) {
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
          footer={t('app.sections.members', { count: members })}
          onClick={onClick}
        />
      )
    }
  }
}
export default Sections
