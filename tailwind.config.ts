import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#214f37',
      },
      backgroundColor: {
        primary: '#214f37',
      },
    },
  },
  plugins: [],
}

export default config