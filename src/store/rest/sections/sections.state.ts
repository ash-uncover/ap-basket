export type SectionsSliceState = {
  dataStatus: string,
  dataError: string,
  data: {
    [key: string]: SectionState
  },
}

export type SectionState = {
  dataStatus: string,
  dataError: string,
  data: any,

  membersStatus: string,
  membersError: string,

  eventsStatus: string,
  eventsError: string,
}