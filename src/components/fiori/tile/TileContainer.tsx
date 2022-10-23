import React, { ReactElement, useRef } from 'react'

export type TileContainerProperties = {
  className?: string
  children?: string | ReactElement | ReactElement[]
}

export const TileContainer = ({
  className,
  children,
}: TileContainerProperties) => {

  // Rendering //

  const classes = ['fd-tile fd-tile-container']
  if (className) {
    classes.push(className)
  }

  return (
    <div
      className={classes.join(' ')}
      style={{
        minHeight: 0,
        maxHeight: 'none',
        height: 'auto',
        minWidth: 0,
        maxWidth: 'none',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}