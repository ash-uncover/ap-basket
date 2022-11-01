import React, { useState } from 'react'

export const Bar = () => {

  // Hooks //

  // Rendering //

  return (
    <div className='fd-bar'>
      <div className='fd-bar__left'>
        <div className='fd-bar__element'>
          <h5
            className='fd-title fd-title--h5'
            aria-label='text'
          >
            TEXT
          </h5>
        </div>
      </div>
      <div className='fd-bar__middle'>
        <div className='fd-bar__element'>
          <div
            className='fd-segmented-button'
            role='group'
            aria-label='Group label'
          >
            <button
              aria-label='button'
              className='fd-button fd-button--compact'
              aria-pressed='true'
            >
              <i className='sap-icon--email'></i>
            </button>
            <button
              aria-label='button'
              className='fd-button fd-button--compact'
            >
              <i className='sap-icon--iphone'></i>
            </button>
            <button
              aria-label='button'
              className='fd-button fd-button--compact'
            >
              <i className='sap-icon--notification-2'></i>
            </button>
          </div>
        </div>
      </div>
      <div className='fd-bar__right'>
        <div className='fd-bar__element'>
          <span
            className='fd-avatar fd-avatar--xs fd-avatar--circle fd-avatar--thumbnail'
            role='img'
            aria-label='John Doe' />
        </div>
        <div className='fd-bar__element'>
          <button
            aria-label='button'
            className='fd-button fd-button--transparent fd-button--compact'
          >
            <i className='sap-icon--grid'></i>
          </button>
        </div>
      </div>
    </div>
  )
}