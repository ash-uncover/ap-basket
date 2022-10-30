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
import Dialogs from 'components/app/dialogs/Dialogs'

const containerRoot = document.getElementById('reactroot')
const root = createRoot(containerRoot)
root.render(
  <Provider store={store}>
    <Root />
    <Dialogs />
  </Provider>
)
