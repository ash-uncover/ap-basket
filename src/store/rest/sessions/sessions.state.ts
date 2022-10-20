export type SessionsSliceState = {
  dataStatus: string,
  dataError: string,
  data: {
    [key: string]: SessionState
  },
}

export type SessionState = {
  dataStatus: string,
  dataError: string,
  data: any,

  participantsStatus: string,
  participantsError: string,
}