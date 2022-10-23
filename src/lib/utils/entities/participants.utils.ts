import { SESSION } from './sessions.utils'

export type PARTICIPANT = {
  sessionId: string,
  userId: string,
  status: string,
  date: Date,
}

export const PARTICIPATION_STATE = {
  UNKNOW: 'UNKNOW',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELED: 'CANCELED',
  ATTENDED: 'ATTENDED',
  UNATTENDED: 'UNATTENDED'
}

export const getParticipantByUserId = (
  participants: PARTICIPANT[],
  userId: string
) => {
  return participants.find(participant => participant.userId === userId)
}

export const getParticipationState = (
  session: SESSION,
  participant: PARTICIPANT
) => {
  const now = new Date()
  const date = new Date(session.date)
  const isFuture = now < date

  switch (participant?.status) {
    case PARTICIPATION_STATE.ACCEPTED: {
      return isFuture ? participant.status : PARTICIPATION_STATE.ATTENDED
    }
    case PARTICIPATION_STATE.DECLINED:
    case PARTICIPATION_STATE.CANCELED: {
      return isFuture ? participant.status : PARTICIPATION_STATE.UNATTENDED
    }
  }
  return PARTICIPATION_STATE.UNKNOW
}