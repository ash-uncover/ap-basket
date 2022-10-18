import CONFIG from 'configuration'

export const getAuth = async ({ username, password }) => {
  const token = `${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`

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
    return {
      token,
      data
    }

  } catch (error) {
    throw new Error(error)
  }
}

export const deleteAuth = async (token) => {
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

export const getUser = async (token, userId) => {
  const url = `${CONFIG.ALPHA_BASKET_REST_URL}/rest/users/${userId}`
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
    users: {
      get: getUser
    }
  }
}

export default RestService