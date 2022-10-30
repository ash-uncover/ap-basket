import React from 'react'

export type DialogProperties = {

}

export const Dialog = ({

}: DialogProperties) => {

  // Rendering //

  return (
    <section className="fd-dialog-docs-static fd-dialog fd-dialog--active">
      <div className="fd-dialog__content" role="dialog" aria-modal="true" aria-labelledby="dialog-title-1">
        <span className="fd-dialog__resize-handle"></span>
        <header className="fd-dialog__header fd-bar fd-bar--header-with-subheader">
          <div className="fd-bar__left">
            <div className="fd-bar__element">
              Dialog header
            </div>
            <div className="fd-bar__element">
              <h2 className="fd-title fd-title--h5" id="dialog-title-1">
                Dialog title
              </h2>
            </div>
          </div>
        </header>
        <div className="fd-dialog__subheader fd-bar fd-bar--subheader">
          <div className="fd-bar__left">
            <div className="fd-bar__element">
              Dialog subheader
            </div>
          </div>
        </div>
        <div className="fd-dialog__body">
          Dialog body
          <div className="fd-dialog__loader">
            Dialog loader
          </div>
        </div>
        <footer className="fd-dialog__footer fd-bar fd-bar--footer">
          <div className="fd-bar__right">
            <div className="fd-bar__element">
              Dialog footer
            </div>
            <div className="fd-bar__element">
              <button className="fd-dialog__decisive-button fd-button fd-button--compact">
                Begin button
              </button>
            </div>
            <div className="fd-bar__element">
              <button className="fd-dialog__decisive-button fd-button fd-button--compact">
                End button
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}