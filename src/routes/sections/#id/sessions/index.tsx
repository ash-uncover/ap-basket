import React from 'react'
import { useParams } from 'react-router-dom'

import SectionTabSessions from 'components/app/section/sessions/SectionTabSessions'

const RouteSectionSessions = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  // Rendering //

  return (
    <SectionTabSessions sectionId={sectionId} />
  )
}

export default RouteSectionSessions
