import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import appSelectors from 'store/app/app.selectors'

import { Select, SelectItem } from 'components/fiori/Select'

import { Themes } from 'lib/theme'
import { Languages } from 'lib/language'

import { changeLanguage } from 'services/laguage.service'
import { changeTheme } from 'services/theme.service'

import './SettingsDialog.css'

const SettingsDialog = ({ onClose }) => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const theme = useSelector(appSelectors.theme)
  const language = useSelector(appSelectors.language)

  // Events //

  const onThemeChange = (theme) => {
    changeTheme(dispatch, theme)
  }

  const onLanguageChange = (language) => {
    changeLanguage(dispatch, language)
  }

  // Rendering //

  return (
    <section className='settings-dialog fd-dialog-docs-static fd-dialog fd-dialog--active'>
      <div
        className='fd-dialog__content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='settings-dialog-title'
      >

        <header className='fd-dialog__header fd-bar fd-bar--header'>
          <div className='fd-bar__left'>
            <div className='fd-bar__element'>
              <h2
                id='settings-dialog-title'
                className='fd-title fd-title--h5'
              >
                {t('app.settings.dialog.title')}
              </h2>
            </div>
          </div>
        </header>

        <div className='fd-dialog__body'>
          <div className='fd-container fd-form-layout-grid-container'>

            <div className='fd-row'>
              <label
                className="fd-form-label"
                id="formSelectLabel"
              >
                {t('app.settings.dialog.fields.language')}
              </label>
              <Select>
                {Languages.map(({ id, name }) => (
                  <SelectItem
                    key={id}
                    id={id}
                    title={name}
                    selected={id === language}
                    onSelect={() => onLanguageChange(id)}
                  />
                ))}
              </Select>
            </div>

            <div className='fd-row'>
              <label
                id="formSelectLabel"
                className="fd-form-label"
              >
                {t('app.settings.dialog.fields.theme')}
              </label>
              <Select>
                {Themes.map(({ id, name }) => (
                  <SelectItem
                    key={id}
                    id={id}
                    title={name}
                    selected={id === theme}
                    onSelect={() => onThemeChange(id)}
                  />
                ))}
              </Select>
            </div>

          </div>
        </div>

        <footer className='fd-dialog__footer fd-bar fd-bar--footer'>
          <div className='fd-bar__right'>
            <div className='fd-bar__element'>
              <button
                className='fd-dialog__decisive-button fd-button fd-button--compact fd-button--emphasized'
                onClick={onClose}
              >
                {t('OK')}
              </button>
            </div>
          </div>
        </footer>

      </div>
    </section >
  )
}

export default SettingsDialog
