import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionSessions } from 'lib/helpers/hooks/sections.hooks'
import { useSession, useSessionParticipants, useSessionUsers } from 'lib/helpers/hooks/sessions.hooks'

import { BusyIndicator } from 'fundamental-react'

import { Table, TableCell } from 'components/fiori/table/Table'
import { Panel } from 'components/fiori/panel/Panel'
import { TableRow } from 'components/fiori/table/TableRow'

import DataStates from 'lib/constants/DataStates'

import './SectionTabSessions.css'
import { Tile } from 'components/fiori/tile/Tile'
import { TileContainer } from 'components/fiori/tile/TileContainer'

const SectionTabSessions = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()

  const sessions = useSectionSessions(sectionId)

  // Rendering //

  switch (sessions.status) {
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
      const now = new Date()
      sessions.data
        .sort((session1, session2) => {
          const date1 = new Date(session1.data.date)
          const date2 = new Date(session2.data.date)
          return date1 === date2 ? 0 : date1 > date2 ? -1 : 1
        })
      const sessionsSort = sessions.data.reduce((acc, session) => {
          const date = new Date(session.data.date)
          if (date > now) {
            acc.future.push(session)
          } else {
            acc.past.push(session)
          }
          return acc
        }, { future: [], past: [] })
      return (
        <div className=''>
          <Panel
            expandable
            expanded
            title='Incoming Sessions'
          >
            <div
              style= {{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '1rem 0',
              }}
            >
              {sessionsSort.future.map((session) => (
                <SectionSession
                  key={session.data.id}
                  id={session.data.id}
                />
              ))}
            </div>
          </Panel>
          <Panel
            expandable
            title='Past Sessions'
          >
            {sessionsSort.past.map((session) => (
              <SectionSession
                key={session.data.id}
                id={session.data.id}
              />
            ))}
          </Panel>

        </div>
      )
    }
  }
}

const SectionSession = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const session = useSession(id)
  const participants = useSessionParticipants(id)
  const users = useSessionUsers(id)

  // Rendering //

  switch (session.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <TileContainer>
          <BusyIndicator show size='xs' />
        </TileContainer>
      )
    }
    case DataStates.FAILURE: {
      return (
        <TileContainer>
          error
        </TileContainer>
      )
    }
    default: {
      return (
        <TileContainer>
          data
        </TileContainer>
      )
    }
  }
}

export default SectionTabSessions
