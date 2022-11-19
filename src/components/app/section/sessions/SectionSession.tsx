import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useSession, useSessionParticipants, useSessionUsers } from 'lib/helpers/hooks/sessions.hooks'

import AuthSelectors from 'store/auth/auth.selectors'

import { getParticipationStatus, PARTICIPATION_STATE } from 'lib/utils/entities/participants.utils'
import { formatDateTimeLong, formatDateTimeShort } from 'lib/utils/date.utils'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'
import { postParticipant, putParticipantStatus } from 'lib/helpers/rest/participants.rest.helper'
import {

  Button,
  ButtonDesigns,
  BusyIndicator,
  Card,
  InfoLabel,
  Table,
  TileContainer
} from '@uncover/fundamentals-react'

export const SectionSession = ({ id }) => {

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
      return (
        <SectionSessionLoaded
          participants={participants.data}
          users={users}
          session={session}
        />
      )
    }
  }
}

const SectionSessionLoading = () => {
  return (
    <TileContainer>
      <BusyIndicator size='xs' />
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
  session,
  participants,
  users,
}) => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userId = useSelector(AuthSelectors.userId)
  const token = useSelector(AuthSelectors.token)

  const [expanded, setEpanded] = useState(false)

  // Events //

  const onToggleCardExpand = () => {
    setEpanded(!expanded)
  }

  const onAccept = (participationId: string) => {
    putParticipantStatus(dispatch, token, participationId, {
      status: 'ACCEPTED'
    })
  }

  const onDecline = (participationId: string) => {
    putParticipantStatus(dispatch, token, participationId, {
      status: 'DECLINED'
    })
  }

  const onAcceptFirst = () => {
    postParticipant(dispatch, token, {
      userId,
      sessionId: session.data.id,
      status: 'ACCEPTED'
    })
  }

  const onDeclineFirst = () => {
    postParticipant(dispatch, token, {
      userId,
      sessionId: session.data.id,
      status: 'DECLINED'
    })
  }

  // Rendering //

  const sessionDate = new Date(session.data.date)

  const participantsAcccepted = participants.filter(participant => participant.data.status === 'ACCEPTED')

  const userData = users.data
    .map((user) => {
      const participant = participants.find(participant => participant.data.userId === user.data.id)
      return {
        ...participant.data,
        participationId: participant.data.id,
        ...user.data,
        isAdmin: participant.data.roles?.includes('sectionAdmin'),
        isSelf: userId === user.data.id
      }
    })
    .sort((user1, user2) => {
      if (user1.status === user2.status) {
        return user1.statusDate.localeCompare(user2.statusDate)
      }
      return user1.status.localeCompare(user2.status)
    })

  const renderFooter = () => {
    const participant = participants.find(participant => participant.data.userId === userId)
    const status = getParticipationStatus(session.data, participant?.data)
    switch (status) {
      case PARTICIPATION_STATE.ACCEPTED: {
        return (
          <>
            <span>
              {t('app.session.participation.accepted')}
            </span>
            <Button
              text={t('app.session.action.decline')}
              design={ButtonDesigns.NEGATIVE}
              onClick={() => onDecline(participant.data.id)}
            />
          </>
        )
      }
      case PARTICIPATION_STATE.DECLINED: {
        return (
          <>
            <span>
              {t('app.session.participation.declined')}
            </span>
            <Button
              text={t('app.session.action.register')}
              design={ButtonDesigns.POSITIVE}
              onClick={() => onAccept(participant.data.id)}
            />
          </>
        )
      }
      case PARTICIPATION_STATE.ATTENDED: {
        return (
          <span>
            {t('app.session.participation.attended')}
          </span>
        )
      }
      case PARTICIPATION_STATE.UNATTENDED: {
        return (
          <span>
            {t('app.session.participation.unattended')}
          </span>
        )
      }
      default: {
        return (
          <>
            <Button
              text={t('app.session.action.register')}
              design={ButtonDesigns.POSITIVE}
              onClick={onAcceptFirst}
            />
            <Button
              text={t('app.session.action.decline')}
              design={ButtonDesigns.NEGATIVE}
              onClick={onDeclineFirst}
            />
          </>
        )
      }
    }
  }

  return (
    <Card
      header={{
        title: formatDateTimeLong(sessionDate),
        titleCounter: `${participantsAcccepted.length} / ${session.data.maxParticipants} Participants`,
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
            compact
            columns={[{
              key: 'firstName',
              name: t('entities.user.firstName'),
              formatter: (user) => user.isSelf ? <strong>{user.firstName}</strong> : user.firstName
            }, {
              key: 'lastName',
              name: t('entities.user.lastName'),
              formatter: (user) => user.isSelf ? <strong>{user.lastName}</strong> : user.lastName
            }, {
              key: 'status',
              name: t('entities.participants.status'),
              render: (user) => {
                const status = getParticipationStatus(session.data, user)
                return (
                  <InfoLabel
                    accentColor={t(status.accentColor)}
                    text={t(status.text)}
                  />
                )
              }
            }, {
              key: 'statusDate',
              name: t('entities.participants.statusDate'),
              formatter: (user) => user.isSelf ? <strong>{formatDateTimeShort(new Date(user.statusDate))}</strong> : formatDateTimeShort(new Date(user.statusDate))
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
