import type { Forecast } from '@/types'

export async function fetchForecast(
  selectedYear: number,
  hemisphere: string,
): Promise<Forecast[]> {
  const url = new URL('https://earthsaverai.onrender.com/forecast')
  url.searchParams.append('year', selectedYear.toString())
  url.searchParams.append('hemisphere', hemisphere)

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An error occurred',
    )
  }
}
