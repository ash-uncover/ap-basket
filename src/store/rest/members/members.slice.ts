import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

import { MembersSliceState, MemberState } from 'store/rest/members/members.state'
import { getSectionMembersSuccessPayload } from '../sections/sections.slice'
import { getUserMembersSuccessPayload } from '../users/users.slice'

// STATE //

const initialState: MembersSliceState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_MEMBER: MemberState = {
  data: null,
  dataStatus: DataStates.NEVER,
  dataError: null,
}

// REDUCERS //

// getMember //

export type getMemberRequestPayload = {
  id: string,
}
export const getMemberRequest: CaseReducer<MembersSliceState, PayloadAction<getMemberRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_MEMBER),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getMemberSuccessPayload = {
  id: string,
  data: any,
}
export const getMemberSuccess: CaseReducer<MembersSliceState, PayloadAction<getMemberSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_MEMBER),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getMemberFailurePayload = {
  id: string,
  error: string,
}
export const getMemberFailure: CaseReducer<MembersSliceState, PayloadAction<getMemberFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_MEMBER),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// getSectionMembers //

export const getSectionMembersSuccess: CaseReducer<MembersSliceState, PayloadAction<getSectionMembersSuccessPayload>> = (state, action) => {
  action.payload.data.forEach(member => {
    state.data[member.id] = {
      ...(state.data[member.id] || DEFAULT_MEMBER),
      data: member,
      dataStatus: DataStates.SUCCESS,
      dataError: null
    }
  })
}

// getUserMembers //

export const getUserMembersSuccess: CaseReducer<MembersSliceState, PayloadAction<getUserMembersSuccessPayload>> = (state, action) => {
  action.payload.data.forEach(member => {
    state.data[member.id] = {
      ...(state.data[member.id] || DEFAULT_MEMBER),
      data: member,
      dataStatus: DataStates.SUCCESS,
      dataError: null
    }
  })
}

// SLICE //

const MembersSlice = createSlice({
  name: 'members',
  initialState,

  reducers: {
    getMemberRequest,
    getMemberSuccess,
    getMemberFailure,

  },

  extraReducers: {
    'sections/getSectionMembersSuccess': getSectionMembersSuccess,
    'users/getUserMembersSuccess': getUserMembersSuccess,
  }
})

export default MembersSlice
