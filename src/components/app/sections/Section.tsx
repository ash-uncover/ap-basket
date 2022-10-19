import React from 'react'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'
import DataStates from 'lib/constants/DataStates'

import './Sections.css'

const Section = ({ id }) => {

  // Hooks //

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
        <div>{section.data.name}</div>
      )
    }
  }
}

export default Section
