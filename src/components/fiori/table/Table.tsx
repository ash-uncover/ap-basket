import React, { ReactElement } from 'react'
import { TableRow } from './TableRow'

/*
  <Table
    columns={[
      { key: 'firstName', name: 'First Name', render: v => <strong>{v}</strong> },
      { key: 'lastName', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'date', name: 'Join Date' },
    ]}
    rows=[
      { data: { id: 'user1', firstName: 'Titi', lastName: 'Fifi' } },
      { data: { firstName: 'Toto', lastName: 'Fofo' } },
      { data: { firstName: 'Tata' } },
    ]
  />
 */
export type TableProperties = {
  borderedHorizontal?: boolean
  borderedVertical?: boolean
  indicator?: boolean
  columns: TableColumnProperties[]
  rows?: TableRowProperties[]
  children?: ReactElement | ReactElement[]
}
export type TableColumnProperties = {
  key: string
  name?: string
  type?: TableCellType
  indicator?: TableCellIndicator
  render?: (value: any) => ReactElement
}
export type TableRowProperties = {
  className?: string
  indicator?: TableCellIndicator
  data: TableRowDataProperties
}
export type TableRowDataProperties = {
  id: string
  [key: string]: any
}

export type TableCellType = 'status-indicator' | 'checkbox'
export type TableCellIndicator = 'valid' | 'warning' | 'error' | 'information'

export const TableCellIndicators: { [key: string]: TableCellIndicator } = {
  VALID: 'valid',
  WARNING: 'warning',
  ERROR: 'error',
  INFORMATION: 'information'
}

export const Table = ({
  borderedHorizontal,
  borderedVertical,
  indicator,
  columns,
  rows,
  children,
}: TableProperties) => {

  // Rendering //

  const classes = ['fd-table']
  if (!borderedVertical) {
    classes.push('fd-table--no-vertical-borders')
  }
  if (!borderedHorizontal) {
    classes.push('fd-table--no-horizontal-borders')
  }

  return (
    <table className={classes.join(' ')}>
      <thead className='fd-table__header'>
        <TableRow>
          <>
            {indicator ?
              <TableCell
                type='status-indicator'
              />
              : null}
            {columns.map(column => (
              <TableHeaderCell
                key={column.key}
                type={column.type}
              >
                <span>{column.name}</span>
              </TableHeaderCell>
            ))}
          </>
        </TableRow>
      </thead>
      <tbody className='fd-table__body'>
        {rows?.map((row, index) => (
          <TableRow
            key={row.data.id}
          >
            <>
              {indicator ?
                <TableCell
                  type='status-indicator'
                  indicator={row.indicator}
                />
                : null}
              {columns.map(column => (
                <TableCell
                  key={column.key}
                >
                  {column.render ? column.render(row.data[column.key]) : <span>{row.data[column.key]}</span>}
                </TableCell>
              ))}
            </>
          </TableRow>
        ))}
        {children}
      </tbody>
    </table>
  )
}



export const TableHeaderCell = ({
  children,
  type
}: { children: ReactElement | ReactElement[], type?: TableCellType }) => {

  // Rendering //

  const classes = ['fd-table__cell']
  if (type) {
    classes.push(`fd-table__cell--${type}`)
  }

  return (
    <th
      className={classes.join(' ')}
      scope='col'
    >
      {children}
    </th>
  )
}

export const TableCell = ({
  children,
  type,
  indicator
}: {
  children?: ReactElement | ReactElement[],
  type?: TableCellType
  indicator?: TableCellIndicator
}) => {

  // Rendering //

  const classes = ['fd-table__cell']
  if (type) {
    classes.push(`fd-table__cell--${type}`)
  }
  if (type === 'status-indicator' && indicator) {
    classes.push(`fd-table__cell--status-indicator--${indicator}`)
  }

  return (
    <td className={classes.join(' ')}>
      {children}
    </td>
  )
}

export default Table