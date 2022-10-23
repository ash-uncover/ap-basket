import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionSessions } from 'lib/helpers/hooks/sections.hooks'
import { useSession, useSessionParticipants, useSessionUsers } from 'lib/helpers/hooks/sessions.hooks'

import { BusyIndicator } from 'fundamental-react'

import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'
import { Card } from 'components/fiori/card/Card'
import { Panel } from 'components/fiori/panel/Panel'
import { TileContainer } from 'components/fiori/tile/TileContainer'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'

import './SectionTabSessions.css'
import { useSelector } from 'react-redux'
import AuthSelectors from 'store/auth/auth.selectors'
import Table from 'components/fiori/table/Table'

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

const SectionSession = ({ id }) => {

  // Hooks //

  const session = useSession(id)
  const participants = useSessionParticipants(id)
  const users = useSessionUsers(id)
  const status = mergeDataStates([
    session.dataStatus,
    participants.status,
    users.status,
  ])

  // Rendering //

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: return <SectionSessionLoading />
    case DataStates.FAILURE: return <SectionSessionError />
    default: {
      const date = session.data.date
      return (
        <SectionSessionLoaded
          participants={participants.data}
          participantsMax={session.data.maxParticipants}
          users={users}
          date={date}
        />
      )
    }
  }
}

const SectionSessionLoading = () => {
  return (
    <TileContainer>
      <BusyIndicator show size='xs' />
    </TileContainer>
  )
}

const SectionSessionError = () => {
  return (
    <TileContainer>
      error
    </TileContainer>
  )
}

const SectionSessionLoaded = ({
  date,
  participants,
  participantsMax,
  users,
}) => {

  // Hooks //

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)

  const [expanded, setEpanded] = useState(false)

  // Events //

  const onToggleCardExpand = () => {
    setEpanded(!expanded)
  }

  // Rendering //

  const now = new Date()
  const dateObj = new Date(date)
  const isFuture = dateObj > now

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }

  const userData = users.data
    .map((user) => {
      const member = participants.find(participant => participant.data.userId === user.data.id)
      return {
        ...member.data,
        ...user.data,
        isAdmin: member.data.roles?.includes('sectionAdmin'),
        isSelf: userId === user.data.id
      }
    }).sort((user1, user2) => {
      return user1.firstName.localeCompare(user2.firstName)
    })

  const renderFooter = () => {
    return (
      <>
        <Button
          text='Register'
          style={ButtonStyles.POSITIVE}
        />
        <Button
          text='I wont come'
          style={ButtonStyles.NEGATIVE}
        />
      </>
    )
  }

  return (
    <Card
      badge={{
        text: isFuture ? 'future' : 'completed'
      }}
      header={{
        title: `${dateObj.toLocaleDateString('en-US', dateOptions)} at ${dateObj.toLocaleTimeString('en-US', timeOptions)}`,
        titleCounter: `${participants.length} / ${participantsMax} Participants`,
        onClick: participants.length ? onToggleCardExpand : () => { }
      }}
      footer={{
        className: 'justify-end gap-xs',
        children: renderFooter()
      }}
    >
      {expanded ?
        <div>
          <Table
            borderedVertical={true}
            indicator
            columns={[{
              key: 'firstName',
              name: t('entities.user.firstName'),
              formatter: (user) => user.isSelf ? <strong>{user.firstName}</strong> : user.firstName
            }, {
              key: 'lastName',
              name: t('entities.user.lastName'),
              formatter: (user) => user.isSelf ? <strong>{user.lastName}</strong> : user.lastName
            }]}
            rows={userData.map(user => ({
              data: user,
              indicator: user.isSelf ? 'information' : null
            }))}
          />
        </div>
        : null}
    </Card>
  )
}

export default SectionTabSessions
