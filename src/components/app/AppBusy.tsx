import React from 'react'
import { useSelector } from 'react-redux'
import appSelectors from 'store/app/app.selectors'

const AppBusy = () => {

  // Hooks //

  const busy = useSelector(appSelectors.busy)
  const busyMessage = useSelector(appSelectors.busyMessage)

  // Rendering //

  if (busy) {
    return (
      <div
        className='app-busy'
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)'
        }}
      >
        <div className='fd-message-toast fd-busy-indicator-extended fd-busy-indicator-extended--message-toast'>
          <div className='fd-busy-indicator fd-busy-indicator--l' aria-hidden='false' aria-label='Loading'>
            <div className='fd-busy-indicator__circle'></div>
            <div className='fd-busy-indicator__circle'></div>
            <div className='fd-busy-indicator__circle'></div>
          </div>
          {busyMessage ? (
            <div className='fd-busy-indicator-extended__label'>
              {busyMessage}
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return null
}

export default AppBusy
