import React, { ReactElement } from 'react'

export type TileContainerProperties= {
  children?: ReactElement | ReactElement[]
}

export const TileContainer = ({
  children
}) => {

  // Rendering //

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        padding: '2rem',
      }}
    >
      {children}
    </div>
  )
}