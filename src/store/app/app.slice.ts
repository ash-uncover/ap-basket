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
  init: false,
  language: Language.DEFAULT.id,
  theme: Theme.FIORI_3.id,
  dialog: null,
  dialogParams: null,
}

// REDUCERS //

const init: CaseReducer<AppSliceState, PayloadAction<void>> = (state, action) => {
  state.init = true
}

type PayloadBusy = {
  busy: boolean,
  busyMessage?: string
}
const setBusy: CaseReducer<AppSliceState, PayloadAction<PayloadBusy>> = (state, action) => {
  const {
    busy,
    busyMessage
  } = action.payload
  state.busy = busy
  state.busyMessage = busy ? busyMessage || '' : ''
}

const setLanguage: CaseReducer<AppSliceState, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}

const setTheme: CaseReducer<AppSliceState, PayloadAction<string>> = (state, action) => {
  state.theme = action.payload
}

type PayloadDialog = {
  dialog: string | null,
  params?: any,
}
const openDialog: CaseReducer<AppSliceState, PayloadAction<PayloadDialog>> = (state, action) => {
  const {
    dialog,
    params,
  } = action.payload
  state.dialog = dialog
  state.dialogParams = params
}
const closeDialog: CaseReducer<AppSliceState, PayloadAction<void>> = (state, action) => {
  state.dialog = null
  state.dialogParams = null
}

// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    init,

    setBusy,
    setLanguage,
    setTheme,
    openDialog,
    closeDialog,
  },
})

export default AppSlice
