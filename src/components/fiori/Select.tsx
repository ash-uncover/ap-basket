import React, { useState } from 'react'

interface SelectProperties {
  children: any
}

export const Select = ({
  children
}: SelectProperties) => {

  // Hooks //

  const [opened, setOpened] = useState(false)

  // Events //

  const onToggleOpen = () => {
    setOpened(!opened)
  }

  // Rendering //

  return (
    <div className='fd-popover'>
      <div className='fd-popover__control'>
        <div className='fd-select'>
          <button
            id='cozySelectCombobox'
            className='fd-select__control'
            aria-expanded={!!opened}
            aria-haspopup='listbox'
            aria-labelledby='cozySelectLabel cozySelectValue'
            tabIndex={0}
            value='List Item 1'
            onClick={onToggleOpen}
          >
            <span
              is='cozySelectValue'
              className='fd-select__text-content'
            >
              List Item 1
            </span>
            <span className='fd-button fd-button--transparent fd-select__button'>
              <i className='sap-icon--slim-arrow-down'></i>
            </span>
          </button>
        </div>
      </div>
      <div
        className='fd-popover__body fd-popover__body--no-arrow fd-popover__body--dropdown'
        aria-hidden={!opened}
      >
        <ul
          aria-activedescendant='cozySelectCombobox-currentlyFocusedItem'
          aria-labelledby='cozySelectLabel'
          className='fd-list fd-list--dropdown'
          role='listbox'
        >
          {children}
        </ul>
      </div>
    </div>
  )
}

interface SelectItemProperties {
  selected?: boolean,
  id: String,
  title: String,
  onSelect: () => void
}

export const SelectItem = ({
  selected,
  id,
  title,
  onSelect
}: SelectItemProperties) => {

  // Events //

  const onItemSelected = () => {
    onSelect()
  }

  // Rendering //

  const classes = ['fd-list__item']
  if (selected) {
    classes.push('is-selected')
  }

  return (
    <li
      className={classes.join(' ')}
      aria-selected={`${Boolean(selected)}`}
      role='option'
      tabIndex={0}
      onClick={onItemSelected}
    >
      <span className='fd-list__title'>
        {title}
      </span>
    </li>
  )
}

export default Select