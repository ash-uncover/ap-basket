import appSlice from 'store/app/app.slice'
import { injectCss } from 'lib/utils/html.utils'

export const changeTheme = (dispatch, theme: string) => {
  dispatch(appSlice.actions.setBusy({ busy: true, busyMessage: 'Changing Theme' }))
  dispatch(appSlice.actions.setTheme(theme))
  Promise.allSettled([
    injectCss('theming-base-content', `https://unpkg.com/@sap-theming/theming-base-content/content/Base/baseLib/${theme}/css_variables.css`),
    injectCss('theming', `https://unpkg.com/fundamental-styles@0.24.4/dist/theming/${theme}.css`),
  ])
    .finally(() => {
      dispatch(appSlice.actions.setBusy({ busy: false }))
    })
}