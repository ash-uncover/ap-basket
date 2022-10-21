import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionSessions } from 'lib/helpers/sections.helper'
import { useSession } from 'lib/helpers/sessions.helper'

import {
  BusyIndicator,
  Tile,
  Title,
} from 'fundamental-react'

import { ObjectList } from 'components/fiori/object/ObjectList'
import { ObjectListItem } from 'components/fiori/object/ObjectListItem'

import DataStates from 'lib/constants/DataStates'

import './SectionTabGeneral.css'

const SectionTabGeneral = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()

  const sessions = useSectionSessions(sectionId)

  // Rendering //

  // Rendering //

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
      intro={session.data.name}
    />
  )
}

export default SectionTabGeneral
