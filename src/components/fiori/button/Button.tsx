import React from 'react'
import { ButtonStyle } from '../constants/ButtonStyle'

export type ButtonProperties = {
  className?: string
  style?: ButtonStyle
  icon?: string
  text?: string
  badge?: string
  selected?: boolean
  compact?: boolean
  onClick?: () => void
}

export const Button = ({
  className,
  style,
  icon,
  text,
  badge,
  selected,
  compact,
  onClick,
}: ButtonProperties) => {

  // Events //

  const onClicked = () => {
    onClick && onClick()
  }

  // Rendering //

  const classes = ['fd-button']
  if (className) {
    classes.push(className)
  }
  if (style) {
    classes.push(`fd-button--${style}`)
  }
  if (selected) {
    classes.push('is-selected')
  }
  if (compact) {
    classes.push('fd-button--compact')
  }

  return (
    <button
      className={classes.join(' ')}
      onClick={onClicked}
    >
      {icon ?
        <i className={`sap-icon--${icon}`} role='presentation'></i>
        : null}

      {text ?
        <span className='fd-button__text'>
          {text}
        </span>
        : null}

      {badge ?
        <span className='fd-button__badge'>
          {badge}
        </span>
        : null}
    </button>
  )
}