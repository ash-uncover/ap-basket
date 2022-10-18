import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from 'lib/language'
import Theme from 'lib/theme'

import AppSliceState from 'store/app/app.state'

// STATE //

const initialState: AppSliceState = {
  busy: false,
  busyMessage: '',
  language: Language.DEFAULT.id,
  theme: Theme.FIORI_3.id,
}

// REDUCERS //

type PayloadBusy = {
  busy: Boolean,
  busyMessage?: String
}
const setBusy: CaseReducer<AppSliceState, PayloadAction<PayloadBusy>> = (state, action) => {
  const {
    busy,
    busyMessage
  } = action.payload
  state.busy = busy
  state.busyMessage = busy ? busyMessage || '' : ''
}

const setLanguage: CaseReducer<AppSliceState, PayloadAction<String>> = (state, action) => {
  state.language = action.payload
}

const setTheme: CaseReducer<AppSliceState, PayloadAction<String>> = (state, action) => {
  state.theme = action.payload
}

// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setBusy,
    setLanguage,
    setTheme,
  },
})

export default AppSlice
