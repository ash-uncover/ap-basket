import RestService from 'services/rest.service'
import UsersSlice from 'store/rest/users/users.slice'

export const getUser = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserRequest({ id }))

  try {
    const data = await RestService.api.users.get(token, id)
    dispatch(UsersSlice.actions.getUserSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserFailure({ id, error }))
    throw error
  }
}

export const getUserMembers = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserMembersRequest({ id }))

  try {
    const data = await RestService.api.users.members.get(token, id)
    dispatch(UsersSlice.actions.getUserMembersSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserMembersFailure({ id, error }))
    throw error
  }
}

export const getUserParticipants = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserParticipantsRequest({ id }))

  try {
    const data = await RestService.api.users.participants.get(token, id)
    dispatch(UsersSlice.actions.getUserParticipantsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserParticipantsFailure({ id, error }))
    throw error
  }
}