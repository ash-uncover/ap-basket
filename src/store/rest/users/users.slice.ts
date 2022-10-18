import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

import UsersSliceState from 'store/rest/users/users.state'

// STATE //

const initialState: UsersSliceState = {
  status: DataStates.NEVER,
  error: null,
  data: {},
}

// REDUCERS //

// Logon //

const getUserRequest: CaseReducer<UsersSliceState, PayloadAction<string>> = (state, action) => {
  state.data[action.payload] = {
    ...state.data[action.payload],
    status: DataStates.FETCHING,
    error: null
  }
}
const getUserSuccess: CaseReducer<UsersSliceState, PayloadAction<any>> = (state, action) => {
  state.data[action.payload.id] = {
    data: action.payload,
    status: DataStates.SUCCESS,
    error: null,
  }
}
const getUserFailure: CaseReducer<UsersSliceState, PayloadAction<string>> = (state, action) => {
  state.data[action.payload] = {
    ...state.data[action.payload],
    status: DataStates.FAILURE,
    error: action.payload
  }
}

// SLICE //

const UsersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    getUserRequest,
    getUserSuccess,
    getUserFailure,
  },
})

export default UsersSlice
