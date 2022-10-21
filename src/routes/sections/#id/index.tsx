import Section from 'components/app/section/Section'
import React from 'react'
import { useParams } from 'react-router-dom'

const RouteSection = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  // Rendering //

  return (
    <Section sectionId={sectionId} />
  )
}

export default RouteSection
