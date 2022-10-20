import React from 'react'


export type ObjectNumberProperties = {
  value: string
  unit: string
  bold?: boolean
  large?: boolean
  semantic?: string
  className?: string
}
export type ObjectNumberSematic = 'postive' | 'negative' | 'critical' | 'informative'

export const ObjectNumber = ({
  value,
  unit,
  bold,
  large,
  semantic,
  className,
}: ObjectNumberProperties) => {

  // Rendering //

  const classes = ['fd-object-number']
  if (className) {
    classes.push(className)
  }
  if (large) {
    classes.push('fd-object-number--large')
  }
  if (semantic) {
    classes.push(`fd-object-number--${semantic}`)
  }

  const classesText = ['fd-object-number__text']
  if (bold) {
    classesText.push('fd-object-number__text--bold')
  }

  return (
    <span className={classes.join(' ')}>
      <span className={classesText.join(' ')}>
        {value}
      </span>
      <span className='fd-object-number__unit'>
        {unit}
      </span>
    </span>
  )
}