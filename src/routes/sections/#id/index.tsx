import Section from 'components/app/sections/Section'
import React from 'react'
import { useParams } from 'react-router-dom'

const RouteSection = () => {

  // Hooks //

  const params = useParams()
  const sectionId = params.sectionId

  console.log('SECTION')

  // Rendering //

  return (
    <Section id={sectionId} />
  )
}

export default RouteSection
