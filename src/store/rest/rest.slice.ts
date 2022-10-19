import { combineReducers } from 'redux'

import MembersSlice from 'store/rest/members/members.slice'
import SectionsSlice from 'store/rest/sections/sections.slice'
import UsersSlice from 'store/rest/users/users.slice'

export const reducer = combineReducers({
    members: MembersSlice.reducer,
    sections: SectionsSlice.reducer,
    users: UsersSlice.reducer,
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
