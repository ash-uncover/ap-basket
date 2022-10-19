import { MembersSliceState } from './members/members.state'
import { SectionsSliceState } from './sections/sections.state'
import { UsersSliceState } from 'store/rest/users/users.state'

type RestSliceState = {
  members: MembersSliceState,
  sections: SectionsSliceState,
  users: UsersSliceState,
}

export default RestSliceState