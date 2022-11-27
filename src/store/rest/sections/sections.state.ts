export interface SectionsState {
  dataStatus: string
  dataError: string
  data: {
    [key: string]: SectionState
  }
}

export interface SectionState {
  dataStatus: string
  dataError: string
  data: SectionData | null

  membersStatus: string
  membersError: string

  sessionsStatus: string
  sessionsError: string
}

export interface SectionData {
  id: string
  name?: string
  description?: string
}