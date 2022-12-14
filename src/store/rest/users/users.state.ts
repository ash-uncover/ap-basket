export type UsersSliceState = {
  dataStatus: string,
  dataError: string,
  data: {
    [key: string]: UserState
  },
}

export type UserState = {
  dataStatus: string,
  dataError: string,
  data: any,

  membersStatus: string,
  membersError: string,

  participantsStatus: string,
  participantsError: string,
}