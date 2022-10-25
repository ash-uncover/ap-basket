import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'
import { PARTICIPANT } from 'lib/utils/entities/participants.utils'

import { ParticipantsSliceState, ParticipantState } from 'store/rest/participants/participants.state'
import { getSessionParticipantsSuccessPayload } from 'store/rest/sessions/sessions.slice'
import { getUserParticipantsSuccessPayload } from 'store/rest/users/users.slice'

// STATE //

const initialState: ParticipantsSliceState = {
  dataStatus: DataStates.NEVER,
  dataError: null,
  data: {},
}

export const DEFAULT_PARTICIPANT = (participantId: string): ParticipantState => {
  return {
    data: { id: participantId },
    dataStatus: DataStates.NEVER,
    dataError: null,
  }
}

// REDUCERS //

// getParticipant //

export type getParticipantRequestPayload = {
  id: string,
}
export const getParticipantRequest: CaseReducer<ParticipantsSliceState, PayloadAction<getParticipantRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type getParticipantSuccessPayload = {
  id: string,
  data: any,
}
export const getParticipantSuccess: CaseReducer<ParticipantsSliceState, PayloadAction<getParticipantSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type getParticipantFailurePayload = {
  id: string,
  error: string,
}
export const getParticipantFailure: CaseReducer<ParticipantsSliceState, PayloadAction<getParticipantFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}

// postParticipant //

export type postParticipantRequestPayload = {
}
export const postParticipantRequest: CaseReducer<ParticipantsSliceState, PayloadAction<postParticipantRequestPayload>> = (state, action) => {
}
export type postParticipantSuccessPayload = {
  data: PARTICIPANT,
}
export const postParticipantSuccess: CaseReducer<ParticipantsSliceState, PayloadAction<postParticipantSuccessPayload>> = (state, action) => {
  state.data[action.payload.data.id] = {
    ...(state.data[action.payload.data.id] || DEFAULT_PARTICIPANT(action.payload.data.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type postParticipantFailurePayload = {
  error: string,
}
export const postParticipantFailure: CaseReducer<ParticipantsSliceState, PayloadAction<postParticipantFailurePayload>> = (state, action) => {
}


// putParticipantStatus //

export type putParticipantStatusRequestPayload = {
  id: string
}
export const putParticipantStatusRequest: CaseReducer<ParticipantsSliceState, PayloadAction<putParticipantStatusRequestPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    dataStatus: DataStates.FETCHING,
    dataError: null
  }
}
export type putParticipantStatusSuccessPayload = {
  id: string,
  data: any,
}
export const putParticipantStatusSuccess: CaseReducer<ParticipantsSliceState, PayloadAction<putParticipantStatusSuccessPayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    data: action.payload.data,
    dataStatus: DataStates.SUCCESS,
    dataError: null,
  }
}
export type putParticipantStatusFailurePayload = {
  id: string,
  error: string,
}
export const putParticipantStatusFailure: CaseReducer<ParticipantsSliceState, PayloadAction<putParticipantStatusFailurePayload>> = (state, action) => {
  state.data[action.payload.id] = {
    ...(state.data[action.payload.id] || DEFAULT_PARTICIPANT(action.payload.id)),
    dataStatus: DataStates.FAILURE,
    dataError: action.payload.error
  }
}


// getSessionParticipants //

export const getSessionParticipantsSuccess: CaseReducer<ParticipantsSliceState, PayloadAction<getSessionParticipantsSuccessPayload>> = (state, action) => {
  action.payload.data.forEach(participant => {
    state.data[participant.id] = {
      ...(state.data[participant.id] || DEFAULT_PARTICIPANT(action.payload.id)),
      data: participant,
      dataStatus: DataStates.SUCCESS,
      dataError: null
    }
  })
}


// getUserParticipants //

export const getUserParticipantsSuccess: CaseReducer<ParticipantsSliceState, PayloadAction<getUserParticipantsSuccessPayload>> = (state, action) => {
  action.payload.data.forEach(participant => {
    state.data[participant.id] = {
      ...(state.data[participant.id] || DEFAULT_PARTICIPANT(action.payload.id)),
      data: participant,
      dataStatus: DataStates.SUCCESS,
      dataError: null
    }
  })
}

// SLICE //

const ParticipantsSlice = createSlice({
  name: 'participants',
  initialState,

  reducers: {
    getParticipantRequest,
    getParticipantSuccess,
    getParticipantFailure,

    postParticipantRequest,
    postParticipantSuccess,
    postParticipantFailure,

    putParticipantStatusRequest,
    putParticipantStatusSuccess,
    putParticipantStatusFailure,
  },

  extraReducers: {
    'sessions/getSessionParticipantsSuccess': getSessionParticipantsSuccess,
    'users/getUserParticipantsSuccess': getUserParticipantsSuccess,
  }
})

export default ParticipantsSlice
