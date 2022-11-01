import React, { useEffect, useState } from 'react'

import { StringUtils } from '@uncover/js-utils'

import { Button } from 'components/fiori/button/Button'
import { ButtonStyles } from 'components/fiori/constants/ButtonStyle'
import { DISPLAY_MODE } from 'components/fiori/calendar/Calendar'

export type CalendarDaysProperties = {
  date: Date
  selectedDate?: Date
  compact?: boolean
  onDisplayDateChange: (arg: Date) => void
  onDisplayModeChange: (arg: string) => void
  onSelectedDateChange?: (arg: Date) => void
}
export const CalendarDays = ({
  date,
  selectedDate,
  compact,
  onDisplayDateChange,
  onDisplayModeChange,
  onSelectedDateChange,
}: CalendarDaysProperties) => {

  // Hooks //

  const locale = 'en'
  const intlLocale = new Intl.Locale(locale)
  const {
    firstDay,
    minimalDays,
    weekend
  } = intlLocale['weekInfo']

  const [weeks, setWeeks] = useState([])
  const [weekDays, setWeekDays] = useState([])

  useEffect(() => {
    const weekDays = []
    let currentDate = new Date()
    while (currentDate.getDay() !== firstDay % 7) {
      currentDate.setDate(currentDate.getDate() - 1)
    }
    for (let i = 0; i < 7; i++) {
      const dayName = currentDate.toLocaleString(locale, { weekday: 'short' })
      weekDays.push(dayName.substring(0, 1).toUpperCase())
      currentDate.setDate(currentDate.getDate() + 1)
    }
    setWeekDays(weekDays)
  }, [])

  useEffect(() => {
    const now = new Date()
    const weeks = []
    let currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
    while (currentDate.getDay() !== firstDay % 7) {
      currentDate.setDate(currentDate.getDate() - 1)
    }
    for (let week = 0; week < 5; week++) {
      const weekData = []
      for (let day = 1; day < 8; day++) {
        const isNowYear = now.getFullYear() === currentDate.getFullYear()
        const isNowMonth = now.getMonth() === currentDate.getMonth()
        const isNowDate = now.getDate() === currentDate.getDate()

        const isSelectedYear = selectedDate && selectedDate.getFullYear() === currentDate.getFullYear()
        const isSelectedMonth = selectedDate && selectedDate.getMonth() === currentDate.getMonth()
        const isSelectedDate = selectedDate && selectedDate.getDate() === currentDate.getDate()

        weekData.push({
          date: new Date(currentDate.getTime()),
          text: currentDate.getDate(),
          otherMonth: currentDate.getMonth() !== date.getMonth(),
          current: isNowYear && isNowMonth && isNowDate,
          active: isSelectedYear && isSelectedMonth && isSelectedDate,
          weekend: weekend.includes(day),
        })
        currentDate.setDate(currentDate.getDate() + 1)
      }
      weeks.push(weekData)
    }
    setWeeks(weeks)
  }, [date, selectedDate])


  // Events //

  const onPrevious = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), 0);
    onDisplayDateChange(newDate)
  }

  const onMonthPressed = () => {
    onDisplayModeChange(DISPLAY_MODE.MONTHS)
  }

  const onYearPressed = () => {
    onDisplayModeChange(DISPLAY_MODE.YEARS)
  }

  const onNext = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    onDisplayDateChange(newDate)
  }

  // Rendering //

  const classes = ['fd-calendar']
  if (compact) {
    classes.push('fd-calendar--compact')
  }

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
              text={StringUtils.capitalize(date.toLocaleString(locale, { month: 'long' }))}
              onClick={onMonthPressed}
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

      <div
        className='fd-calendar__content fd-calendar__content--dates'
      >
        <table
          className='fd-calendar__table'
          role='grid'
        >
          <thead className='fd-calendar__group'>
            <tr className='fd-calendar__row'>
              <CalendarDaysItemHeader />
              {weekDays.map((weekDay, index) => {
                return (
                  <CalendarDaysItemHeader
                    key={`calendar-week-day-${index}`}
                    text={weekDay}
                  />
                )
              })}
            </tr>
          </thead>

          <tbody className='fd-calendar__group'>
            {weeks.map((week, index) => {
              return (
                <tr
                  key={`calendar-week-${index}`}
                  className='fd-calendar__row'
                >
                  <CalendarDaysItemHelper text={index + 1} />
                  {week.map((day) => {
                    return (
                      <CalendarDaysItem
                        key={`calendar-week-${index}-day-${day.text}`}
                        {...day}
                        onCalendarDayClicked={() => onSelectedDateChange && onSelectedDateChange(day.date)}
                      />
                    )
                  })}
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      <div aria-live="polite" className="fd-calendar__content fd-calendar__content--screen-reader-only">Use arrow keys to navigate dates</div>
    </section>
  )
}

type CalendarDaysItemHeaderProperties = {
  text?: string
}
const CalendarDaysItemHeader = ({
  text
}: CalendarDaysItemHeaderProperties) => {

  // Rendering //

  return (
    <th className='fd-calendar__item fd-calendar__item--side-helper'>
      {text ?
        <span
          className='fd-calendar__text'
          role='button'
        >
          {text}
        </span>
        : null}
    </th>
  )
}

type CalendarDaysItemHelperProperties = {
  text?: string | number
}
const CalendarDaysItemHelper = ({
  text
}: CalendarDaysItemHelperProperties) => {

  // Rendering //

  return (
    <td className='fd-calendar__item fd-calendar__item--side-helper'>
      <span
        className='fd-calendar__text'
        role='button'
      >
        {text}
      </span>
    </td>
  )
}

type CalendarDaysItemProperties = {
  text: string | number
  active?: boolean
  current?: boolean
  otherMonth?: boolean
  range?: boolean
  specialDay?: number
  weekend?: boolean
  onCalendarDayClicked: () => void
}
const CalendarDaysItem = ({
  text,
  active,
  current,
  otherMonth,
  range,
  specialDay,
  weekend,
  onCalendarDayClicked,
}: CalendarDaysItemProperties) => {

  // Rendering //

  const classes = ['fd-calendar__item']
  if (active) {
    classes.push('is-active')
  }
  if (current) {
    classes.push('fd-calendar__item--current')
  }
  if (otherMonth) {
    classes.push('fd-calendar__item--other-month')
  }
  if (range) {
    classes.push('fd-calendar__item--range')
  }
  if (specialDay) {
    classes.push(`fd-calendar__special-day--${specialDay}`)
  }
  if (weekend) {
    classes.push('fd-calendar__item--weekend')
  }

  return (
    <td
      className={classes.join(' ')}
      role='gridcell'
      style={{
        cursor: 'pointer'
      }}
    >
      <span
        className='fd-calendar__text'
        role='button'
        onClick={onCalendarDayClicked}
      >
        {text}
      </span>
    </td>
  )
}