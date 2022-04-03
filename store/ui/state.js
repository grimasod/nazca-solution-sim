const state = () => ({
  selectionType: 'site',
  selectionIsCustom: false,
  radialsIsRandom: 'random',
  singleGreatCircle: null,
  routeTypeMap: [
    {
      route: 'ancient-sites',
      type: 'site'
    },
    {
      route: 'meteor-impact-craters',
      type: 'crater'
    },
    {
      route: 'volcanoes',
      type: 'volcano'
    },
    {
      route: 'all-locations',
      type: 'all'
    }
  ]
})

export default state
