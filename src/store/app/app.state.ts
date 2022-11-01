type AppSliceState = {
  busy: boolean,
  busyMessage: string,
  init: boolean,
  language: string,
  theme: string,
  dialog: string | null,
  dialogParams: any | null,
}

export default AppSliceState