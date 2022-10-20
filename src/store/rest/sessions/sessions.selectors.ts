import { RootSliceState } from 'store/state'

import { DEFAULT_SESSION } from 'store/rest/sessions/sessions.slice'
import { SessionState } from 'store/rest/sessions/sessions.state'

const SessionsSelectors = {
  session: (id: string) => (state: RootSliceState): SessionState => state.rest.sessions.data[id] || DEFAULT_SESSION,
}

export default SessionsSelectors
