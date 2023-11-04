import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
      // global
        'onetime': '600px',
        'xs': '0px', 
      // navbar
        'n-xs': '0px',
        'n-sm': '738px',
        'n-md': '800px',
        'n-lg': '1025px',
        'n-xl': '1174px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
  },
  ],
}
export default config
