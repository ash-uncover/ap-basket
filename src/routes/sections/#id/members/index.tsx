import React from 'react'
import { useParams } from 'react-router-dom'

import SectionTabMembers from 'components/app/section/members/SectionTabMembers'

const RouteSectionMembers = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  // Rendering //

  return (
    <SectionTabMembers sectionId={sectionId} />
  )
}

export default RouteSectionMembers
