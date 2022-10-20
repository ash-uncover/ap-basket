import React, { ReactElement } from 'react'

export type AvatarProperties = {
  label: string
  icon?: string
  initials?: string
  size?: AvatarSize
  accentColor?: AvatarColor
  shell?: boolean
  bordered?: boolean
  transparent?: boolean
  circle?: boolean
}

export type AvatarColor = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export const Avatar = ({
  label,
  icon,
  initials,
  size = 'm',
  accentColor,
  shell,
  bordered,
  transparent,
  circle,
}: AvatarProperties) => {

  // Check

  // Rendering //

  const classes = ['fd-avatar']
  if (size) {
    classes.push(`fd-avatar--${size}`)
  }
  if (accentColor) {
    classes.push(`fd-avatar--accent-color-${accentColor}`)
  }
  if (shell) {
    classes.push('fd-avatar--shell')
  }
  if (bordered) {
    classes.push('fd-avatar--border')
  }
  if (transparent) {
    classes.push('fd-avatar--transparent')
  }
  if (circle) {
    classes.push('fd-avatar--circle')
  }

  return (
    <span
      className={classes.join(' ')}
      aria-label={label}
    >
      {icon ?
        <i
          className={`fd-avatar__icon sap-icon--${icon}`}
          role='presentation'
        ></i>
        : null}
      {icon ? null : initials}
    </span>
  )
}