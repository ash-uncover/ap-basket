import React, { ReactElement, useEffect, useState } from 'react'

import { Avatar, AvatarProperties } from 'components/fiori/avatar/Avatar'
import { Badge, BadgeProperties } from 'components/fiori/badge/Badge'

export type CardProperties = {
  badge?: BadgeProperties
  header: CardHeaderProperties
  footer?: CardFooterProperties
  children?: ReactElement | ReactElement[],
  onClick?: () => void
}

export const Card = ({
  badge,
  header,
  footer,
  children,
}: CardProperties) => {

  // Events //


  // Rendering //

  const classes = ['fd-card']

  return (
    <div
      className={classes.join(' ')}
    >
      {badge ? <Badge {...badge} /> : null}
      <CardHeader {...header} />
      {children ?
        <div
          className='fd-card__content'
          role='group'
          aria-label='Card Content'
        >
          {children}
        </div>
        : null}
      <CardFooter {...footer} />
    </div>
  )
}

export type CardHeaderProperties = {
  avatar?: AvatarProperties
  title?: string
  titleCounter?: string
  subTitle?: string
  onClick?: () => void
}

export const CardHeader = ({
  avatar,
  title,
  titleCounter,
  subTitle,
  onClick,
}: CardHeaderProperties) => {

  // Events //

  const onClicked = () => {
    onClick && onClick()
  }

  const onKeyUp = (event) => {
    switch (event.code) {
      case 'Enter':
      case 'Space': {
        event.stopPropagation()
        onClick()
      }
      default: {
        break;
      }
    }
  }


  // Rendering //

  const classes = ['fd-card__header']

  return (
    <a
      className={classes.join(' ')}
      tabIndex={0}
      onClick={onClicked}
      onKeyUp={onKeyUp}
    >
      {avatar ? <Avatar {...avatar} /> : null}
      {title || titleCounter ?
        <div className='fd-card__title-area'>
          <div className='fd-card__title'>
            {title}
          </div>
          <span className='fd-object-status fd-card__counter'>
            {titleCounter}
          </span>
        </div>
        : null}
      {subTitle ?
        <div className='fd-card__subtitle-area'>
          <div className='fd-card__subtitle'>
            {subTitle}
          </div>
        </div>
        : null}
    </a>
  )
}

export type CardFooterProperties = {
  className?: string
  children?: ReactElement | ReactElement[]
}

export const CardFooter = ({
  className,
  children,
}: CardFooterProperties) => {

  // Rendering //

  const classes = ['fd-card__footer']
  if (className) {
    classes.push(className)
  }

  return (
    <a
      className={classes.join(' ')}
    >
      {children}
    </a>
  )
}