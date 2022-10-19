import React from 'react'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import './Sections.css'
import { useUserMembers } from 'lib/helpers/users.helper'
import { useSelector } from 'react-redux'
import AuthSelectors from 'store/auth/auth.selectors'
import DataStates from 'lib/constants/DataStates'
import { useSection, useSectionMembers } from 'lib/helpers/sections.helper'

const Sections = ({ }) => {

  // Hooks //

  const userId = useSelector(AuthSelectors.userId)
  const members = useUserMembers(userId)

  // Rendering //

  const renderSections = () => {
    switch (members.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <div>loading</div>
        )
      }
      case DataStates.FAILURE: {
        return (
          <div>error</div>
        )
      }
      default: {
        if (members.data.length === 0) {
          return (
            <div>no sections</div>
          )
        }
        return members.data.map(member => <SectionTile key={member.data.id} id={member.data.sectionId} />)
      }
    }
  }

  return (
    <div className='app-content sections'>
      <Title level={1}>
        Sections
      </Title>
      <div className='sections-container'>
        {renderSections()}
      </div>
    </div>
  )
}

const SectionTile = ({ id }) => {

  // Hooks //

  const section = useSection(id)

  // Rendering //

  switch (section.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <Tile>
          <Tile.Content title='Tile Title'>
            <BusyIndicator show size='m' />
          </Tile.Content>
        </Tile>
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <Tile onClick={() => { }}>
          <Tile.Header subtitle='Tile Subtitle'>
            {section.data.name}
          </Tile.Header>
          <Tile.Content title='Tile Title'>
            <p>Tile Description</p>
          </Tile.Content>
          <SectionTileFooter id={id} />
        </Tile>
      )
    }
  }
}

const SectionTileFooter = ({ id }) => {

  // Hooks //

  const members = useSectionMembers(id)

  // Rendering //

  switch (members.status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <Tile.Footer>
            <BusyIndicator show size='xs' />
        </Tile.Footer>
      )
    }
    case DataStates.FAILURE: {
      return (
        <Tile.Footer />
      )
    }
    default: {
      return (
        <Tile.Footer>
          {members.data.length} Members
        </Tile.Footer>
      )
    }
  }
}

export default Sections
