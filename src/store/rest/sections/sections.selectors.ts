import { RootSliceState } from 'store/state'

import { DEFAULT_SECTION } from 'store/rest/sections/sections.slice'
import { SectionState } from 'store/rest/sections/sections.state'
import MembersSelectors from '../members/members.selectors'

const SectionsSelectors = {
  section: (sectionId: string) => (state: RootSliceState): SectionState => {
    return state.rest.sections.data[sectionId] || DEFAULT_SECTION(sectionId)
  },

  userSections: (userId: string) => (state: RootSliceState): SectionState[] => {
    const members = MembersSelectors.userMembers(userId)(state)
    return members.map(member => SectionsSelectors.section(member.data?.sectionId)(state))
  }
}

export default SectionsSelectors
