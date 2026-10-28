import type { Forecast } from '@/types'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://earthsaverai.onrender.com'
).replace(/\/+$/, '')

export class ForecastApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ForecastApiError'
    this.status = status
  }
}

export async function fetchForecast(
  selectedYear: number,
  hemisphere: string,
): Promise<Forecast[]> {
  const url = new URL(`${API_BASE_URL}/forecast`)
  url.searchParams.append('year', selectedYear.toString())
  url.searchParams.append('hemisphere', hemisphere)

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new ForecastApiError(
        `Failed to fetch: ${response.statusText || response.status}`,
        response.status,
      )
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new ForecastApiError('Unexpected response from the forecast API')
    }

    return data as Forecast[]
  } catch (error) {
    if (error instanceof ForecastApiError) throw error

    throw new ForecastApiError(
      error instanceof Error ? error.message : 'An error occurred',
    )
  }
}
