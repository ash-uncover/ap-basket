import React, { useState } from 'react'

interface VerticalNavigationProperties {
  className?: string
  label: string
  itemsLabel: string
  items?: VerticalNavigationItemProperties[],
  onItemSelect?: (id: string) => void
  children?: any | any[]
}
interface VerticalNavigationItemProperties {
  id: string
  className?: string
  expanded?: boolean
  items?: VerticalNavigationItemProperties[]
  glyph?: string
  selected?: boolean
  text: string
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

export const VerticalNavigationItem = ({
  id,
  className,
  expanded,
  items,
  glyph,
  selected,
  text,
  onItemSelect,
  children,
}: VerticalNavigationItemProperties) => {


  // Hooks //

  const [isExpanded, setExpanded] = useState(expanded)
  const expandable = Boolean(items?.length) || Boolean(children)

  // Events //

  const onClick = (event) => {
    event.stopPropagation()
    onItemSelect(id)
  }

  const onKeyUp = (event) => {
    switch (event.code) {
      case 'Enter':
      case 'Space': {
        event.stopPropagation()
        onItemSelect(id)
      }
      default: {
        break;
      }
    }
  }

  // Rendering //

  const classes = ['fd-list__navigation-item']
  if (className) {
    classes.push(className)
  }
  if (expandable) {
    classes.push('fd-list__navigation-item--expandable')
  }
  if (isExpanded) {
    classes.push('is-expanded')
  }
  if (selected) {
    classes.push('fd-list__navigation-item--indicated')
  }

  const classesArrow = ['fd-list__navigation-item-arrow']
  if (isExpanded) {
    classesArrow.push('is-expanded')
    classesArrow.push('sap-icon--navigation-down-arrow')
  } else {
    classesArrow.push('sap-icon--navigation-right-arrow')
  }

  return (
    <li
      className={classes.join(' ')}
      tabIndex={0}
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      {glyph ?
        <i
          className={`fd-list__navigation-item-icon sap-icon--${glyph}`}
          role='presentation'
        ></i>
        : null}
      <span className='fd-list__navigation-item-text'>
        {text}
      </span>
      {expandable ?
        <button
          className={classesArrow.join(' ')}
          aria-label='Expand second submenu'
          onClick={() => setExpanded(!isExpanded)}
        ></button>
        : null}
      {expandable && isExpanded && (Boolean(items?.length) || Boolean(children)) ?
        <ul className='fd-list'>
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
        : null}

    </li>
  )
}

export default VerticalNavigation