import { RootSliceState } from 'store/state'

const UsersSelectors = {
  user: (id) => (state: RootSliceState) => state.rest.users.data[id],
}

export default UsersSelectors
