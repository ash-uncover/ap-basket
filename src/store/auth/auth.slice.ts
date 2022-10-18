import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import AuthSliceState from 'store/auth/auth.state'

// STATE //

const initialState: AuthSliceState = {
  userId: null,
  username: null,
  token: null,
  roles: [],
}

// REDUCERS //

// Logon //

const logonRequest: CaseReducer<AuthSliceState, PayloadAction<String>> = (state, action) => {
  state.username = action.payload
  state.token = null
  state.roles = []
}
type PayloadAuth = {
  userId: String,
  username: String,
  token: String,
  roles?: String[]
}
const logonSuccess: CaseReducer<AuthSliceState, PayloadAction<PayloadAuth>> = (state, action) => {
  const {
    userId,
    username,
    token,
    roles
  } = action.payload
  state.userId = userId
  state.username = username
  state.token = token
  state.roles = roles
}
const logonFailure: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.username = null
  state.token = null
  state.roles = []
}

// Logout //

const logoutRequest: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
}
const logoutSuccess: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.token = null
  state.roles = []
}
const logoutFailure: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.token = null
  state.roles = []
}

// SLICE //

const AuthSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logonRequest,
    logonSuccess,
    logonFailure,

    logoutRequest,
    logoutSuccess,
    logoutFailure,
  },
})

export default AuthSlice
