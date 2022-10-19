import React, { ReactElement } from 'react'
import { createRoutesFromElements } from 'react-router-dom'

/*
  <Table
    columns={[
      { key: 'firstName', name: 'First Name', render: v => <strong>{v}</strong> },
      { key: 'lastName', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'date', name: 'Join Date' },
    ]}
    data={[
      { id: 'user1', firstName: 'Titi', lastName: 'Fifi' },
      { firstName: 'Toto', lastName: 'Fofo' },
      { firstName: 'Tata' }
    ]}
  />
 */
export type TableProperties = {
  borderedHorizontal?: boolean
  borderedVertical?: boolean
  columns: TableColumn[]
  data?: any[]
  children?: ReactElement | ReactElement[]
}
export type TableColumn = {
  key: string
  name?: string
  type?: TableCellType
  indicator?: TableCellIndicator
  render?: (value: any) => ReactElement
}

export type TableCellType = 'status-indicator' | 'checkbox'
export type TableCellIndicator = 'valid' | 'warning' | 'error' | 'information'

export const Table = ({
  borderedHorizontal,
  borderedVertical,
  columns,
  data,
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
          {columns.map(column => (
            <TableHeaderCell
              key={column.key}
              type={column.type}
            >
              <span>{column.name}</span>
            </TableHeaderCell>
          ))}
        </TableRow>
      </thead>
      <tbody className='fd-table__body'>
        {data?.map((row, index) => (
          <TableRow
            key={row.id || `row-index-${index}` }
          >
            {columns.map(column => (
              <TableCell
                key={column.key}
              >
                {column.render ? column.render(row[column.key]) : <span>{row[column.key]}</span>}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {children}
      </tbody>
    </table>
  )
}

export const TableRow = ({
  children
}: { children: ReactElement | ReactElement[]}) => {

  // Rendering //

  return (
    <tr className='fd-table__row'>
      {children}
    </tr>
  )
}

export const TableHeaderCell = ({
  children,
  type
}: { children: ReactElement | ReactElement[], type?: TableCellType}) => {

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