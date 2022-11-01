import React, { useState } from 'react'

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
  compact?: boolean
}
export const Calendar = ({
  date = new Date(),
  compact,
}: CalendarProperties) => {

  // Hooks //

  const [displayDate, setDisplayDate] = useState(date)
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.MONTHS)

  // Events //

  const onDisplayDateChange = (displayDate) => {
    setDisplayDate(displayDate)
  }

  const onDisplayModeChange = (displayMode) => {
    setDisplayMode(displayMode)
  }

  // Rendering //

  switch (displayMode) {
    case DISPLAY_MODE.MONTHS: {
      return (
        <CalendarMonths
          date={displayDate}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChange}
        />
      )
    }
    case DISPLAY_MODE.YEARS: {
      return (
        <CalendarYears
          date={displayDate}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChange}
        />
      )
    }
    default: {
      return (
        <CalendarDays
          date={displayDate}
          compact={compact}
          onDisplayDateChange={onDisplayDateChange}
          onDisplayModeChange={onDisplayModeChange}
        />
      )
    }
  }
}