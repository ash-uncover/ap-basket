import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AppSlice from 'store/app/app.slice'
import AuthSelectors from 'store/auth/auth.selectors'

import { postSession } from 'lib/helpers/rest/sessions.rest.helper'
import { Button, ButtonDesigns, Calendar, Dialog, FormStepInput, Title } from '@uncover/fundamentals-react'


const CreateSessionDialog = ({
  sectionId
}) => {

  // Hooks //

  const { t } = useTranslation()

  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)

  const [date, setDate] = useState(null)
  const [maxParticipants, setMaxParticipants] = useState(10)

  // Events //

  const onDateChange = (value) => {
    setDate(value)
  }

  const onMaxParticipantsChange = (value) => {
    setMaxParticipants(value)
  }

  const onValidate = () => {
    postSession(dispatch, token, {
      date,
      maxParticipants,
      sectionId
    })
    dispatch(AppSlice.actions.closeDialog())
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
            design={ButtonDesigns.EMPHASIZED}
            disabled={!date}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Calendar
          compact
          selectedDate={date}
          onSelectedDateChange={onDateChange}
        />
      </div>
      <div
        style={{
          padding: '0 2rem'
        }}
      >
        <FormStepInput
          label='Max Participants'
          min={1}
          value={maxParticipants}
          onChange={onMaxParticipantsChange}
        />
      </div>
    </Dialog>
  )
}

export default CreateSessionDialog
