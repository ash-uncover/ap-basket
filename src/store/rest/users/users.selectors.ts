import { RootSliceState } from 'store/state'

import { UserState } from 'store/rest/users/users.state'
import { DEFAULT_USER } from 'store/rest/users/users.slice'
import ParticipantsSelectors from 'store/rest/participants/participants.selectors'
import MembersSelectors from 'store/rest/members/members.selectors'

const UsersSelectors = {
  user: (userId: string) => (state: RootSliceState): UserState => {
    return state.rest.users.data[userId] || DEFAULT_USER(userId)
  },

  sectionUsers: (sectionId: string) => (state: RootSliceState): UserState[] => {
    const members = MembersSelectors.sectionMembers(sectionId)(state)
    return members.map(member => UsersSelectors.user(member.data?.userId)(state))
  },

  sessionUsers: (sessionId: string) => (state: RootSliceState): UserState[] => {
    const participants = ParticipantsSelectors.sessionParticipants(sessionId)(state)
    return participants.map(participant => UsersSelectors.user(participant.data?.userId)(state))
  },
}

export default UsersSelectors
