import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

import { UsersSliceState, UserState } from 'store/rest/users/users.state'

// STATE //

const initialState: UsersSliceState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_USER = (userId: string): UserState => {
  return {
    data: { id: userId },
    dataStatus: DataStates.NEVER,
    dataError: null,

    membersStatus: DataStates.NEVER,
    membersError: null,

    participantsStatus: DataStates.NEVER,
    participantsError: null,
  }
}



// REDUCERS //

// getUser //

export type getUserRequestPayload = {
  id: string,
}
const getUserRequest: CaseReducer<UsersSliceState, PayloadAction<getUserRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getUserSuccessPayload = {
  id: string,
  data: any,
}
export const getUserSuccess: CaseReducer<UsersSliceState, PayloadAction<getUserSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getUserFailurePayload = {
  id: string,
  error: string,
}
export const getUserFailure: CaseReducer<UsersSliceState, PayloadAction<getUserFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// getUserMembers //

export type getUserMembersRequestPayload = {
  id: string,
}
export const getUserMembersRequest: CaseReducer<UsersSliceState, PayloadAction<getUserMembersRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    membersStatus: DataStates.FETCHING,
    membersError: null
  }
}
export type getUserMembersSuccessPayload = {
  id: string,
  data: any,
}
export const getUserMembersSuccess: CaseReducer<UsersSliceState, PayloadAction<getUserMembersSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    membersStatus: DataStates.SUCCESS,
    membersError: null,
  }
}
export type getUserMembersFailurePayload = {
  id: string,
  error: string,
}
export const getUserMembersFailure: CaseReducer<UsersSliceState, PayloadAction<getUserMembersFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    membersStatus: DataStates.FAILURE,
    membersError: action.payload.error
  }
}

// getUserParticipants //

export type getUserParticipantsRequestPayload = {
  id: string,
}
export const getUserParticipantsRequest: CaseReducer<UsersSliceState, PayloadAction<getUserParticipantsRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    participantsStatus: DataStates.FETCHING,
    participantsError: null
  }
}
export type getUserParticipantsSuccessPayload = {
  id: string,
  data: any,
}
export const getUserParticipantsSuccess: CaseReducer<UsersSliceState, PayloadAction<getUserParticipantsSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    participantsStatus: DataStates.SUCCESS,
    participantsError: null,
  }
}
export type getUserParticipantsFailurePayload = {
  id: string,
  error: string,
}
export const getUserParticipantsFailure: CaseReducer<UsersSliceState, PayloadAction<getUserParticipantsFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_USER(action.payload.id)),
    participantsStatus: DataStates.FAILURE,
    participantsError: action.payload.error
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

    getUserMembersRequest,
    getUserMembersSuccess,
    getUserMembersFailure,

    getUserParticipantsRequest,
    getUserParticipantsSuccess,
    getUserParticipantsFailure,
  },
})

export default UsersSlice
