import React, { ReactElement } from 'react'

import './AppMain.css'

interface AppMainProperties {
  children: ReactElement | ReactElement[]
}

const AppMain = ({
  children
}: AppMainProperties) => {

  // Rendering //

  return (
    <main
      className='app-main'
      style={{
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        height: 0,
      }}
    >
      {children}
    </main>
  )
}

export default AppMain
