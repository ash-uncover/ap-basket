import DataStates, { mergeDataStates } from "lib/constants/DataStates"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RestService from "services/rest.service"
import AuthSelectors from "store/auth/auth.selectors"
import MembersSelectors from "store/rest/members/members.selectors"
import { MemberState } from "store/rest/members/members.state"
import SectionsSelectors from "store/rest/sections/sections.selectors"
import SectionsSlice from "store/rest/sections/sections.slice"
import SessionsSelectors from "store/rest/sessions/sessions.selectors"
import { SessionState } from "store/rest/sessions/sessions.state"

export const getSection = async (dispatch, token:string, id:string) => {
  dispatch(SectionsSlice.actions.getSectionRequest({ id }))

  try {
    const data = await RestService.api.sections.get(token, id)
    dispatch(SectionsSlice.actions.getSectionSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionFailure({ id, error }))
    throw error
  }
}

export const getSectionMembers = async (dispatch, token:string, id:string) => {
  dispatch(SectionsSlice.actions.getSectionMembersRequest({ id }))

  try {
    const data = await RestService.api.sections.members.get(token, id)
    dispatch(SectionsSlice.actions.getSectionMembersSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionMembersFailure({ id, error }))
    throw error
  }
}

export const getSectionSessions = async (dispatch, token:string, id:string) => {
  dispatch(SectionsSlice.actions.getSectionSessionsRequest({ id }))

  try {
    const data = await RestService.api.sections.sessions.get(token, id)
    dispatch(SectionsSlice.actions.getSectionSessionsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionSessionsFailure({ id, error }))
    throw error
  }
}

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
