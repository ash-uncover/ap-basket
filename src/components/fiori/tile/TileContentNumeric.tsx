import React, { ReactElement } from 'react'
import { TileSize, TileSizes } from './Tile'

export type TileContentNumericProperties = {
  value: string
  size?: TileSize
  semantic?: TileContentNumericSemantic
}

export type TileContentNumericSemantic = 'positive' | 'negative' | 'critical' | 'informative'
export const TileContentNumericSemantics: { [key: string]: TileContentNumericSemantic } = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  CRITICAL: 'critical',
  INFORMATIVE: 'informative',
}

export const TileContentNumeric = ({
  value,
  size = TileSizes.LARGE,
  semantic,
}: TileContentNumericProperties) => {

  // Rendering //

  const classes = ['fd-numeric-content']
  if (size) {
    classes.push(`fd-numeric-content--${size}`)
  }

  const classesKpi = ['fd-numeric-content__kpi']
  if (semantic) {
    classesKpi.push(`fd-numeric-content__kpi--${semantic}`)
  }

  return (
    <div className={classes.join(' ')}>
      <div className='fd-numeric-content__kpi-container'>
        <div className={classesKpi.join(' ')}>
          {value}
        </div>
      </div>
    </div>
  )
}