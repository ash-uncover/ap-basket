import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppSlice from 'store/app/app.slice'

import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'
import { Calendar } from 'components/fiori/calendar/Calendar'
import { Dialog } from 'components/fiori/dialog/Dialog'
import { Title } from 'components/fiori/title/Title'
import { FormInput } from 'components/fiori/form/FormInput'
import { FormStepInput } from 'components/fiori/form/FormStepInput'

const CreateSessionDialog = ({ }) => {

  // Hooks //

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [date, setDate] = useState(new Date())
  const [maxParticipants, setMaxParticipants] = useState(1)

  // Events //

  const onMaxParticipantsChange = (value) => {
    setMaxParticipants(value)
  }

  const onValidate = () => {
  }

  const onCancel = () => {
    dispatch(AppSlice.actions.closeDialog())
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
    >
      <Calendar compact />
      <FormInput
        label='Date'
      />
      <FormStepInput
        label='Max Participants'
        min={1}
        value={maxParticipants}
        onChange={onMaxParticipantsChange} />
    </Dialog>
  )
}

export default CreateSessionDialog
