import { RootSliceState } from 'store/state'

import { UserState } from 'store/rest/users/users.state'
import { DEFAULT_USER } from 'store/rest/users/users.slice'

const UsersSelectors = {
  user: (id: string) => (state: RootSliceState): UserState => state.rest.users.data[id] || DEFAULT_USER,
}

export default UsersSelectors
