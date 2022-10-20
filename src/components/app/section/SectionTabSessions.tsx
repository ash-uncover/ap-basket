import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionSessions } from 'lib/helpers/sections.helper'
import { useSession, useSessionParticipants, useSessionUsers } from 'lib/helpers/sessions.helper'

import {
  BusyIndicator,
} from 'fundamental-react'
import {
  Table,
  TableRow,
  TableCell
} from 'components/fiori/table/Table'

import DataStates from 'lib/constants/DataStates'

import './SectionTabSessions.css'
import { Panel } from 'components/fiori/panel/Panel'

const SectionTabSessions = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const sessions = useSectionSessions(id)

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
            <Table
              borderedVertical={true}
              columns={[
                { key: 'date', name: 'Date' },
                { key: 'participants', name: 'Participants' },
              ]}
            >
              {sessionsSort.future.map((session) => (
                <SectionSession
                  key={session.data.id}
                  id={session.data.id}
                />
              ))}
            </Table>
          </Panel>
          <Panel
            expandable
            title='Past Sessions'
          >
            <Table
              borderedVertical={true}
              columns={[
                { key: 'date', name: 'date' },
                { key: 'participants', name: 'Participants' },
              ]}
            >
              {sessionsSort.past.map((session) => (
                <SectionSession
                  key={session.data.id}
                  id={session.data.id}
                />
              ))}
            </Table>
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
        <TableRow>
          <TableCell>
            <BusyIndicator show size='l' />
          </TableCell>
        </TableRow>
      )
    }
    case DataStates.FAILURE: {
      return (
        <TableRow>
          <TableCell>
            <span>error</span>
          </TableCell>
        </TableRow>
      )
    }
    default: {
      return (
        <TableRow>
          <TableCell>
            <span>
              {session.data.date}
            </span>
          </TableCell>
          <TableCell>
            <span>
              {participants.data?.length}
            </span>
          </TableCell>
        </TableRow>
      )
    }
  }
}

export default SectionTabSessions
