import React, { ReactElement } from 'react'
import { DialogFooter } from './DialogFooter'
import { DialogHeader } from './DialogHeader'

export type DialogProperties = {
  resizable?: boolean,
  title?: string,
  header?: any,
  footer?: any,
  children?: ReactElement | ReactElement[]
}

export const Dialog = ({
  resizable,
  header,
  footer,
  children,
}: DialogProperties) => {

  // Rendering //

  return (
    <section className='fd-dialog-docs-static fd-dialog fd-dialog--active'>

      <div
        className='fd-dialog__content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title-1'
      >
        {resizable ? <span className='fd-dialog__resize-handle' /> : null}

        {header ? <DialogHeader {...header} /> : null}

        <div className='fd-dialog__body'>
          {children}
        </div>

        {footer ? <DialogFooter {...footer} /> : null}
      </div>
    </section>
  )
}