import React from 'react'

export type TitleProperties = {
  className?: string
  level?: TitleLevel
  levelVisual?: TitleLevel
  wrap?: boolean
  text: string
}

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6

export const Title = ({
  className,
  level,
  levelVisual,
  wrap,
  text,
}: TitleProperties) => {

  // Rendering //

  const classes = ['fd-title']
  classes.push(`fd-title--h${levelVisual || 1}`)
  if (className) {
    classes.push(className)
  }
  if (wrap) {
    classes.push('fd-title--wrap')
  }

  switch (level) {
    case 6: {
      return (
        <h6 className={classes.join(' ')}>{text}</h6>
      )
    }
    case 5: {
      return (
        <h5 className={classes.join(' ')}>{text}</h5>
      )
    }
    case 4: {
      return (
        <h4 className={classes.join(' ')}>{text}</h4>
      )
    }
    case 3: {
      return (
        <h3 className={classes.join(' ')}>{text}</h3>
      )
    }
    case 2: {
      return (
        <h2 className={classes.join(' ')}>{text}</h2>
      )
    }
    default: {
      return (
        <h1 className={classes.join(' ')}>{text}</h1>
      )
    }
  }
}