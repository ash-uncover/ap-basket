import React from 'react'

import './AppMain.css'

const AppMain = ({
  children
}) => {
  return (
    <main className='app-main'>
      {children}
    </main>
  )
}

export default AppMain
