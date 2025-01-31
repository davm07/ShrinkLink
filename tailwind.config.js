/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A1C20',
        foreground: '#EEEEEE',
        title: '#FF9543',
        btn: '#FF9543',
        btnText: '#1A1C20',
        borderInput: '#EEEEEE',
        focus: '#FF9543'
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        permanentMarker: ['Permanent Marker', 'sans-serif']
      }
    }
  },
  plugins: []
};
