import RestService from 'services/rest.service'
import AuthSlice from 'store/auth/auth.slice'
import { getUser } from 'lib/helpers/users.helper'

export const login = async (dispatch, { username, password }) => {
  dispatch(AuthSlice.actions.logonRequest(username))

  try {
    const {
      token,
      data
    } = await RestService.api.auth.get({ username, password })

    const userData = await getUser(dispatch, token, data.userId)

    dispatch(AuthSlice.actions.logonSuccess({
      userId: data.userId,
      username,
      token,
      roles: userData.roles
    }))

  } catch (error) {
    dispatch(AuthSlice.actions.logonFailure())
  }
}

export const logout = async (dispatch) => {
  dispatch(AuthSlice.actions.logoutSuccess())
}