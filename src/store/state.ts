import AppSliceState from 'store/app/app.state'
import AuthSliceState from 'store/auth/auth.state'
import RestSliceState from 'store/rest/rest.state'

export type RootSliceState = {
  app: AppSliceState,
  auth: AuthSliceState,
  rest: RestSliceState,
}