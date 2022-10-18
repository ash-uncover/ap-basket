import { combineReducers } from 'redux'

import usersSlice from 'store/rest/users/users.slice'

export const reducer = combineReducers({
    users: usersSlice.reducer,
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
