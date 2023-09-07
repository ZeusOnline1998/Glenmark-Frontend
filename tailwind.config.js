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
      }
    },
	},
	plugins: [],
};
