// const plugin = require('tailwindcss/plugin')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // screens: {
    //   base: '1280px'
    // },
    // container: {
    //   center: true
    // },
    extend: {},
  },
  // variants: {
  //   extend: {
  //     backgroundColor: ['group-focus'],
  //     borderColor: ['group-focus'],
  //     fontSize: ['group-focus']
  //   }
  // },
  plugins: [
    // plugin(function({ matchUtilities, theme }) {
    //   matchUtilities(
    //     {
    //       wp: (value) => ({
    //         width: `${value}%`
    //       }),
    //     }
    //   )
    // })
  ],
  corePlugins: {
    // boxShadow: false,
    // boxSizing: false,
    // objectFit: false,
    // objectPosition: false,
    // overflow: false,
    // overscrollBehavior: false,
    // space: false,
    // fontSmoothing: false,
    // letterSpacing: false,
    // // lineHeight: false,
    // backgroundAttachment: false,
    // // backgroundClip: false,
    // backgroundOpacity: false,
    // backgroundPosition: false,
    // backgroundRepeat: false,
    // backgroundSize: false,
    // backgroundImage: false,
    // gradientColorStops: false,
    borderOpacity: false,
    // borderCollapse: false,
    // tableLayout: false,
    // clear: false,
    // float: false,
    textOpacity: false,
    // // ,
    // // groupFocus: true
  },
}
