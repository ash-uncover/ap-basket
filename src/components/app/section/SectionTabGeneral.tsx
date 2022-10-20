import { Panel } from 'components/fiori/panel/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'

import './SectionTabGeneral.css'

const SectionTabGeneral = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  // Rendering //

  return (
    <div className=''>
      <Panel
        expandable
        title='Hello'
      >
        Hello World
      </Panel>
    </div>
  )
}

export default SectionTabGeneral
