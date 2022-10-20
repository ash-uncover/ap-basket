import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataStates from 'lib/constants/DataStates'
import RestService from 'services/rest.service'
import AuthSelectors from 'store/auth/auth.selectors'

import ParticipantsSelectors from 'store/rest/participants/participants.selectors'
import { ParticipantState } from 'store/rest/participants/participants.state'

import SessionsSelectors from 'store/rest/sessions/sessions.selectors'
import SessionsSlice from 'store/rest/sessions/sessions.slice'

export const getSession = async (dispatch, token: string, id: string) => {
  dispatch(SessionsSlice.actions.getSessionRequest({ id }))

  try {
    const data = await RestService.api.sessions.get(token, id)
    dispatch(SessionsSlice.actions.getSessionSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SessionsSlice.actions.getSessionFailure({ id, error }))
    throw error
  }
}

export const getSessionParticipants = async (dispatch, token: string, id: string) => {
  dispatch(SessionsSlice.actions.getSessionParticipantsRequest({ id }))

  try {
    const data = await RestService.api.sessions.participants.get(token, id)
    dispatch(SessionsSlice.actions.getSessionParticipantsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SessionsSlice.actions.getSessionParticipantsFailure({ id, error }))
    throw error
  }
}

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