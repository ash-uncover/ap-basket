import { RootSliceState } from 'store/state'

const base = (state: RootSliceState) => state.app

export const busy = (state: RootSliceState) => base(state).busy
export const busyMessage = (state: RootSliceState) => base(state).busyMessage

export const language = (state: RootSliceState) => base(state).language
export const theme = (state: RootSliceState) => base(state).theme

export const dialog = (state: RootSliceState) => base(state).dialog
export const dialogParams = (state: RootSliceState) => base(state).dialogParams

export const pageExpanded = (state: RootSliceState) => base(state).pageExpanded

const AppSelectors = {
  busy,
  busyMessage,

  language,
  theme,

  dialog,
  dialogParams,

  pageExpanded,
}

export default AppSelectors
