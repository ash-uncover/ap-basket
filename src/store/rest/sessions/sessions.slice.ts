import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'
import { SESSION } from 'lib/utils/entities/sessions.utils'

import { SessionsSliceState, SessionState } from 'store/rest/sessions/sessions.state'
import SectionsSlice, { getSectionSessionsSuccessPayload } from '../sections/sections.slice'

// STATE //

const initialState: SessionsSliceState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_SESSION = (sessionId: string): SessionState => {
  return {
    data: { id: sessionId },
    dataStatus: DataStates.NEVER,
    dataError: null,

    participantsStatus: DataStates.NEVER,
    participantsError: null,
  }
}

// REDUCERS //

// postSession //

export type postSessionRequestPayload = {
}
export const postSessionRequest: CaseReducer<SessionsSliceState, PayloadAction<postSessionRequestPayload>> = (state, action) => {
}
export type postSessionSuccessPayload = {
  data: SESSION,
}
export const postSessionSuccess: CaseReducer<SessionsSliceState, PayloadAction<postSessionSuccessPayload>> = (state, action) => {
  state.data[action.payload.data.id] = {
    ...(state.data[action.payload.data.id] || DEFAULT_SESSION(action.payload.data.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type postSessionFailurePayload = {
  error: string,
}
export const postSessionFailure: CaseReducer<SessionsSliceState, PayloadAction<postSessionFailurePayload>> = (state, action) => {
}

// getSession //

export type getSessionRequestPayload = {
  id: string,
}
export const getSessionRequest: CaseReducer<SessionsSliceState, PayloadAction<getSessionRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getSessionSuccessPayload = {
  id: string,
  data: any,
}
export const getSessionSuccess: CaseReducer<SessionsSliceState, PayloadAction<getSessionSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getSessionFailurePayload = {
  id: string,
  error: string,
}
export const getSessionFailure: CaseReducer<SessionsSliceState, PayloadAction<getSessionFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// getSessionParticipants //

export type getSessionParticipantsRequestPayload = {
  id: string,
}
export const getSessionParticipantsRequest: CaseReducer<SessionsSliceState, PayloadAction<getSessionParticipantsRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    participantsStatus: DataStates.FETCHING,
    participantsError: null
  }
}
export type getSessionParticipantsSuccessPayload = {
  id: string,
  data: any,
}
export const getSessionParticipantsSuccess: CaseReducer<SessionsSliceState, PayloadAction<getSessionParticipantsSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    participantsStatus: DataStates.SUCCESS,
    participantsError: null,
  }
}
export type getSessionParticipantsFailurePayload = {
  id: string,
  error: string,
}
export const getSessionParticipantsFailure: CaseReducer<SessionsSliceState, PayloadAction<getSessionParticipantsFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_SESSION(action.payload.id)),
    participantsStatus: DataStates.FAILURE,
    participantsError: action.payload.error
  }
}

// getSectionSessions //

export const getSectionSessionsSuccess: CaseReducer<SessionsSliceState, PayloadAction<getSectionSessionsSuccessPayload>> = (state, action) => {
  action.payload.data.forEach(session => {
    state.data[session.id] = {
      ...(state.data[session.id] || DEFAULT_SESSION(action.payload.id)),
      data: session,
      dataStatus: DataStates.SUCCESS,
      dataError: null
    }
  })
}

// SLICE //

const SessionsSlice = createSlice({
  name: 'sessions',
  initialState,

  reducers: {
    postSessionRequest,
    postSessionSuccess,
    postSessionFailure,

    getSessionRequest,
    getSessionSuccess,
    getSessionFailure,

    getSessionParticipantsRequest,
    getSessionParticipantsSuccess,
    getSessionParticipantsFailure,
  },

  extraReducers: (builder) => {
    builder.addCase(SectionsSlice.actions.getSectionSessionsSuccess, getSectionSessionsSuccess)
  }
})

export default SessionsSlice
