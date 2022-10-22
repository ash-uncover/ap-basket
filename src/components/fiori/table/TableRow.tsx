import React, { ReactElement } from 'react'

export const TableRow = ({
  children
}: { children: ReactElement | ReactElement[] }) => {

  // Rendering //

  return (
    <tr className='fd-table__row'>
      {children}
    </tr>
  )
}