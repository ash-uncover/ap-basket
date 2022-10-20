import { MembersSliceState } from 'store/rest/members/members.state'
import { ParticipantsSliceState } from 'store/rest/participants/participants.state'
import { SectionsSliceState } from 'store/rest/sections/sections.state'
import { SessionsSliceState } from 'store/rest/sessions/sessions.state'
import { UsersSliceState } from 'store/rest/users/users.state'

type RestSliceState = {
  members: MembersSliceState,
  participants: ParticipantsSliceState,
  sections: SectionsSliceState,
  sessions: SessionsSliceState,
  users: UsersSliceState,
}

export default RestSliceState