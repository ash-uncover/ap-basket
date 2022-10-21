import React, { ReactElement } from 'react'

export type TileProperties = {
  className?: string
  badge?: string
  title: string
  subTitle?: string
  footer?: string
  size?: TileSize
  children?: ReactElement | ReactElement[]
  onClick?: () => void
}
export type TileSize = 's' | 'm' | 'l'

export const TileSizes: { [key: string]: TileSize } = {
  SMALL: 's',
  MEDIUM: 'm',
  LARGE: 'l',
}

export const Tile = ({
  className,
  badge,
  title,
  subTitle,
  footer,
  size = TileSizes.LARGE,
  children,
  onClick,
}: TileProperties) => {

  // Events //

  const onClicked = () => {
    onClick()
  }

  // Rendering //

  const classes = ['fd-tile']
  if (className) {
    classes.push(className)
  }
  if (size) {
    classes.push(`fd-tile--${size}`)
  }

  return (
    <div
      className={classes.join(' ')}
      role='button'
      tabIndex={0}
      onClick={onClicked}
    >
      {badge ?
        <div className='fd-badge'>
          {badge}
        </div>
        : null}
      <div className='fd-tile__header'>
        <div className='fd-tile__title'>
          {title}
        </div>
        {subTitle ?
          <div className='fd-tile__subtitle'>
            {subTitle}
          </div>
          : null}
      </div>
      <div className='fd-tile__content'>
        {children}
      </div>
      {footer ?
        <div className='fd-tile__footer'>
          <span className='fd-tile__footer-text'>
            {footer}
          </span>
        </div>
        : null}
    </div>
  )
}
