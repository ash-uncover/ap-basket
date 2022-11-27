import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

import { SectionsState, SectionState } from 'store/rest/sections/sections.state'

// STATE //

const initialState: SectionsState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_SECTION = (sectionId: string): SectionState => {
  return {
    data: { id: sectionId },
    dataStatus: DataStates.NEVER,
    dataError: null,

    membersStatus: DataStates.NEVER,
    membersError: null,

    sessionsStatus: DataStates.NEVER,
    sessionsError: null,
  }
}
// REDUCERS //

// getSection //

export type getSectionRequestPayload = {
  id: string,
}
export const getSectionRequest: CaseReducer<SectionsState, PayloadAction<getSectionRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getSectionSuccessPayload = {
  id: string,
  data: any,
}
export const getSectionSuccess: CaseReducer<SectionsState, PayloadAction<getSectionSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getSectionFailurePayload = {
  id: string,
  error: string,
}
export const getSectionFailure: CaseReducer<SectionsState, PayloadAction<getSectionFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// putSection //

export type putSectionRequestPayload = {
  sectionId: string,
}
export const putSectionRequest: CaseReducer<SectionsState, PayloadAction<putSectionRequestPayload>> = (state, action) => {
  state.data[action.payload.sectionId] = {
    ...(state.data[action.payload.sectionId] || DEFAULT_SECTION(action.payload.sectionId)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type putSectionSuccessPayload = {
  sectionId: string,
  data: any,
}
export const putSectionSuccess: CaseReducer<SectionsState, PayloadAction<putSectionSuccessPayload>> = (state, action) => {
  state.data[action.payload.sectionId] = {
    ...(state.data[action.payload.sectionId] || DEFAULT_SECTION(action.payload.sectionId)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type putSectionFailurePayload = {
  sectionId: string,
  error: string,
}
export const putSectionFailure: CaseReducer<SectionsState, PayloadAction<putSectionFailurePayload>> = (state, action) => {
  state.data[action.payload.sectionId] = {
    ...(state.data[action.payload.sectionId] || DEFAULT_SECTION(action.payload.sectionId)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// getSectionMembers //

export type getSectionMembersRequestPayload = {
  id: string,
}
export const getSectionMembersRequest: CaseReducer<SectionsState, PayloadAction<getSectionMembersRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    membersStatus: DataStates.FETCHING,
    membersError: null
  }
}
export type getSectionMembersSuccessPayload = {
  id: string,
  data: any,
}
export const getSectionMembersSuccess: CaseReducer<SectionsState, PayloadAction<getSectionMembersSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    membersStatus: DataStates.SUCCESS,
    membersError: null,
  }
}
export type getSectionMembersFailurePayload = {
  id: string,
  error: string,
}
export const getSectionMembersFailure: CaseReducer<SectionsState, PayloadAction<getSectionMembersFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    membersStatus: DataStates.FAILURE,
    membersError: action.payload.error
  }
}

// getSectionSessions //

export type getSectionSessionsRequestPayload = {
  id: string,
}
export const getSectionSessionsRequest: CaseReducer<SectionsState, PayloadAction<getSectionSessionsRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    sessionsStatus: DataStates.FETCHING,
    sessionsError: null
  }
}
export type getSectionSessionsSuccessPayload = {
  id: string,
  data: any,
}
export const getSectionSessionsSuccess: CaseReducer<SectionsState, PayloadAction<getSectionSessionsSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    sessionsStatus: DataStates.SUCCESS,
    sessionsError: null,
  }
}
export type getSectionSessionsFailurePayload = {
  id: string,
  error: string,
}
export const getSectionSessionsFailure: CaseReducer<SectionsState, PayloadAction<getSectionSessionsFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SECTION(action.payload.id)),
    sessionsStatus: DataStates.FAILURE,
    sessionsError: action.payload.error
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

    putSectionRequest,
    putSectionSuccess,
    putSectionFailure,

    getSectionMembersRequest,
    getSectionMembersSuccess,
    getSectionMembersFailure,

    getSectionSessionsRequest,
    getSectionSessionsSuccess,
    getSectionSessionsFailure,
  },
})

export default SectionsSlice
