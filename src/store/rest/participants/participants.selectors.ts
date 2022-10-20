import { RootSliceState } from 'store/state'

import { DEFAULT_PARTICIPANT } from 'store/rest/participants/participants.slice'
import { ParticipantState } from 'store/rest/participants/participants.state'

const ParticipantsSelectors = {
  participants: (state: RootSliceState) => Object.values(state.rest.participants.data),

  participant: (participantId: string) => (state: RootSliceState): ParticipantState => {
    return state.rest.participants.data[participantId] || DEFAULT_PARTICIPANT(participantId)
  },

  sessionParticipants: (sessionId: string) => (state: RootSliceState): ParticipantState[] => {
    return ParticipantsSelectors.participants(state)
      .filter(participant => participant.data?.sessionId === sessionId)
  },

  userParticipants: (userId: string) => (state: RootSliceState): ParticipantState[] => {
    return ParticipantsSelectors.participants(state)
      .filter(participant => participant.data?.userId === userId)
  },
}

export default ParticipantsSelectors
