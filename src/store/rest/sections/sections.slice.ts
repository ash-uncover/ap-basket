import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

import { SectionsSliceState, SectionState } from 'store/rest/sections/sections.state'

// STATE //

const initialState: SectionsSliceState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_SECTION: SectionState = {
  data: null,
  dataStatus: DataStates.NEVER,
  dataError: null,

  membersStatus: DataStates.NEVER,
  membersError: null,

  eventsStatus: DataStates.NEVER,
  eventsError: null,
}

// REDUCERS //

// getSection //

export type getSectionRequestPayload = {
  id: string,
}
export const getSectionRequest: CaseReducer<SectionsSliceState, PayloadAction<getSectionRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getSectionSuccessPayload = {
  id: string,
  data: any,
}
export const getSectionSuccess: CaseReducer<SectionsSliceState, PayloadAction<getSectionSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getSectionFailurePayload = {
  id: string,
  error: string,
}
export const getSectionFailure: CaseReducer<SectionsSliceState, PayloadAction<getSectionFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// getSectionMembers //

export type getSectionMembersRequestPayload = {
  id: string,
}
export const getSectionMembersRequest: CaseReducer<SectionsSliceState, PayloadAction<getSectionMembersRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    membersStatus: DataStates.FETCHING,
    membersError: null
  }
}
export type getSectionMembersSuccessPayload = {
  id: string,
  data: any,
}
export const getSectionMembersSuccess: CaseReducer<SectionsSliceState, PayloadAction<getSectionMembersSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    membersStatus: DataStates.SUCCESS,
    membersError: null,
  }
}
export type getSectionMembersFailurePayload = {
  id: string,
  error: string,
}
export const getSectionMembersFailure: CaseReducer<SectionsSliceState, PayloadAction<getSectionMembersFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION),
    membersStatus: DataStates.FAILURE,
    membersError: action.payload.error
  }
}

// SLICE //

const SectionsSlice = createSlice({
  name: 'sections',
  initialState,

  reducers: {
    getSectionRequest,
    getSectionSuccess,
    getSectionFailure,

    getSectionMembersRequest,
    getSectionMembersSuccess,
    getSectionMembersFailure,
  },
})

export default SectionsSlice
