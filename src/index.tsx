import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

// Import translation module
import 'lib/i18n'

// Should be imported before first access to the reducers
import store from 'store'

// Import components
import Root from 'routes/__layout'

const container = document.getElementById('reactroot')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
)
