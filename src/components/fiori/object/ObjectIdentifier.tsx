import React from 'react'

export type ObjectIdentifierProperties = {
  title: string
  text?: string
  bold?: boolean
  medium?: boolean
  className?: string
}

export const ObjectIdentifier = ({
  title,
  text,
  bold,
  medium,
  className,
}: ObjectIdentifierProperties) => {

  // Rendering //

  const classes = ['fd-object-identifier']
  if (medium) {
    classes.push('fd-object-identifier--medium')
  }
  if (className) {
    classes.push(className)
  }

  const classesTitle = ['fd-object-identifier__title']
  if (bold) {
    classesTitle.push('fd-object-identifier__title--bold')
  }

  return (
    <div className={classes.join(' ')}>
      <p className={classesTitle.join(' ')}>
        {title}
      </p>
      {text ?
        <p className='fd-object-identifier__text'>
          {text}
        </p>
        : null}
    </div>
  )
}