import React, { ReactElement } from 'react'


export type DialogHeaderProperties = {
  left?: ReactElement | ReactElement[]
  right?: ReactElement | ReactElement[],
  subheader?: boolean
}

export const DialogHeader = ({
  left,
  right,
  subheader,
}: DialogHeaderProperties) => {

  // Rendering //

  const classes = ['fd-dialog__header fd-bar']

  if (subheader) {
    classes.push('fd-bar--header-with-subheader')
  } else {
    classes.push('fd-bar--header')
  }

  const renderElements = (elements) => {
    if (Array.isArray(elements)) {
      return (
        <>
          {elements.map(elem => renderElement(elem))}
        </>
      )
    } else {
      return renderElement(elements)
    }
  }

  const renderElement = (element) => {
    return (
      <div className='fd-bar__element'>
        {element}
      </div>
    )
  }

  return (
    <footer className={classes.join(' ')}>
      <div className='fd-bar__left'>
        {left ? renderElements(left) : null}
      </div>
      <div className='fd-bar__right'>
        {renderElements(right)}
      </div>
    </footer>
  )
}