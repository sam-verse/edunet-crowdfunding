/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        'w-16': 16,
        'h-9': 9,
        'w-4': 4,
        'h-5': 5,
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};