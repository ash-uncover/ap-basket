import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppSlice from 'store/app/app.slice'

import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'
import { Dialog } from 'components/fiori/dialog/Dialog'
import { Title } from 'components/fiori/title/Title'

const CreateSessionDialog = ({ }) => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()

  // Events //

  const onValidate = () => {
  }

  const onCancel = () => {
    dispatch(AppSlice.actions.setDialog({ dialog: null }))
  }

  // Rendering //

  return (
    <Dialog
      header={{
        left: [
          <Title
            level={2}
            levelVisual={6}
            text={'Create Session'}
          />
        ]
      }}
      footer={{
        right: [
          <Button
            text='OK'
            compact
            style={ButtonStyles.EMPHASIZED}
            onClick={onValidate}
          />,
          <Button
            compact
            text='Cancel'
            onClick={onCancel}
          />
        ]
      }}
    />
  )
}

export default CreateSessionDialog
