import { configureStore } from '@reduxjs/toolkit'

import appSlice from 'store/app/app.slice'
import authSlice from 'store/auth/auth.slice'
import restSlice from 'store/rest/rest.slice'

export default configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    rest: restSlice.reducer,
  }
})
