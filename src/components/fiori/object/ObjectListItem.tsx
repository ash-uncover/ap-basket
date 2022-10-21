import React, { ReactElement } from 'react'
import { Avatar, AvatarProperties } from '../avatar/Avatar'
import { ObjectAttribute } from './ObjectAttribute'
import { ObjectIdentifier } from './ObjectIdentifier'
import { ObjectMarker } from './ObjectMarker'
import { ObjectNumber } from './ObjectNumber'
import { ObjectStatus } from './ObjectStatus'

/*
<ObjectListItem
  intro='hello world'
  avatar={{
    icon: 'home',
    label: 'Home',
    circle: true
  }}
  title='My Object List Item'
  info={{
    type: 'number',
    props: {
      value: '457.00',
      unit: 'EUR'
    }
  }}
  attributes={[
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
    },
  ]}
/>
*/

export type ObjectListItemProperties = {
  intro?: string
  avatar?: AvatarProperties
  title?: string
  info?: any
  attributes?: any[]
  children?: ReactElement | ReactElement[]
}
export type ObjectListItemHeaderProperties = {
  avatar?: ReactElement
  left?: ReactElement | ReactElement[]
  right?: ReactElement | ReactElement[]
  children?: ReactElement | ReactElement[]
}
export type ObjectListItemRowProperties = {
  left?: ReactElement | ReactElement[]
  right?: ReactElement | ReactElement[]
  children?: ReactElement | ReactElement[]
}

export const ObjectListItem = ({
  intro,
  avatar,
  title,
  info,
  attributes,
  children,
}: ObjectListItemProperties) => {

  // Rendering //

  return (

    <li
      className='fd-list__item fd-object-list__item'
      style={{
        height: 'auto'
      }}
      role='listitem'
      tabIndex={0}
    >
      <div className='fd-object-list__container'>
        {intro ?
          <div className='fd-object-list__intro'>
            {intro}
          </div>
          : null}
        {info ?
          <ObjectListItemHeader
            avatar={<Avatar {...avatar} size='s' />}
            left={
              <ObjectIdentifier
                className='fd-object-list__object-identifier'
                title={title}
              />
            }
            right={
              <ObjectListItemInfo
                type={info.type}
                props={info.props}
              />
            }
          />
          : null}
        <div className='fd-object-list__content'>
          {attributes?.map((attribute, index) => {
            return (
              <ObjectListItemRow key={`attribute-${index}`}>
                <ObjectListItemRowLeft>
                  <ObjectAttribute text={attribute.name} />
                </ObjectListItemRowLeft>
                <ObjectListItemRowRight>
                  {attribute.items?.map((item, indexItem) => {
                    return (
                      <ObjectListItemInfo
                        key={`item-${index}-${indexItem}`}
                        type={item.type}
                        props={item.props}
                      />
                    )
                  })}
                </ObjectListItemRowRight>
              </ObjectListItemRow>
            )
          })}
          {children}
        </div>
      </div>
    </li>
  )
}

const ObjectListItemHeader = ({
  avatar,
  left,
  right,
  children
}: ObjectListItemHeaderProperties) => {
  return (
    <div className='fd-object-list__header'>
      {avatar ? avatar : children}
      <ObjectListItemHeaderLeft>
        {left}
      </ObjectListItemHeaderLeft>
      <ObjectListItemHeaderRight>
        {right}
      </ObjectListItemHeaderRight>
    </div>
  )
}

const ObjectListItemHeaderLeft = ({ children }) => {
  return (
    <div className='fd-object-list__header-left'>
      {children}
    </div>
  )
}

const ObjectListItemHeaderRight = ({ children }) => {
  return (
    <div className='fd-object-list__header-right'>
      {children}
    </div>
  )
}

const ObjectListItemRow = ({
  left,
  right,
  children,
}: ObjectListItemRowProperties) => {
  return (
    <div className='fd-object-list__row'>
      {left ?
        <ObjectListItemRowLeft>
          {left}
        </ObjectListItemRowLeft>
        : null}
      {right ?
        <ObjectListItemRowRight>
          {right}
        </ObjectListItemRowRight>
        : null}
      {(left || right) ? null : children}
    </div>
  )
}

const ObjectListItemRowLeft = ({ children }) => {
  return (
    <div className='fd-object-list__row-left'>
      {children}
    </div>
  )
}

const ObjectListItemRowRight = ({ children }) => {
  return (
    <div className='fd-object-list__row-right'>
      {children}
    </div>
  )
}

const ObjectListItemInfo = ({ type, props }) => {
  switch (type) {
    case 'attribute': {
      return (
        <ObjectAttribute
          text={props.text}
        />
      )
    }
    case 'marker': {
      return (
        <ObjectMarker
          icon={props.icon}
          iconOnly={props.iconOnly}
          text={props.text}
        />
      )
    }
    case 'number': {
      return (
        <ObjectNumber
          className='fd-object-list__object-number'
          value={props.value}
          unit={props.unit}
        />
      )
    }
    case 'status': {
      return (
        <ObjectStatus
          text={props.text}
          semantic={props.semantic}
        />
      )
    }
    case 'identifier': {
      return (
        <ObjectIdentifier
          className='fd-object-list__object-identifier'
          title={props.title}
        />
      )
    }
    default: {
      return null
    }
  }
}