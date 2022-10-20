import React, { ReactElement } from 'react'

export type IconTabBarItemProperties = {
  id: string
  badge?: boolean
  selected?: boolean
  semantic?: IconTabBarItemSemantic
  title: string
  onTabSelect?: (id: string) => void
}
export type IconTabBarItemSemantic = 'positive' | 'information' | 'negative' | 'critical'

export const IconTabBarItem = ({
  id,
  badge,
  selected,
  semantic,
  title,
  onTabSelect,
}: IconTabBarItemProperties) => {

  // Events //

  const onClick = () => {
    onTabSelect(id)
  }

  const onKeyUp = (event) => {
    switch (event.code) {
      case 'Enter':
      case 'Space': {
        event.stopPropagation()
        onTabSelect(id)
      }
      default: {
        break;
      }
    }
  }

  // Rendering //

  const classes = ['fd-icon-tab-bar__item']
  if (semantic) {
    classes.push(`fd-icon-tab-bar__item--${semantic}`)
  }

  return (
    <li
      className={classes.join(' ')}
      role='presentation'
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      <span
        id={id}
        className='fd-icon-tab-bar__tab'
        aria-selected={!!selected}
        role='tab'
        tabIndex={0}
      >
        <span className='fd-icon-tab-bar__tag'>
          {title}
        </span>
        {badge ?
          <span className='fd-icon-tab-bar__badge' />
          : null}
      </span>
    </li>
  )
}