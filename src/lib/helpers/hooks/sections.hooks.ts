import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import DataStates, { mergeDataStates } from "lib/constants/DataStates"
import AuthSelectors from "store/auth/auth.selectors"
import MembersSelectors from "store/rest/members/members.selectors"
import { MemberState } from "store/rest/members/members.state"
import SectionsSelectors from "store/rest/sections/sections.selectors"
import SessionsSelectors from "store/rest/sessions/sessions.selectors"
import { SessionState } from "store/rest/sessions/sessions.state"
import UsersSelectors from "store/rest/users/users.selectors"
import { UserState } from "store/rest/users/users.state"
import { getSection, getSectionMembers, getSectionSessions } from "../rest/sections.rest.helper"
import { getUser } from "../rest/users.rest.helper"

export const useSection = (id:string) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const section = useSelector(SectionsSelectors.section(id))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(section.dataStatus)) {
      getSection(dispatch, token, id)
    }
  }, [section.dataStatus])
  return section
}

export const useSectionMembers = (id:string): { data:MemberState[], status:string, error:string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const section = useSelector(SectionsSelectors.section(id))
  const members = useSelector(MembersSelectors.sectionMembers(id))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(section.membersStatus)) {
      getSectionMembers(dispatch, token, id)
    }
  }, [section.membersStatus])
  return {
    data: members,
    status: section.membersStatus,
    error: section.membersError
  }
}

export const useSectionSessions = (id:string): { data:SessionState[], status:string, error:string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const section = useSelector(SectionsSelectors.section(id))
  const sessions = useSelector(SessionsSelectors.sectionSessions(id))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(section.sessionsStatus)) {
      getSectionSessions(dispatch, token, id)
    }
  }, [section.sessionsStatus])
  return {
    data: sessions,
    status: section.sessionsStatus,
    error: section.sessionsError
  }
}

export const useSectionUsers = (sectionId: string): { data: UserState[], status: string, error: string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const section = useSelector(SectionsSelectors.section(sectionId))

  const members = useSelector(MembersSelectors.userMembers(sectionId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(section.membersStatus)) {
      getSectionMembers(dispatch, token, sectionId)
    }
  }, [section.membersStatus])

  const users = useSelector(UsersSelectors.sectionUsers(sectionId))
  useEffect(() => {
    users.forEach(user => {
      if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.dataStatus)) {
        getUser(dispatch, token, user.data.id)
      }
    })
  }, [users])

  return {
    data: users,
    status: mergeDataStates([
      section.membersStatus,
      ...users.map(user => user.dataStatus)
    ]),
    error: section.membersError
  }
}
