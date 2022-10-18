type AuthSliceState = {
  userId: String | undefined | null,
  username: String | undefined | null,
  token: String | undefined | null,
  roles: String[],
}

export default AuthSliceState