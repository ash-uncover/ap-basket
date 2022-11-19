import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useSection, useSectionMembers, useSectionSessions } from 'lib/helpers/hooks/sections.hooks'

import DataStates from 'lib/constants/DataStates'

import './SectionTabGeneral.css'
import {
  BusyIndicator,
  Semantics,
  Tile,
  TileContentNumeric
} from '@uncover/fundamentals-react'

const SectionTabGeneral = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()
  const navigate = useNavigate()

  const section = useSection(sectionId)
  const members = useSectionMembers(sectionId)
  const sessions = useSectionSessions(sectionId)

  // Rendering //

  const renderTileMembers = () => {
    switch (members.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <Tile title='Members'>
            <BusyIndicator size='s' />
          </Tile>
        )
      }
      case DataStates.FAILURE: {
        return (
          <Tile title='Members'>
            <div>error</div>
          </Tile>
        )
      }
      default: {
        return (
          <Tile
            badge={section?.data?.name}
            title='Members'
            footer='Members in section'
            onClick={() => navigate(`/sections/${sectionId}/members`)}
          >
            <TileContentNumeric
              value={`${members?.data?.length}`}
              semantic={Semantics.INFORMATIVE}
            />
          </Tile>
        )
      }
    }
  }

  const renderTilesSessions = () => {
    switch (sessions.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <Tile title='Sessions'>
            <BusyIndicator size='s' />
          </Tile>
        )
      }
      case DataStates.FAILURE: {
        return (
          <Tile title='Sessions'>
            <div>error</div>
          </Tile>
        )
      }
      default: {
        const now = new Date()
        const sessionsFuture = sessions.data.filter(session => {
          const date = new Date(session.data.date)
          return date > now
        })
        return (
          <>
            <Tile
              badge={section?.data?.name}
              title='Sessions'
              footer='Incoming sessions'
              onClick={() => navigate(`/sections/${sectionId}/sessions`)}
            >
              <TileContentNumeric
                value={`${sessionsFuture?.length}`}
                semantic={Semantics.POSITIVE}
              />
            </Tile>
            <Tile
              badge={section?.data?.name}
              title='Sessions'
              footer='Sessions organized'
              onClick={() => navigate(`/sections/${sectionId}/sessions`)}
            >
              <TileContentNumeric
                value={`${sessions?.data?.length}`}
                semantic={Semantics.INFORMATIVE}
              />
            </Tile>
          </>
        )
      }
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        padding: '2rem'
      }}
    >
      {renderTilesSessions()}
      {renderTileMembers()}
    </div>
  )
}

export default SectionTabGeneral
