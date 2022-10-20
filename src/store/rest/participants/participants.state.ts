export type ParticipantsSliceState = {
  dataStatus: string,
  dataError: string,
  data: {
    [key: string]: ParticipantState
  },
}

export type ParticipantState = {
  dataStatus: string,
  dataError: string,
  data: any,
}