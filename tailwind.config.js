module.exports = {
  purge: [],
  theme: {
    screens: {
      'xs': {'max': '640px'},
      'sm': {'max': '768px'},
      'md': {'max': '1024px'},
      'lg': {'max': '1280px'},
      'xl': {'max': '1500px'},
    },
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        },
        bluegray: {
          '100': '#cfd8dc',
          '200': '#b0bec5',
          '300': '#90a4ae',
          '400': '#78909c',
          '500': '#607d8b',
          '600': '#546e7a',
          '700': '#455a64',
          '800': '#37474f',
          '900': '#263238',
        },
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
  },
  variants: {
    listStyleType: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
