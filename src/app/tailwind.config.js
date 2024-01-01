/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {


      screens: {
        'home-full': {
          'raw': 'only screen and (min-height: calc(0.5 * 100vw))'
        }
      },

      dropShadow: {
        'black': '0.1rem 0.1rem 0.1rem black',
        // Add more colored shadows as needed
      },
      textShadow: {
        //'h1': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
        'h1': '0.1rem 0.1rem 0.1rem black'
     },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
        '13xl': '16rem',
      },
      fontFamily: {
        'title': ['Aldrich','ui-sans-serif', 'system-ui'],
        'intro': ['CabinSketch', 'ui-sans-serif', 'system-ui'],
        'rust': ['Keep Singing', 'ui-sans-serif', 'system-ui'],
        'teko': ['Teko Light', 'ui-sans-serif', 'system-ui']
      },
      borderWidth: {
        '32': '2rem',
        '16': '1rem',
        '6': '6px',
        // Add as many custom border widths as you need
      },
      colors: {
        'woodsmoke': {
          DEFAULT:'#0c0b0f',
          '50': '#f7f6f9',
          '100': '#edecf2',
          '200': '#d7d5e2',
          '300': '#b4b0c9',
          '400': '#8c86aa',
          '500': '#6e6790',
          '600': '#585277',
          '700': '#494361',
          '800': '#3e3a52',
          '900': '#383446',
          '950': '#0c0b0f',
        },
        'green': {
          DEFAULT:'#0a9869',
          '50': '#edfcf5',
          '100': '#d2f9e4',
          '200': '#a9f1cf',
          '300': '#72e3b4',
          '400': '#39ce95',
          '500': '#15b47c',
          '600': '#0a9869',
          '700': '#087453',
          '800': '#095c43',
          '900': '#084c39',
          '950': '#032b20',
        },
        'red': {
          DEFAULT:'#a80c0b',
          '50': '#fff0f0',
          '100': '#ffdede',
          '200': '#ffc3c3',
          '300': '#ff9b9a',
          '400': '#ff6160',
          '500': '#ff2f2e',
          '600': '#f3100f',
          '700': '#cd0908',
          '800': '#a80c0b',
          '900': '#8b1211',
          '950': '#4c0303',
        },
        'gray': {
          DEFAULT:'#ededed',
          '50': '#f8f8f8',
          '100': '#ededed',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },
      }
    },
  },
  plugins: [require('tailwindcss-textshadow'), require("tailwindcss-animate")],
};
