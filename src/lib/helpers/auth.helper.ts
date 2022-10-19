import RestService from 'services/rest.service'
import AuthSlice from 'store/auth/auth.slice'
import { getUser } from 'lib/helpers/users.helper'

type loginArgs = {
  username: string,
  password?: string,
  token?: string,
}
export const login = async (dispatch, { username, password, token }: loginArgs) => {
  let currentToken = token
  if (!currentToken) {
    currentToken = `${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`
  }
  dispatch(AuthSlice.actions.logonRequest(username))

  try {
    const authData = await RestService.api.auth.get(currentToken)
    const userData = await getUser(dispatch, currentToken, authData.userId)

    dispatch(AuthSlice.actions.logonSuccess({
      userId: authData.userId,
      username,
      token: currentToken,
      roles: userData.roles
    }))

  } catch (error) {
    dispatch(AuthSlice.actions.logonFailure())
  }
}

export const logout = async (dispatch) => {
  dispatch(AuthSlice.actions.logoutSuccess())
}