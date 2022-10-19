import { RootSliceState } from 'store/state'

import { DEFAULT_SECTION } from 'store/rest/sections/sections.slice'
import { SectionState } from 'store/rest/sections/sections.state'

const SectionsSelectors = {
  section: (id: string) => (state: RootSliceState): SectionState => state.rest.sections.data[id] || DEFAULT_SECTION,
}

export default SectionsSelectors
