type AppSliceState = {
  init: boolean

  busy: boolean
  busyMessage: string

  language: string
  theme: string

  dialog: string | null
  dialogParams: any | null

  pageExpanded: boolean
}

export default AppSliceState