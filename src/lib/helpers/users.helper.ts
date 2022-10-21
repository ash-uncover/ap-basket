import DataStates, { mergeDataStates } from 'lib/constants/DataStates'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestService from 'services/rest.service'
import AuthSelectors from 'store/auth/auth.selectors'
import MembersSelectors from 'store/rest/members/members.selectors'
import { MemberState } from 'store/rest/members/members.state'
import ParticipantsSelectors from 'store/rest/participants/participants.selectors'
import { ParticipantState } from 'store/rest/participants/participants.state'
import SectionsSelectors from 'store/rest/sections/sections.selectors'
import { SectionState } from 'store/rest/sections/sections.state'
import UsersSelectors from 'store/rest/users/users.selectors'
import UsersSlice from 'store/rest/users/users.slice'
import { getSection } from './sections.helper'

export const getUser = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserRequest({ id }))

  try {
    const data = await RestService.api.users.get(token, id)
    dispatch(UsersSlice.actions.getUserSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserFailure({ id, error }))
    throw error
  }
}

export const getUserMembers = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserMembersRequest({ id }))

  try {
    const data = await RestService.api.users.members.get(token, id)
    dispatch(UsersSlice.actions.getUserMembersSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserMembersFailure({ id, error }))
    throw error
  }
}

export const getUserParticipants = async (dispatch, token: string, id: string) => {
  dispatch(UsersSlice.actions.getUserParticipantsRequest({ id }))

  try {
    const data = await RestService.api.users.participants.get(token, id)
    dispatch(UsersSlice.actions.getUserParticipantsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(UsersSlice.actions.getUserParticipantsFailure({ id, error }))
    throw error
  }
}

export const useUser = (userId: string) => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const user = useSelector(UsersSelectors.user(userId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.dataStatus)) {
      getUser(dispatch, token, userId)
    }
  }, [user.dataStatus])
  return user
}

export const useUserMembers = (userId: string): { data: MemberState[], status: string, error: string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const user = useSelector(UsersSelectors.user(userId))
  const members = useSelector(MembersSelectors.userMembers(userId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.membersStatus)) {
      getUserMembers(dispatch, token, userId)
    }
  }, [user.membersStatus])
  return {
    data: members,
    status: user.membersStatus,
    error: user.membersError
  }
}

export const useUserParticipants = (userId: string): { data: ParticipantState[], status: string, error: string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const user = useSelector(UsersSelectors.user(userId))
  const participants = useSelector(ParticipantsSelectors.userParticipants(userId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.participantsStatus)) {
      getUserParticipants(dispatch, token, userId)
    }
  }, [user.participantsStatus])
  return {
    data: participants,
    status: user.participantsStatus,
    error: user.participantsError
  }
}

export const useUserSections = (userId: string): { data: SectionState[], status: string, error: string } => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const user = useSelector(UsersSelectors.user(userId))

  const members = useSelector(MembersSelectors.userMembers(userId))
  useEffect(() => {
    if ([DataStates.NEVER, DataStates.OUTDATED].includes(user.membersStatus)) {
      getUserMembers(dispatch, token, userId)
    }
  }, [user.membersStatus])

  const sections = useSelector(SectionsSelectors.userSections(userId))
  const sectionsStatus = mergeDataStates(sections.map(section => section.dataStatus))
  useEffect(() => {
    sections.forEach(section => {
      if ([DataStates.NEVER, DataStates.OUTDATED].includes(section.dataStatus)) {
        getSection(dispatch, token, section.data.id)
      }
    })
  }, [sections])

  // console.log(sections)
  // console.log(sectionsStatus)
  return {
    data: sections,
    status: mergeDataStates([
      user.membersStatus,
      sectionsStatus
    ]),
    error: user.membersError
  }
}