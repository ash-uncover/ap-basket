import React, { useEffect, useState } from 'react'

import { StringUtils } from '@uncover/js-utils'

import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'
import { DISPLAY_MODE } from 'components/fiori/calendar/Calendar'

export type CalendarMonthsProperties = {
  date: Date
  onDisplayDateChange: (arg: Date) => void
  onDisplayModeChange: (arg: string) => void
}
export const CalendarMonths = ({
  date,
  onDisplayDateChange,
  onDisplayModeChange,
}: CalendarMonthsProperties) => {

  // Hooks //

  const locale = 'en'
  const [months, setMonths] = useState([])

  useEffect(() => {
    const now = new Date()
    const months = []
    for (let i = 0; i < 4; i++) {
      const monthsRow = []
      for (let j = 0; j < 3; j++) {
        const month = (4 * j) + i
        const isYear = date.getFullYear() === now.getFullYear()
        const isMonth = now.getMonth() === month
        monthsRow.push({
          month,
          current: isYear && isMonth
        })
      }
      months.push(monthsRow)
    }
    setMonths(months)
  }, [date])

  // Events //

  const onPrevious = () => {
    const newDate = new Date(date.getFullYear() - 1, date.getMonth(), 1)
    onDisplayDateChange(newDate)
  }

  const onYearPressed = () => {
    onDisplayModeChange(DISPLAY_MODE.YEARS)
  }

  const onNext = () => {
    const newDate = new Date(date.getFullYear() + 1, date.getMonth(), 1)
    onDisplayDateChange(newDate)
  }

  const onSelectMonth = (month: number) => {
    const newDate = new Date(date.getFullYear(), month, 1)
    onDisplayDateChange(newDate)
    onDisplayModeChange(DISPLAY_MODE.DAYS)
  }

  // Rendering //

  const formatMonth = (month: number) => {
    const monthDate = new Date(2000, month)
    const monthName = monthDate.toLocaleString(locale, { month: 'long' })
    return StringUtils.capitalize(monthName)
  }

  const classes = ['fd-calendar']

  return (
    <section
      className={classes.join(' ')}
    >

      <header className='fd-calendar__header'>
        <div className='fd-calendar__navigation'>
          <div className='fd-calendar__action fd-calendar__action--arrow-left'>
            <Button
              style={ButtonStyles.TRANSPARENT}
              icon='slim-arrow-left'
              onClick={onPrevious}
            />
          </div>
          <div className='fd-calendar__action'>
            <Button
              style={ButtonStyles.TRANSPARENT}
              text={date.getFullYear()}
              onClick={onYearPressed}
            />
          </div>
          <div className='fd-calendar__action fd-calendar__action--arrow-right'>
            <Button
              style={ButtonStyles.TRANSPARENT}
              icon='slim-arrow-right'
              onClick={onNext}
            />
          </div>
        </div>
      </header>

      <div className='fd-calendar__content fd-calendar__content--months'>
        <table
          className='fd-calendar__table'
          role='grid'
        >
          <tbody className='fd-calendar__group'>
            {months.map((monthsRow, index) => {
              return (
                <tr
                  key={`'calendar-month-row-${index}`}
                  className='fd-calendar__row'
                >
                  {monthsRow.map((monthData) => {
                    return (
                      <CalendarMonthsItem
                        key={`'calendar-month-${monthData.month}`}
                        text={formatMonth(monthData.month)}
                        current={monthData.current}
                        onClick={() => onSelectMonth(monthData.month)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div
        aria-live='polite'
        className='fd-calendar__content fd-calendar__content--screen-reader-only'
      >
        Use arrow keys to navigate dates
      </div>

    </section>
  )
}

type CalendarMonthsItemProperties = {
  text: string | number
  active?: boolean
  current?: boolean
  onClick: () => void
}
const CalendarMonthsItem = ({
  text,
  active,
  current,
  onClick,
}: CalendarMonthsItemProperties) => {

  // Rendering //

  const classes = ['fd-calendar__item']
  if (current) {
    classes.push('fd-calendar__item--current')
  }

  const classesButton = ['fd-button fd-button--transparent fd-calendar__item-button']
  if (active) {
    classesButton.push('is-active')
  }

  return (
    <td
      className={classes.join(' ')}
      role='gridcell'
    >
      <button
        className={classesButton.join(' ')}
        type='button'
        onClick={onClick}
      >
        <span className='fd-calendar__text'>
          {text}
        </span>
      </button>
    </td>
  )
}