import { combineReducers } from 'redux'

import MembersSlice from 'store/rest/members/members.slice'
import ParticipantsSlice from 'store/rest/participants/participants.slice'
import SectionsSlice from 'store/rest/sections/sections.slice'
import SessionsSlice from 'store/rest/sessions/sessions.slice'
import UsersSlice from 'store/rest/users/users.slice'

export const reducer = combineReducers({
    members: MembersSlice.reducer,
    participants: ParticipantsSlice.reducer,
    sections: SectionsSlice.reducer,
    sessions: SessionsSlice.reducer,
    users: UsersSlice.reducer,
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
