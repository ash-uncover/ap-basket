import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import DataStates from 'lib/constants/DataStates'

import { useUser } from 'lib/helpers/users.helper'

import './Section.css'
import SectionMembers from 'components/app/section/SectionMembers'
import Table from 'components/fiori/Table'

const Section = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const section = useSection(id)

  // Rendering //

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <BusyIndicator show size='l' />
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <div className='section app-content'>
          <Title level={1}>
            {t('app.section.title', { name: section.data.name })}
          </Title>
          <SectionMembers id={id} />
        </div>
      )
    }
  }
}

export default Section
