import React from 'react'
import { useTranslation } from 'react-i18next'

import { ObjectListItem } from 'components/fiori/object/ObjectListItem'

import './SectionTabGeneral.css'
import { ObjectList } from 'components/fiori/object/ObjectList'

const SectionTabGeneral = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  // Rendering //

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


return (
  <div className=''>
      <ObjectList
        ariaLabeledBy=''
        items={[item, item]}
      />
  </div>
)
}

export default SectionTabGeneral
