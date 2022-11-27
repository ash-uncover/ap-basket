import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import appSelectors from 'store/app/app.selectors'

import { Themes } from 'lib/theme'
import { Languages } from 'lib/language'

import { changeLanguage } from 'services/laguage.service'
import { changeTheme } from 'services/theme.service'

import AppSlice from 'store/app/app.slice'

import {
  Button,
  ButtonDesigns,
  Dialog,
  FormSelect,
  Title,
  TitleLevels,
} from '@uncover/fundamentals-react'

// import './SettingsDialog.css'

const SettingsDialog = () => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const theme = useSelector(appSelectors.theme)
  const language = useSelector(appSelectors.language)

  // Events //

  const onLanguageChange = (language) => {
    changeLanguage(dispatch, language.key)
  }

  const onThemeChange = (theme) => {
    changeTheme(dispatch, theme.key)
  }

  const onClose = () => {
    dispatch(AppSlice.actions.closeDialog())
  }

  // Rendering //

  return (
    <Dialog
      className='settings-dialog'
      header={{
        left: [
          <Title
            text={t('app.settings.dialog.title')}
            level={TitleLevels.H5}
          />
        ]
      }}
      footer={{
        right: [(
          <Button
            design={ButtonDesigns.EMPHASIZED}
            text={t('OK')}
            onClick={onClose}
          />
        )]
      }}
    >
      <div
        className='fd-form-group'
        style={{
          height: '300px',
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
        <FormSelect
          label={t('app.settings.dialog.fields.language')}
          placeholder={'Language'}
          selectedKey={language}
          items={Languages.map(({ id, name }) => {
            return {
              key: id,
              text: name,
              selected: id === language
            }
          })}
          onChange={onLanguageChange}
        />

        <FormSelect
          label={t('app.settings.dialog.fields.theme')}
          placeholder={'Theme'}
          items={Themes.map(({ id, name }) => {
            return {
              key: id,
              text: name,
              selected: id === theme
            }
          })}
          onChange={onThemeChange}
        />
      </div>

    </Dialog >

  )
}

export default SettingsDialog
