import React from 'react'
import { ButtonStyle } from '../constants/ButtonStyle'

export type ButtonProperties = {
  className?: string
  ariaLabel?: string
  style?: ButtonStyle
  icon?: string
  text?: string | number
  badge?: string
  selected?: boolean
  disabled?: boolean
  compact?: boolean
  tabIndex?: number
  type?: ButtonType
  onClick?: () => void
}

export type ButtonType = 'button' | 'submit' | 'reset'

export const Button = ({
  className,
  ariaLabel,
  style,
  icon,
  text,
  badge,
  selected,
  disabled,
  compact,
  tabIndex,
  type = 'button',
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
      aria-label={ariaLabel}
      onClick={onClicked}
      tabIndex={tabIndex ? tabIndex : 0}
      type={type}
      aria-disabled={disabled ? 'true' : null}
      disabled={disabled}
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