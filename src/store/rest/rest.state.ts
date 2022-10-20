import { MembersSliceState } from 'store/rest/members/members.state'
import { SectionsSliceState } from 'store/rest/sections/sections.state'
import { SessionsSliceState } from 'store/rest/sessions/sessions.state'
import { UsersSliceState } from 'store/rest/users/users.state'

type RestSliceState = {
  members: MembersSliceState,
  sections: SectionsSliceState,
  sessions: SessionsSliceState,
  users: UsersSliceState,
}

export default RestSliceState