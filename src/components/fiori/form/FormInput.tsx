import React from 'react'

import {
  v4 as uuidv4
} from 'uuid'

export type FormInputProperties = {
  className?: string
  label?: string
  placeholder?: string
  type?: string
}

export const FormInput = ({
  className,
  label,
  placeholder,
  type = 'text',
}: FormInputProperties) => {

  // Rendering //

  const id = uuidv4()

  const classes = ['fd-form-item']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      <label
        className='fd-form-label'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className='fd-input'
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}