import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import DataStates from 'lib/constants/DataStates'

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
  },

  extraReducers: {
    'sessions/getSessionParticipantsSuccess': getSessionParticipantsSuccess,
    'users/getUserParticipantsSuccess': getUserParticipantsSuccess,
  }
})

export default ParticipantsSlice
