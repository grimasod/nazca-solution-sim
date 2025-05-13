import LatLon from 'geodesy/latlon-nvector-spherical.js'

export function useFetchGoogleSheets() {
  const fetchData = async ({ spreadsheetId, sheetName }) => {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${import.meta.env.VITE_SHEETS_API_KEY}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.values && result.values.length > 1) {
        // Convert the data to an array of objects using the first row as keys
        const headers = result.values[0]
        const rows = result.values.slice(1)

        const converted = rows.map((row) => {
          const item = {}
          headers.forEach((header, index) => {
            item[header] = row[index] || ''
          })
          return item
        })

        return converted
      }
    } catch (err) {
      console.error('Error fetching Google Sheets data:', err)
    }
    return []
  }

  const fetchLocationData = async ({ spreadsheetId, type }) => {
    const result = await fetchData({ spreadsheetId, sheetName: 'Filtered Sim Data' })

    const data = result.map((location) => {
      const isUsedInSim = location['Is Used In Sim'] === 'TRUE'
      const latitude = Number(location.Latitude)
      const longitude = Number(location.Longitude)
      return {
        name: location.Name,
        type,
        tags: location.Tags.split(','),
        isUsedInSim,
        isUsedInSimCustom: isUsedInSim,
        isUsedInSimCustomAll: isUsedInSim,
        location: {
          latitude,
          longitude,
        },
        latlon: new LatLon(latitude, longitude),
        link: location.Link,
      }
    })

    return data
  }

  const fetchRCData = async ({ spreadsheetId }) => {
    const result = await fetchData({ spreadsheetId, sheetName: 'Sim Data' })

    const data = result.reduce((accumulator, row) => {
      if (row.Name) {
        const latitude = Number(row.Latitude)
        const longitude = Number(row.Longitude)
        return [
          ...accumulator,
          {
            name: row.Name,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            latlon: new LatLon(latitude, longitude),
            greatCircles: [],
          },
        ]
      } else {
        return accumulator.toSpliced(-1, 1, {
          ...accumulator[accumulator.length - 1],
          greatCircles: [
            ...accumulator[accumulator.length - 1].greatCircles,
            {
              name: row['GC Name'],
              angle: Number(row['GC Angle']),
            },
          ],
        })
      }
    }, [])

    return data
  }

  return {
    fetchLocationData,
    fetchRCData,
  }
}
