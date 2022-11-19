import React from 'react'

import {
  Bar,
} from '@uncover/fundamentals-react'

import './AppFooter.css'

const AppFooter = () => {
  return (
    <Bar
      className='app-footer'
      type='footer'
      rightComponents={[
        <div>provided by <span>aSH@uncover</span></div>,
      ]}
    />
  )
}

export default AppFooter
