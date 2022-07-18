export function useNumberFormatters() {

  const formatToPlaces4Max = (value) => {
    return formatToPlaces(value, 0, 4)
  }

  const formatToPlaces10Max = (value) => {
    return formatToPlaces(value, 0, 10)
  }

  const formatToPlaces2Fixed = (value) => {
    return formatToPlaces(value, 2, 2)
  }

  const formatToPlaces = (value, minimumFractionDigits, maximumFractionDigits) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits, maximumFractionDigits }).format(value)
  }

  return { formatToPlaces4Max, formatToPlaces10Max, formatToPlaces2Fixed }
}
