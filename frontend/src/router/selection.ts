import type { LocationQuery, LocationQueryValue } from 'vue-router'

import { Hemisphere } from '@/types'

import { parseYear } from '@/constants'

export interface Selection {
  hemisphere: Hemisphere
  years: number[]
}

function firstValue(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
): string | null {
  if (Array.isArray(value)) return value[0] ?? null
  return value ?? null
}

/**
 * Parses `?hemisphere=north&years=2024,2050` into a selection.
 * Returns null when the query is missing or invalid.
 */
export function parseSelectionQuery(query: LocationQuery): Selection | null {
  const hemisphere = firstValue(query.hemisphere)

  if (
    hemisphere !== Hemisphere.Northern &&
    hemisphere !== Hemisphere.Southern
  ) {
    return null
  }

  const rawYears = query.years
  const values = Array.isArray(rawYears) ? rawYears : [rawYears]

  const years = Array.from(
    new Set(
      values
        .flatMap((value) => (value ?? '').split(','))
        .map((value) => parseYear(value))
        .filter((year): year is number => year !== null),
    ),
  ).slice(0, 2)

  if (!years.length) return null

  return { hemisphere, years }
}

export function selectionToQuery(selection: Selection) {
  return {
    hemisphere: selection.hemisphere,
    years: selection.years.join(','),
  }
}
