import { RootSliceState } from 'store/state'

import { UserState } from 'store/rest/users/users.state'
import { DEFAULT_USER } from 'store/rest/users/users.slice'
import ParticipantsSelectors from '../participants/participants.selectors'

const UsersSelectors = {
  user: (userId: string) => (state: RootSliceState): UserState => {
    return state.rest.users.data[userId] || DEFAULT_USER(userId)
  },

  sessionUsers: (sessionId: string) => (state: RootSliceState): UserState[] => {
    const participants = ParticipantsSelectors.sessionParticipants(sessionId)(state)
    return participants.map(participant => UsersSelectors.user(participant.data?.userId)(state))
  }
}

export default UsersSelectors
