import React, { ReactElement } from 'react'
import { ToolbarSpacer } from './ToolbarSpacer'

export type ToolbarProperties = {
  title?: string
  active?: boolean
  clear?: boolean
  transparent?: boolean
  solid?: boolean
  children?: ReactElement | ReactElement[]
}

export const Toolbar = ({
  title,
  active,
  clear,
  transparent,
  solid,
  children,
}: ToolbarProperties) => {

  // Rendering //

  const classes = ['fd-toolbar']
  if (active) {
    classes.push('fd-toolbar-active')
  }
  if (title) {
    classes.push('fd-toolbar--title')
  }
  if (clear) {
    classes.push('fd-toolbar--clear')
  }
  if (transparent) {
    classes.push('fd-toolbar--transparent')
  }
  if (solid) {
    classes.push('fd-toolbar--solid')
  }

  return (
    <div
      className={classes.join(' ')}
    >
      {title ?
        <h4 className='fd-title fd-title--h4 fd-toolbar__title'>
          {title}
        </h4>
        : null}
      <ToolbarSpacer />
      {children}
      
    </div>
  )
}