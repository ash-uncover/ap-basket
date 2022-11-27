import RestService, { putSectionPayload } from "services/rest.service"
import SectionsSlice from "store/rest/sections/sections.slice"

export const getSection = async (dispatch, token: string, id: string) => {
  dispatch(SectionsSlice.actions.getSectionRequest({ id }))

  try {
    const data = await RestService.api.sections.$sectionId.get(token, id)
    dispatch(SectionsSlice.actions.getSectionSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionFailure({ id, error }))
    throw error
  }
}

export const putSection = async (dispatch, token: string, sectionId: string, payload: putSectionPayload) => {
  dispatch(SectionsSlice.actions.putSectionRequest({ sectionId }))

  try {
    const data = await RestService.api.sections.$sectionId.put(token, sectionId, payload)
    dispatch(SectionsSlice.actions.putSectionSuccess({ sectionId, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.putSectionFailure({ sectionId, error }))
    throw error
  }
}

export const getSectionMembers = async (dispatch, token: string, id: string) => {
  dispatch(SectionsSlice.actions.getSectionMembersRequest({ id }))

  try {
    const data = await RestService.api.sections.$sectionId.members.get(token, id)
    dispatch(SectionsSlice.actions.getSectionMembersSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionMembersFailure({ id, error }))
    throw error
  }
}

export const getSectionSessions = async (dispatch, token: string, id: string) => {
  dispatch(SectionsSlice.actions.getSectionSessionsRequest({ id }))

  try {
    const data = await RestService.api.sections.$sectionId.sessions.get(token, id)
    dispatch(SectionsSlice.actions.getSectionSessionsSuccess({ id, data }))
    return data

  } catch (error) {
    dispatch(SectionsSlice.actions.getSectionSessionsFailure({ id, error }))
    throw error
  }
}