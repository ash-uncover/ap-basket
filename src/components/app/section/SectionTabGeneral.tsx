import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSection, useSectionMembers, useSectionSessions } from 'lib/helpers/sections.helper'
import { useSession } from 'lib/helpers/sessions.helper'

import {
  BusyIndicator,
  Title,
} from 'fundamental-react'

import { ObjectList } from 'components/fiori/object/ObjectList'
import { ObjectListItem } from 'components/fiori/object/ObjectListItem'

import DataStates from 'lib/constants/DataStates'

import './SectionTabGeneral.css'
import { Tile, TileSizes } from 'components/fiori/tile/Tile'
import { TileContainer } from 'components/fiori/tile/TileContainer'
import { useNavigate } from 'react-router-dom'

const SectionTabGeneral = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()
  const navigate = useNavigate()

  const section = useSection(sectionId)
  const members = useSectionMembers(sectionId)
  const sessions = useSectionSessions(sectionId)

  // Rendering //

  const renderTileMembers = () => {
    switch (members.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <Tile title='Members'>
            <BusyIndicator show size='s' />
          </Tile>
        )
      }
      case DataStates.FAILURE: {
        return (
          <Tile title='Members'>
            <div>error</div>
          </Tile>
        )
      }
      default: {
        return (
          <Tile
            badge={section?.data?.name}
            title='Members'
            footer='Footer Custom'
            onClick={() => navigate(`/sections/${sectionId}/members`)}
          />
        )
      }
    }
  }

  const renderTileSessions = () => {
    switch (sessions.status) {
      case DataStates.NEVER:
      case DataStates.FETCHING:
      case DataStates.FETCHING_FIRST: {
        return (
          <Tile title='Sessions'>
            <BusyIndicator show size='s' />
          </Tile>
        )
      }
      case DataStates.FAILURE: {
        return (
          <Tile title='Sessions'>
            <div>error</div>
          </Tile>
        )
      }
      default: {
        return (
          <Tile
            badge={section?.data?.name}
            title='Sessions'
            footer='Footer Custom'
            onClick={() => navigate(`/sections/${sectionId}/sessions`)}
          />
        )
      }
    }
  }

  return (
    <TileContainer>
      {renderTileMembers()}
      {renderTileSessions()}
    </TileContainer>
  )

  switch (sessions.status) {
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
      const now = new Date()
      const sessionsFuture = sessions.data.filter(session => {
        const date = new Date(session.data.date)
        return date > now
      })

      return (
        <>
          <Title level={2}>
            toto
          </Title>
          <Tile
            badge='Badge Custom'
            title='Title Custom'
            subTitle='Sub Title Custom'
            footer='Footer Custom'
          />
           <Tile
            badge='Badge Custom'
            title='Title Custom'
            subTitle='Sub Title Custom'
            footer='Footer Custom'
            size={TileSizes.MEDIUM}
          />
          <Tile
            badge='Badge Custom'
            title='Title Custom'
            subTitle='Sub Title Custom'
            footer='Footer Custom'
            size={TileSizes.SMALL}
          />
          <ObjectList
            ariaLabeledBy=''
          >
            {sessionsFuture.map(session => {
              return (
                <SectionTabGeneralSession
                  key={session.data.id}
                  sectionId={sectionId}
                  sessionId={session.data.id}
                />
              )
            }
            )}
          </ObjectList>
        </>
      )
    }
  }

  const item = {
    intro: 'hello world',
    avatar: {
      icon: 'home',
      label: 'Home',
      circle: true

    },
    title: 'My Object List Item',
    info: {
      type: 'number',
      props: {
        value: '457.00',
        unit: 'EUR'

      }
    },
    attributes: [
      {
        name: 'First Attribute',
        items: [
          {
            type: 'marker',
            props: { icon: 'flag', iconOnly: true }
          },
          {
            type: 'marker',
            props: { icon: 'favorite', iconOnly: true }
          }
        ]
      },
      {
        name: 'Second Attribute',
        items: [
          {
            type: 'status',
            props: {
              text: 'Positive Value',
              semantic: 'positive'
            }
          }
        ]
      },
      {
        name: 'Third Attribute',
        items: [
          {
            type: 'attribute',
            props: { text: 'Value' }
          }
        ]
      }
    ]
  }

  const item2 = {
    avatar: {
      icon: 'home',
      label: 'Home',
      circle: true

    },
    title: 'My Object List Item',
    info: {
      type: 'number',
      props: {
        value: '457.00',
        unit: 'EUR'

      }
    },
    attributes: [
      {
        name: 'Date',
        items: [
          {
            type: 'marker',
            props: { icon: 'flag', iconOnly: true }
          },
          {
            type: 'marker',
            props: { icon: 'favorite', iconOnly: true }
          }
        ]
      },
      {
        name: 'Second Attribute',
        items: [
          {
            type: 'status',
            props: {
              text: 'Positive Value',
              semantic: 'positive'
            }
          }
        ]
      },
      {
        name: 'Third Attribute',
        items: [
          {
            type: 'attribute',
            props: { text: 'Value' }
          }
        ]
      }
    ]
  }


  return (
    <div className=''>
      <ObjectList
        ariaLabeledBy=''
        items={[item2, item]}
      />
    </div>
  )
}

export const SectionTabGeneralSession = ({ sectionId, sessionId }) => {

  // Hooks //

  const session = useSession(sessionId)

  // Rendering //

  return (
    <ObjectListItem
      intro={session.data.date}
    >
      <div>toto</div>
    </ObjectListItem>
  )
}

export default SectionTabGeneral
