import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import AuthSliceState from 'store/auth/auth.state'

// STATE //

const ALPHA_BASKET_AUTH = 'alpha-basket-auth'
const USE_LOCAL_STORAGE = true

if (!USE_LOCAL_STORAGE) {
  localStorage.setItem(ALPHA_BASKET_AUTH, null)
}

const store = ({ token, userId, username }) => {
  localStorage.setItem(ALPHA_BASKET_AUTH, JSON.stringify({
    userId,
    username,
    token
  }))
}

const load = () => JSON.parse(localStorage.getItem(ALPHA_BASKET_AUTH))

const storedState = USE_LOCAL_STORAGE ? load() : {}

const initialState: AuthSliceState = {
  roles: null,
  token: null,
  userId: null,
  username: null,
  ...storedState,
}

// REDUCERS //

// Logon //

const logonRequest: CaseReducer<AuthSliceState, PayloadAction<string>> = (state, action) => {
  state.username = action.payload
  store(state)
}
type PayloadAuth = {
  userId: string,
  username: string,
  token: string,
  roles?: string[] | null
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
  store(state)
}
const logonFailure: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.username = null
  state.token = null
  state.roles = null
  store(state)
}

// Logout //

const logoutRequest: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
}
const logoutSuccess: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.userId = null
  state.token = null
  state.roles = null
  store(state)
}
const logoutFailure: CaseReducer<AuthSliceState, PayloadAction<void>> = (state, action) => {
  state.userId = null
  state.token = null
  state.roles = null
  store(state)
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
