import React from 'react'

import { AccentColor } from 'components/fiori/constants/AccentColor'

export type InfoLabelProperties = {
  icon?: string,
  text?: string,
  numeric?: boolean
  accentColor?: AccentColor,
}

export const InfoLabel = ({
  icon,
  text,
  numeric,
  accentColor,
}: InfoLabelProperties) => {

  // Rendering //

  const classes = ['fd-info-label']
  if (accentColor) {
    classes.push(`fd-info-label--${accentColor}`)
  }
  if (numeric) {
    classes.push('fd-info-label--numeric')
  }

  return (
    <span className={classes.join(' ')}>
      {icon ?
        <i
          className={`fd-info-label__icon sap-icon--${icon}`}
          role='presentation'
        ></i>
        : null}
      {text ?
        <span className='fd-info-label__text'>
          {text}
        </span>
        : null}
    </span>
  )
}