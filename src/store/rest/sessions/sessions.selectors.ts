import { RootSliceState } from 'store/state'

import { DEFAULT_SESSION } from 'store/rest/sessions/sessions.slice'
import { SessionState } from 'store/rest/sessions/sessions.state'

const SessionsSelectors = {
  sessions: (state: RootSliceState) => Object.values(state.rest.sessions.data),
  session: (id: string) => (state: RootSliceState): SessionState => state.rest.sessions.data[id] || DEFAULT_SESSION,

  sectionSessions: (id: string) => (state: RootSliceState): SessionState[] => {
    return SessionsSelectors.sessions(state).filter(session => session.data?.sectionId === id)
  },
}

export default SessionsSelectors
