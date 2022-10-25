const DATE_OPTIONS_SHORT: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
}
const DATE_OPTIONS_LONG: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const TIME_OPTIONS_SHORT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
}

export const formatDateTimeLong = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleString(locale, { ...DATE_OPTIONS_LONG, ...TIME_OPTIONS_SHORT })
}

export const formatDateTimeShort = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleString(locale, { ...DATE_OPTIONS_SHORT, ...TIME_OPTIONS_SHORT })
}