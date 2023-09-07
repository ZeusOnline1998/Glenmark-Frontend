/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
      'backgroundImage': {
        'login': "url('/public/login_image.png')",
        'sidebar': "url('/public/sidebar_image.png')",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'navbar': '7px 7px 23px - 4px rgba(0,0,0,0.75)',
      },
      'colors': {
        'blue-zodiac': {
          '50': '#f1f8fe',
          '100': '#e2effc',
          '200': '#c0dff7',
          '300': '#88c5f1',
          '400': '#48a7e8',
          '500': '#208cd7',
          '600': '#126fb7',
          '700': '#105894',
          '800': '#114c7b',
          '900': '#12395b',
          '950': '#0d2944',
        },
        'mystic': {
          '50': '#f5f8f9',
          '100': '#e6ebef',
          '200': '#d7e0e6',
          '300': '#bccad4',
          '400': '#9bb0bf',
          '500': '#8398ae',
          '600': '#71859f',
          '700': '#657590',
          '800': '#566277',
          '900': '#475161',
          '950': '#2e343d',
        },
      }
    },
	},
	plugins: [],
};
