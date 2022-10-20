import { RootSliceState } from 'store/state'

import { DEFAULT_SECTION } from 'store/rest/sections/sections.slice'
import { SectionState } from 'store/rest/sections/sections.state'

const SectionsSelectors = {
  section: (sectionId: string) => (state: RootSliceState): SectionState => {
    return state.rest.sections.data[sectionId] || DEFAULT_SECTION(sectionId)
  },
}

export default SectionsSelectors
