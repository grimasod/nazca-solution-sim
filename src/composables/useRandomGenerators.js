export function useRandomGenerators() {

  const randomLatitude = () => {
    // generate random latitude values, between -90 and +90, with 2 decimal places
    return random3Places(90, -90)
  }

  const randomLongitude = () => {
    // generate random longitude values, between -180 and +180, with 2 decimal places
    return random3Places(180, -180)
  }

  const randomAngle = () => {
    return random3Places(360, 0)
  }

  const random3Places = (pMax, pMin) => {
    // generate a random number betweem +pMax and -pMax
    // multpily pMax and pMin by 1000 to allow for 3 decimal places
    // add min1000 to allow for a final +/- pMax value
    // multiply by a random number between 0 and 1, and round the result, to get an integer between 0 and pMax X 1000 X 2 (inclusive)
    // subtract min1000 to get +/- value and divide by 1000 to get 3 deciaml places
    const max1000 = pMax * 1000
    const min1000 = pMin * 1000
    return (Math.round(Math.random() * (max1000 - min1000)) + min1000) / 1000
  }

  return { randomLatitude, randomLongitude, randomAngle }
}
