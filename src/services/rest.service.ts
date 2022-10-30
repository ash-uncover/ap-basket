import CONFIG from 'configuration'
import { MEMBER } from 'lib/utils/entities/members.utils'
import { PARTICIPANT } from 'lib/utils/entities/participants.utils'
import { SECTION } from 'lib/utils/entities/sections.utils'
import { SESSION } from 'lib/utils/entities/sessions.utils'
import { USER } from 'lib/utils/entities/users.utils'

export const getAuth = async (token: string) => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/auth`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const deleteAuth = async (token: string) => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/auth`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'DELETE',
    headers,
  }

  try {
    await fetch(url, request)

  } catch (error) {
    throw new Error(error)
  }
}

export type postParticipantPayload = {
  userId: string,
  sessionId: string,
  status: string,
}
export const postParticipant = async (
  token: string,
  payload: postParticipantPayload
): Promise<PARTICIPANT> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/participants`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  headers.set('content-type', 'application/json; charset=UTF-8')
  const request: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export type putParticipantStatusPayload = {
  status: string,
}
export const putParticipantStatus = async (
  token: string,
  id: string,
  payload: putParticipantStatusPayload
): Promise<PARTICIPANT> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/participants/${id}/status`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  headers.set('content-type', 'application/json; charset=UTF-8')
  const request: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload)
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getSection = async (token: string, id: string): Promise<SECTION> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/sections/${id}`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getSectionMembers = async (token: string, id: string): Promise<MEMBER[]> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/sections/${id}/members`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getSectionSessions = async (token: string, id: string): Promise<SESSION[]> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/sections/${id}/sessions`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getSession = async (token: string, id: string): Promise<SESSION> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/sessions/${id}`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getSessionParticipants = async (token: string, sessionId: string): Promise<PARTICIPANT[]> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/sessions/${sessionId}/participants`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getUser = async (token: string, id: string): Promise<USER> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/users/${id}`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getUserMembers = async (token: string, userId: string): Promise<MEMBER[]> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/users/${userId}/members`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

export const getUserParticipants = async (token: string, userId: string): Promise<PARTICIPANT[]> => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/users/${userId}/participants`
  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.set('authorization', `Basic ${token}`)
  const request: RequestInit = {
    method: 'GET',
    headers,
  }

  try {
    const response = await fetch(url, request)
    const data = await response.json()
    return data

  } catch (error) {
    throw new Error(error)
  }
}

const RestService = {
  api: {
    auth: {
      get: getAuth,
      delete: deleteAuth,
    },
    participants: {
      post: postParticipant,
      $participantId: {
        status: {
          put: putParticipantStatus
        }
      }
    },
    sections: {
      $sectionId: {
        get: getSection,
        members: {
          get: getSectionMembers,
        },
        sessions: {
          get: getSectionSessions,
        },
      }
    },
    sessions: {
      post: postSession,
      $sessionId: {
        get: getSession,
        participants: {
          get: getSessionParticipants,
        },
      }
    },
    users: {
      $userId: {
        get: getUser,
        members: {
          get: getUserMembers,
        },
        participants: {
          get: getUserParticipants,
        },
      }
    },
  }
}

export default RestService