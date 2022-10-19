export type MembersSliceState = {
  dataStatus: string,
  dataError: string,
  data: {
    [key: string]: MemberState
  },
}

export type MemberState = {
  dataStatus: string,
  dataError: string,
  data: any,
}