import { RootSliceState } from 'store/state'

import { DEFAULT_MEMBER } from 'store/rest/members/members.slice'
import { MemberState } from 'store/rest/members/members.state'

const MembersSelectors = {
  members: (state: RootSliceState) => Object.values(state.rest.members.data),
  member: (id: string) => (state: RootSliceState): MemberState => state.rest.members.data[id] || DEFAULT_MEMBER,

  sectionMembers: (id: string) => (state: RootSliceState): MemberState[] => {
    return MembersSelectors.members(state).filter(member => member.data?.sectionId === id)
  },

  userMembers: (id: string) => (state: RootSliceState): MemberState[] => {
    return MembersSelectors.members(state)
      .filter(m => m.data?.userId === id)
  },
}

export default MembersSelectors
