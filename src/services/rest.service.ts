import CONFIG from 'configuration'

export const getAuth = async (token:string) => {
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

export const deleteAuth = async (token:string) => {
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

export const getSection = async (token:string, id:string) => {
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

export const getSectionMembers = async (token:string, id:string) => {
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

export const getSectionSessions = async (token:string, id:string) => {
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

export const getSession = async (token:string, id:string) => {
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


export const getUser = async (token:string, id:string) => {
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

export const getUserMembers = async (token:string, userId:string) => {
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

const RestService = {
  api: {
    auth: {
      get: getAuth,
      delete: deleteAuth,
    },
    sections: {
      get: getSection,
      members: {
        get: getSectionMembers,
      },
      sessions: {
        get: getSectionSessions,
      },
    },
    sessions: {
      get: getSession,
    },
    users: {
      get: getUser,
      members: {
        get: getUserMembers,
      },
    },
  }
}

export default RestService