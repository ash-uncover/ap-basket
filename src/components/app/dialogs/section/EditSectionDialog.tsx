import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useSection } from 'lib/helpers/hooks/sections.hooks'

import AppSlice from 'store/app/app.slice'
import AuthSelectors from 'store/auth/auth.selectors'

import {
  Button,
  ButtonDesigns,
  Dialog,
  FormInput,
  FormTextArea,
  InputStates,
  Title,
  TitleLevels,
} from '@uncover/fundamentals-react'
import { putSection } from 'lib/helpers/rest/sections.rest.helper'

interface EditSectionDialogProperties {
  sectionId: string
}

const EditSectionDialog = ({
  sectionId
}: EditSectionDialogProperties) => {

  // Hooks //

  const { t } = useTranslation()

  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)

  const section = useSection(sectionId)

  const [name, setName] = useState(section.data.name)
  const [description, setDescription] = useState(section.data.description)

  // Events //

  const handleNameChange = (value) => {
    setName(value)
  }

  const handleDescriptionChange = (value) => {
    setDescription(value)
  }

  const handleValidate = async () => {
    try {
      await putSection(dispatch, token, sectionId, {
        name,
        description
      })
    } catch (e) {}
    dispatch(AppSlice.actions.closeDialog())
  }

  const handleCancel = () => {
    dispatch(AppSlice.actions.closeDialog())
  }

  // Rendering //

  const nameState = !name ? InputStates.ERROR : null
  const nameStateMessage = !name ? t('validation.mandatory', { field: t('entities.section.name') }) : null

  const descriptionState = !description ? InputStates.ERROR : null
  const descriptionStateMessage = !description ? t('validation.mandatory', { field: t('entities.section.description') }) : null

  return (
    <Dialog
      header={{
        left: [
          <Title
            level={TitleLevels.H2}
            levelVisual={TitleLevels.H5}
            text={t('app.sections.edit.title')}
          />
        ]
      }}
      footer={{
        right: [
          <Button
            compact
            design={ButtonDesigns.EMPHASIZED}
            disabled={!name || !description}
            text={t('OK')}
            onClick={handleValidate}
          />,
          <Button
            compact
            text={t('CANCEL')}
            onClick={handleCancel}
          />
        ]
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '0 2rem',
          width: '300px',
          height: '400px',
        }}
      >
        <FormInput
          required
          label={t('entities.section.name')}
          value={name}
          onChange={handleNameChange}
          state={nameState}
          stateMessage={nameStateMessage}
        />
        <FormTextArea
          required
          label={t('entities.section.description')}
          value={description}
          onChange={handleDescriptionChange}
          state={descriptionState}
          stateMessage={descriptionStateMessage}
        />

      </div>
    </Dialog>
  )
}

export default EditSectionDialog
