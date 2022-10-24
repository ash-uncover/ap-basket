import React from 'react'
import { useParams } from 'react-router-dom'

import SectionTabGeneral from 'components/app/section/general/SectionTabGeneral'

const RouteSectionGeneral = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  // Rendering //

  return (
    <SectionTabGeneral sectionId={sectionId} />
  )
}

export default RouteSectionGeneral
