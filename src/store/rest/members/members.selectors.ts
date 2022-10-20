import { RootSliceState } from 'store/state'

import { DEFAULT_MEMBER } from 'store/rest/members/members.slice'
import { MemberState } from 'store/rest/members/members.state'

const MembersSelectors = {
  members: (state: RootSliceState) => Object.values(state.rest.members.data),

  member: (memberId: string) => (state: RootSliceState): MemberState => {
    return state.rest.members.data[memberId] || DEFAULT_MEMBER(memberId)
  },

  sectionMembers: (sectionId: string) => (state: RootSliceState): MemberState[] => {
    return MembersSelectors.members(state)
      .filter(member => member.data?.sectionId === sectionId)
  },

  userMembers: (userId: string) => (state: RootSliceState): MemberState[] => {
    return MembersSelectors.members(state)
      .filter(member => member.data?.userId === userId)
  },
}

export default MembersSelectors
