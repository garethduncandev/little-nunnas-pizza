/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Aldrich','ui-sans-serif', 'system-ui'],
        'intro': ['CabinSketch', 'ui-sans-serif', 'system-ui']
      },
      colors: {
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
  plugins: [],
};
