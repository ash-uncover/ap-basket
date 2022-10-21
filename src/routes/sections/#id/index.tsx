import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

import Section from 'components/app/section/Section'

const RouteSection = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  // Rendering //

  return (
    <Section sectionId={sectionId}>
      <Outlet />
    </Section>
  )
}

export default RouteSection
