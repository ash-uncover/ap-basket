import React, { useEffect, useState } from 'react'
import { Button } from '../button/Button'
import { ButtonStyles } from '../constants/ButtonStyle'
import { DISPLAY_MODE } from './Calendar'

export type CalendarYearsProperties = {
  date: Date
  onDisplayDateChange: (arg: Date) => void
  onDisplayModeChange: (arg: string) => void
}
export const CalendarYears = ({
  date,
  onDisplayDateChange,
  onDisplayModeChange,
}: CalendarYearsProperties) => {

  // Hooks //

  const [years, setYears] = useState([])

  useEffect(() => {
    const now = new Date()
    let currentYear = Math.floor(date.getFullYear() / 10) * 10
    const years = []
    for (let i = 0; i < 4; i++) {
      const yearsRow = []
      for (let j = 0; j < 5; j++) {
        yearsRow.push({
          current: currentYear === now.getFullYear(),
          year: currentYear++,
        })
      }
      years.push(yearsRow)
    }
    console.log(years)
    setYears(years)
  }, [date])

  // Events //

  const onPrevious = () => {
    const newDate = new Date(date.getFullYear() - 20, date.getMonth(), 1)
    console.log(newDate)
    onDisplayDateChange(newDate)
  }

  const onNext = () => {
    const newDate = new Date(date.getFullYear() + 20, date.getMonth(), 1)
    onDisplayDateChange(newDate)
  }

  const onSelectYear = (year: number) => {
    const newDate = new Date(year, date.getMonth(), 1)
    onDisplayDateChange(newDate)
    onDisplayModeChange(DISPLAY_MODE.MONTHS)
  }

  // Rendering //

  const classes = ['fd-calendar']

  return (
    <section
      className={classes.join(' ')}
      style={{ marginBottom: '1rem' }}
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
              text={years && years.length ? `${years[0][0].year} - ${years[3][4].year}` : null}
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

      <div className='fd-calendar__content fd-calendar__content--years ' id='57YUZ521'>
        <table className='fd-calendar__table' role='grid'>
          <tbody className='fd-calendar__group'>
            {years.map((yearsRow, index) => {
              return (
                <tr
                  key={`'calendar-years-row-${index}`}
                  className='fd-calendar__row'
                >
                  {yearsRow.map((yearData) => {
                    return (
                      <CalendarYearsItem
                        key={`'calendar-years-${yearData.year}`}
                        text={yearData.year}
                        current={yearData.current}
                        onClick={() => onSelectYear(yearData.year)}
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

type CalendarYearsItemProperties = {
  text: string | number
  active?: boolean
  current?: boolean
  onClick: () => void
}
const CalendarYearsItem = ({
  text,
  active,
  current,
  onClick,
}: CalendarYearsItemProperties) => {

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