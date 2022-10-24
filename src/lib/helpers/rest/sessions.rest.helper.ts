import RestService from 'services/rest.service'
import SessionsSlice from 'store/rest/sessions/sessions.slice'

export const getSession = async (dispatch, token: string, id: string) => {
  dispatch(SessionsSlice.actions.getSessionRequest({ id }))

  try {
    const data = await RestService.api.sessions.$sessionId.get(token, id)
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
    const data = await RestService.api.sessions.$sessionId.participants.get(token, id)
    dispatch(SessionsSlice.actions.getSessionParticipantsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SessionsSlice.actions.getSessionParticipantsFailure({ id, error }))
    throw error
  }
}