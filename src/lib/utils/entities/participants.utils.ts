import { AccentColors } from '@uncover/fundamentals-react'
import { formatDateTimeShort } from 'lib/utils/date.utils'
import { SESSION } from 'lib/utils/entities/sessions.utils'

export type PARTICIPANT = {
  id: string,
  sessionId: string,
  userId: string,
  status: string,
  statusDate: Date,
}

export const PARTICIPATION_STATE = {
  ACCEPTED: {
    key: 'ACCEPTED',
    text: 'entities.participation.status.accepted',
    accentColor: AccentColors.COLOR_8,
  },
  DECLINED: {
    key: 'DECLINED',
    text: 'entities.participation.status.declined',
    accentColor: AccentColors.COLOR_2,
  },
  ATTENDED: {
    key: 'ATTENDED',
    text: 'entities.participation.status.attended',
    accentColor: AccentColors.COLOR_10,
  },
  UNATTENDED: {
    key: 'UNATTENDED',
    text: 'entities.participation.status.unattended',
    accentColor: AccentColors.COLOR_10,
  }
}

export const getParticipantByUserId = (
  participants: PARTICIPANT[],
  userId: string
) => {
  return participants.find(participant => participant.userId === userId)
}

export const getParticipationStatus = (
  session: SESSION,
  participant: PARTICIPANT
) => {
  const now = new Date()
  const date = new Date(session.date)
  const isFuture = now < date

  switch (participant?.status) {
    case PARTICIPATION_STATE.ACCEPTED.key: {
      return isFuture ? PARTICIPATION_STATE.ACCEPTED : PARTICIPATION_STATE.ATTENDED
    }
    case PARTICIPATION_STATE.DECLINED.key: {
      return isFuture ? PARTICIPATION_STATE.DECLINED : PARTICIPATION_STATE.UNATTENDED
    }
  }
  return isFuture ? null : PARTICIPATION_STATE.UNATTENDED
}
