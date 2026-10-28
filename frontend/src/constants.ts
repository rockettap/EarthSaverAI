export const FIRST_YEAR = 1978
export const LAST_YEAR = 2100

export const yearOptions: string[] = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, index) => (FIRST_YEAR + index).toString(),
)

/**
 * Parses a year from a select/combobox value and checks that it is an
 * integer within the range supported by the API.
 */
export function parseYear(
  value: string | number | null | undefined,
): number | null {
  if (value === null || value === undefined || value === '') return null

  const year = typeof value === 'number' ? value : Number(value)

  if (!Number.isInteger(year) || year < FIRST_YEAR || year > LAST_YEAR) {
    return null
  }

  return year
}
