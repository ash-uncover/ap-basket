import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  Select,
  FormGroup,
  FormItem,
  FormLabel,
} from 'fundamental-react'

import appSelectors from 'store/app/app.selectors'

import { Themes } from 'lib/theme'
import { Languages } from 'lib/language'

import { changeLanguage } from 'services/laguage.service'
import { changeTheme } from 'services/theme.service'

import './SettingsDialog.css'

const SettingsDialog = ({
  show,
  onClose
}) => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const theme = useSelector(appSelectors.theme)
  const language = useSelector(appSelectors.language)

  // Events //

  const onLanguageChange = (event, language) => {
    changeLanguage(dispatch, language.key)
  }

  const onThemeChange = (event, theme) => {
    changeTheme(dispatch, theme.key)
  }

  // Rendering //

  return (
    <Dialog
      className='settings-dialog'
      actions={[(
        <Button
          option='emphasized'
          onClick={onClose}
        >
          {t('OK')}
        </Button>
      )]}
      show={show}
      title={t('app.settings.dialog.title')}
    >

      <FormGroup>
        <FormItem>
          <FormLabel>
            {t('app.settings.dialog.fields.language')}
          </FormLabel>
          <Select
            aria-label='Primary'
            selectedKey={language}
            options={Languages.map(({ id, name }) => ({ key: id, text: name }))}
            onSelect={onLanguageChange}
          />
        </FormItem>
      </FormGroup>

      <FormGroup>
        <FormItem>
          <FormLabel>
            {t('app.settings.dialog.fields.theme')}
          </FormLabel>
          <Select
            aria-label='Primary'
            selectedKey={theme}
            options={Themes.map(({ id, name }) => ({ key: id, text: name }))}
            onSelect={onThemeChange}
          />
        </FormItem>
      </FormGroup>

    </Dialog>

  )
}

export default SettingsDialog
