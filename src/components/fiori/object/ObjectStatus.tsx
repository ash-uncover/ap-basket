import React from 'react'

export type ObjectStatusProperties = {
  icon?: string
  iconOnly?: boolean
  text: string
  inverted?: boolean
  large?: boolean
  semantic?: string
}

export const ObjectStatus = ({
  icon,
  iconOnly,
  text,
  inverted,
  large,
  semantic,
}: ObjectStatusProperties) => {

  // Rendering //

  const classes = ['fd-object-status']
  if (semantic) {
    classes.push(`fd-object-status--${semantic}`)
  }
  if (inverted) {
    classes.push('fd-object-status--inverted')
  }
  if (large) {
    classes.push('fd-object-status--large')
  }

  return (
    <span className={classes.join(' ')}>
      <i
        className={`fd-object-status__icon sap-icon--${icon}`}
        aria-label={iconOnly ? text : null}
        role={iconOnly ? null : 'presentation'}
      ></i>
      {!iconOnly ?
        <span className='fd-object-status__text'>
          {text}
        </span>
        : null}
    </span>
  )
}