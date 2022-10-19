import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'
import { useUserMembers } from 'lib/helpers/users.helper'

import AuthSelectors from 'store/auth/auth.selectors'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import DataStates from 'lib/constants/DataStates'

import './Sections.css'

const Sections = ({ }) => {

  // Hooks //

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)

  // Rendering //

  const renderSections = () => {
    switch (members.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <div>{t('loading.default')}</div>
        )
      }
      case DataStates.FAILURE: {
        return (
          <div>{t('ERROR')}</div>
        )
      }
      default: {
        if (members.data.length === 0) {
          return (
            <div>{t('app.sections.noneR')}</div>
          )
        }
        return members.data.map(member => <SectionTile key={member.data.id} id={member.data.sectionId} />)
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

const SectionTile = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const section = useSection(id)
  const navigate = useNavigate()

  // Events //

  const onClick = () => {
    navigate(`/sections/${id}`);
  }

  // Rendering //

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <Tile>
          <Tile.Content>
            <BusyIndicator show size='m' />
          </Tile.Content>
        </Tile>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <Tile onClick={onClick}>
          <Tile.Header>
            {section.data.name}
          </Tile.Header>
          <Tile.Content>
          </Tile.Content>
          <SectionTileFooter id={id} />
        </Tile>
      )
    }
  }
}

const SectionTileFooter = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const members = useSectionMembers(id)

  // Rendering //

  switch (members.status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <Tile.Footer>
          <BusyIndicator show size='xs' />
        </Tile.Footer>
      )
    }
    case DataStates.FAILURE: {
      return (
        <Tile.Footer />
      )
    }
    default: {
      return (
        <Tile.Footer>
          {t('app.sections.members', { count: members.data.length })}
        </Tile.Footer>
      )
    }
  }
}

export default Sections
