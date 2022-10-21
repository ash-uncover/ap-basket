import React, { useState } from 'react'
import { VerticalNavigationItem, VerticalNavigationItemProperties } from './VerticalNavigationItem'

export interface VerticalNavigationProperties {
  className?: string
  label: string
  itemsLabel: string
  items?: VerticalNavigationItemProperties[],
  onItemSelect?: (id: string) => void
  children?: any | any[]
}

export const VerticalNavigation = ({
  className,
  label,
  itemsLabel,
  items,
  onItemSelect,
  children,
}: VerticalNavigationProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = ['fd-vertical-nav']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      <nav className='fd-vertical-nav__main-navigation' aria-label={label}>
        <ul className='fd-list' aria-label={itemsLabel}>
          {items?.map(item => {
            return (
              <VerticalNavigationItem
                key={item.id}
                id={item.id}
                className={item.className}
                expanded={item.expanded}
                items={item.items}
                glyph={item.glyph}
                text={item.text}
                selected={item.selected}
                onItemSelect={onItemSelect}
              />
            )
          })}
          {children}
        </ul>
      </nav>
    </div>
  )
}
