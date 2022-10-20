import { RootSliceState } from 'store/state'

import { DEFAULT_SESSION } from 'store/rest/sessions/sessions.slice'
import { SessionState } from 'store/rest/sessions/sessions.state'

const SessionsSelectors = {
  sessions: (state: RootSliceState) => Object.values(state.rest.sessions.data),

  session: (sessionId: string) => (state: RootSliceState): SessionState => {
    return state.rest.sessions.data[sessionId] || DEFAULT_SESSION(sessionId)
  },

  sectionSessions: (id: string) => (state: RootSliceState): SessionState[] => {
    return SessionsSelectors.sessions(state)
      .filter(session => session.data?.sectionId === id)
  },
}

export default SessionsSelectors
