import React, { ReactElement, useEffect, useState } from 'react'

export type PanelProperties = {
  compact?: boolean
  expanded?: boolean
  expandable?: boolean
  title: string
  toolbar?: ReactElement
  children?: string | ReactElement | ReactElement[]
}

export const Panel = ({
  compact,
  expanded,
  expandable,
  title,
  toolbar,
  children,
}: PanelProperties) => {

  // Hooks //

  const [isExpanded, setExpanded] = useState(null)

  useEffect(() => {
    setExpanded(expanded)
  }, [expanded])

  // Events //

  const onToggleExpanded = () => {
    setExpanded(!isExpanded)
  }

  // Rendering //

  const classes = ['fd-panel']
  if (compact) {
    classes.push('fd-panel--compact')
  }
  if (!expandable) {
    classes.push('fd-panel--fixed')
  }

  return (
    <div className={classes.join(' ')}>
      <div className='fd-panel__header'>
        {expandable ?
          <div className='fd-panel__expand'>
            <button
              className='fd-button fd-button--compact fd-button--transparent fd-panel__button'
              aria-expanded={!!isExpanded}
              aria-haspopup='true'
              aria-controls='panel-content'
              aria-labelledby='panel-title'
              onClick={onToggleExpanded}
            >
              <i className={isExpanded ? 'sap-icon--slim-arrow-down' : 'sap-icon--slim-arrow-right'}></i>
            </button>
          </div>
          : null}
        <h4
          className='fd-panel__title'
          id='panel-title'
        >
          {title}
        </h4>
        {toolbar ? toolbar : null}
      </div>

      <div
        id='panel-content'
        className='fd-panel__content'
        role='region'
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  )
}
