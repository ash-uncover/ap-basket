import React, { useState } from 'react'

import './Page.css'

interface PageProperties {
  className?: string
  children: [
    React.ReactElement<PageHeaderProperties>,
    React.ReactElement<PageBodyProperties>,
    React.ReactElement<PageFooterProperties>
  ] | [
    React.ReactElement<PageHeaderProperties>,
    React.ReactElement<PageBodyProperties>,
  ]
}
export const Page = ({
  className,
  children: [header, body, footer]
}: PageProperties) => {

  // Rendering //

  const classes = ['fd-page']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      {header}
      <div className='fd-page__content'>
        {body}
        {footer}
      </div>
    </div>
  )
}


interface PageHeaderProperties {
  className?: string
  children?: any
}
export const PageHeader = ({
  className,
  children
}: PageHeaderProperties) => {

  // Rendering //

  const classes = ['fd-page__header']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
}


interface PageBodyProperties {
  className?: string
  children?: any
}
export const PageBody = ({
  className,
  children
}: PageBodyProperties) => {

  // Rendering //

  const classes = ['fd-page__body']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
}


interface PageFooterProperties {
  className?: string
  children?: any
}
export const PageFooter = ({
  className,
  children
}: PageFooterProperties) => {

  // Rendering //

  const classes = ['fd-page__footer']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
}

export default Page