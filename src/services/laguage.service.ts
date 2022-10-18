import appSlice from 'store/app/app.slice'
import i18next from 'i18next'

export const changeLanguage = (dispatch, language: string) => {
  dispatch(appSlice.actions.setLanguage(language))
  i18next.changeLanguage(language);
}