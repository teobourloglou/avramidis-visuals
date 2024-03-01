/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily : {
      proxima:        ['"proxima-nova", sans-serif'],
      unineueRegular: ['"Unineue Regular", sans-serif'],
      unineueBold:    ['"Unineue Bold", sans-serif']
    },
    extend: {
      colors: {
        'gray-1'  : '#232323',
        'gray-2'  : '#414141',
        'gray-3'  : '#d3d3d3',
        'gray-4'  : '#e4e4e4',
        'primary' : '#0883ba',
      },
    },
  },
  plugins: [],
}

