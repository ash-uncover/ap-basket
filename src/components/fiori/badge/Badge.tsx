import React from 'react'

import { AccentColor } from 'components/fiori/constants/AccentColor'

export type BadgeProperties = {
  text: string,
  accentColor?: AccentColor,
}

export const Badge = ({
  text,
  accentColor,
}: BadgeProperties) => {

  // Rendering //

  const classes = ['fd-badge']
  if (accentColor) {
    classes.push(`fd-info-label--${accentColor}`)
  }

  return (
    <div className={classes.join(' ')}>
      {text}
    </div>
  )
}