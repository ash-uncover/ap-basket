import React, { ReactElement } from 'react'
import { ObjectListItem, ObjectListItemProperties } from './ObjectListItem'

export type ObjectListProperties = {
  ariaLabeledBy: string
  items?: ObjectListItemProperties[]
  children?: ReactElement | ReactElement[]
  bordered?: boolean
}

export const ObjectList = ({
  ariaLabeledBy,
  items,
  children,
  bordered,
}: ObjectListProperties) => {

  // Rendering //

  const classes = ['fd-list fd-object-list']
  if (!bordered) {
    classes.push('fd-list--no-border')
  }

  return (
    <ul
      className={classes.join(' ')}
      role='list'
      aria-labelledby={ariaLabeledBy}
    >
      {items?.map((item, index) => {
        return (
          <ObjectListItem key={`item-${index}`} {...item} />
        )
      })}
      {children}
    </ul>
  )
}