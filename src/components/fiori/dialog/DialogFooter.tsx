import React, { ReactElement } from 'react'


export type DialogFooterProperties = {
  left?: ReactElement | ReactElement[]
  right?: ReactElement | ReactElement[]
  children?: ReactElement | ReactElement[]
}

export const DialogFooter = ({
  left,
  right,
  children,
}: DialogFooterProperties) => {

  // Rendering //

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
    <footer className='fd-dialog__footer fd-bar fd-bar--footer'>
      <div className='fd-bar__left'>
        {left ? renderElements(left) : null}
      </div>
      <div className='fd-bar__right'>
        {renderElements(right ? right : children)}
      </div>
    </footer>
  )
}