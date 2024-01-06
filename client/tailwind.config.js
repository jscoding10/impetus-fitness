/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'teko': ['Teko', 'sans-serif'],
      },
      colors: {
        'electric': {
          '50': '#f8ffe6',
          '100': '#efffc8',
          '200': '#defe98',
          '300': '#c2f950',
          '400': '#adef2c',
          '500': '#8ed60c',
          '600': '#6dab05',
          '700': '#538209',
          '800': '#44660e',
          '900': '#395611',
          '950': '#1c3003',
        },
        'cinder': {
          '50': '#eeefff',
          '100': '#dcdeff',
          '200': '#b2bbff',
          '300': '#6d81ff',
          '400': '#2040ff',
          '500': '#0016ff',
          '600': '#0006df',
          '700': '#0003b4',
          '800': '#000595',
          '900': '#00047a',
          '950': '#000010',
        },
        'heather-gray': {
          '50': '#f6f7f8',
          '100': '#eaecef',
          '200': '#dadee3',
          '300': '#b9c1c9',
          '400': '#a3adb7',
          '500': '#8c96a5',
          '600': '#7b8495',
          '700': '#6e7687',
          '800': '#5d6270',
          '900': '#4d515b',
          '950': '#31333a',
        },
      }
    },
  },
  plugins: [],
}

