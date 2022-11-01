import React, { useEffect, useState } from 'react'

import { CalendarDays } from 'components/fiori/calendar/CalendarDays'
import { CalendarMonths } from 'components/fiori/calendar/CalendarMonths'
import { CalendarYears } from 'components/fiori/calendar/CalendarYears'

export const DISPLAY_MODE = {
  DAYS: 'DAYS',
  MONTHS: 'MONTHS',
  YEARS: 'YEARS'
}

export type CalendarProperties = {
  date?: Date
  selectedDate?: Date
  compact?: boolean
  onSelectedDateChange?: (arg: Date) => void
}
export const Calendar = ({
  date = new Date(),
  selectedDate,
  compact,
  onSelectedDateChange,
}: CalendarProperties) => {

  // Hooks //

  let previousMode = DISPLAY_MODE.DAYS

  const [displayDate, setDisplayDate] = useState(date)
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.DAYS)

  useEffect(() => {
    if (displayMode !== DISPLAY_MODE.YEARS) {
      previousMode = displayMode
    }
  }, [displayMode])

  // Events //

  const onDisplayDateChange = (displayDate) => {
    setDisplayDate(displayDate)
  }

  const onDisplayModeChangeDays = (displayMode) => {
    setDisplayMode(displayMode)
  }

  const onDisplayModeChangeMonths = (displayMode) => {
    setDisplayMode(displayMode)
  }

  const onDisplayModeChangeYears = (displayMode) => {
    if (previousMode) {
      setDisplayMode(previousMode)
    } else {
      setDisplayMode(displayMode)
    }
  }

  // Rendering //

  switch (displayMode) {
    case DISPLAY_MODE.MONTHS: {
      return (
        <CalendarMonths
          date={displayDate}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChangeMonths}
        />
      )
    }
    case DISPLAY_MODE.YEARS: {
      return (
        <CalendarYears
          date={displayDate}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChangeYears}
        />
      )
    }
    default: {
      return (
        <CalendarDays
          date={displayDate}
          selectedDate={selectedDate}
          compact={compact}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChangeDays}
          onSelectedDateChange={onSelectedDateChange}
        />
      )
    }
  }
}