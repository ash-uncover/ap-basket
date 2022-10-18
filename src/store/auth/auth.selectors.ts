import { RootSliceState } from 'store/state'

const AuthSelectors = {
  userId: (state: RootSliceState) => state.auth.userId,
  username: (state: RootSliceState) => state.auth.username,
  token: (state: RootSliceState) => state.auth.token,
  roles: (state: RootSliceState) => state.auth.roles,
}

export default AuthSelectors
