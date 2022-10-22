import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'
import AuthSelectors from 'store/auth/auth.selectors'

import ParticipantsSelectors from 'store/rest/participants/participants.selectors'
import { ParticipantState } from 'store/rest/participants/participants.state'

import SessionsSelectors from 'store/rest/sessions/sessions.selectors'
import { UserState } from 'store/rest/users/users.state'
import UsersSelectors from 'store/rest/users/users.selectors'
import { getSession, getSessionParticipants } from '../rest/sessions.rest.helper'
import { getUser } from '../rest/users.rest.helper'

export const useSession = (id: string) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const session = useSelector(SessionsSelectors.session(id))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(session.dataStatus)) {
      getSession(dispatch, token, id)
    }
  }, [session.dataStatus])
  return session
}

export const useSessionParticipants = (sessionId: string): { data: ParticipantState[], status: string, error: string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const session = useSelector(SessionsSelectors.session(sessionId))
  const participants = useSelector(ParticipantsSelectors.sessionParticipants(sessionId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(session.participantsStatus)) {
      getSessionParticipants(dispatch, token, sessionId)
    }
  }, [session.participantsStatus])
  return {
    data: participants,
    status: session.participantsStatus,
    error: session.participantsError
  }
}

export const useSessionUsers = (sessionId: string): { data: UserState[], status: string, error: string } => {
  const dispatch = useDispatch()

  const token = useSelector(AuthSelectors.token)
  const session = useSelector(SessionsSelectors.session(sessionId))

  const participants = useSelector(ParticipantsSelectors.sessionParticipants(sessionId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(session.participantsStatus)) {
      getSessionParticipants(dispatch, token, sessionId)
    }
  }, [session.participantsStatus])

  const users = useSelector(UsersSelectors.sessionUsers(sessionId))
  useEffect(() => {
    users.forEach(user => {
      if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.dataStatus)) {
        getUser(dispatch, token, user.data.id)
      }
    })
  }, [users])

  return {
    data: users,
    status: mergeDataStates([
      session.participantsStatus,
      ...users.map(user => user.dataStatus)
    ]),
    error: session.participantsError
  }
}