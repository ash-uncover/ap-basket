import RestService, { postParticipantPayload, putParticipantStatusPayload } from 'services/rest.service'
import ParticipantsSlice from 'store/rest/participants/participants.slice'

export const postParticipant = async (dispatch, token: string, payload: postParticipantPayload) => {
  dispatch(ParticipantsSlice.actions.postParticipantRequest({}))

  try {
    const data = await RestService.api.participants.post(token, payload)
    dispatch(ParticipantsSlice.actions.postParticipantSuccess({ data }))
    return data

  } catch (error) {
    dispatch(ParticipantsSlice.actions.postParticipantFailure({ error }))
    throw error
  }
}

export const putParticipantStatus = async (dispatch, token: string, id: string, payload: putParticipantStatusPayload) => {
  dispatch(ParticipantsSlice.actions.putParticipantStatusRequest({ id }))

  try {
    const data = await RestService.api.participants.$participantId.status.put(token, id, payload)
    dispatch(ParticipantsSlice.actions.putParticipantStatusSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(ParticipantsSlice.actions.putParticipantStatusFailure({ id, error }))
    throw error
  }
}
