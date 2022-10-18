import RestService from 'services/rest.service'
import UsersSlice from 'store/rest/users/users.slice'

export const getUser = async (dispatch, token, userId) => {
    dispatch(UsersSlice.actions.getUserRequest(userId))

  try {
    const data = await RestService.api.users.get(token, userId)
    dispatch(UsersSlice.actions.getUserSuccess(data))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserFailure())
    throw error
  }
}