import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionSessions } from 'lib/helpers/hooks/sections.hooks'

import { BusyIndicator } from 'fundamental-react'

import { Panel } from 'components/fiori/panel/Panel'

import { SectionSession } from 'components/app/section/sessions/SectionSession'

import DataStates from 'lib/constants/DataStates'

import './SectionTabSessions.css'
import { Toolbar } from 'components/fiori/toolbar/Toolbar'
import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'

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
            toolbar={
              <Toolbar transparent clear>
                <Button
                  text='New Session'
                  style={ButtonStyles.TRANSPARENT}
                />
              </Toolbar>
            }
          >
            <div
              style={{
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '1rem 0',
              }}
            >
              {sessionsSort.past.map((session) => (
                <SectionSession
                  key={session.data.id}
                  id={session.data.id}
                />
              ))}
            </div>
          </Panel>

        </div>
      )
    }
  }
}

export default SectionTabSessions
