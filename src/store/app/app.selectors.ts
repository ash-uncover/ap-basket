import { RootSliceState } from 'store/state'

const AppSelectors = {
  busy: (state: RootSliceState) => state.app.busy,
  busyMessage: (state: RootSliceState) => state.app.busyMessage,
  language: (state: RootSliceState) => state.app.language,
  theme: (state: RootSliceState) => state.app.theme,
}

export default AppSelectors
