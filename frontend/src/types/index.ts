export enum Hemisphere {
  Northern = 'north',
  Southern = 'south',
}

export interface Forecast {
  year: number
  month: number
  hemisphere: Hemisphere
  extent: number
  image: string
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
