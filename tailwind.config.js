/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-baloo)', 'cursive'],
        kid:     ['var(--font-nunito)', '"Nunito"', 'sans-serif'],
      },
      colors: {
        primary:   '#6C63FF',
        secondary: '#FF6584',
        success:   '#48BB78',
        warning:   '#F6AD55',
        info:      '#4299E1',
        purple:    '#9B59B6',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle':      'wiggle 0.5s ease-in-out',
        'pop':         'pop 0.3s ease-out',
        'float':       'float 4s ease-in-out infinite',
        'twinkle':     'twinkle 2.4s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%':     { transform: 'rotate(5deg)' },
        },
        pop: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-10px) rotate(1.5deg)' },
          '66%':     { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        twinkle: {
          '0%,100%': { opacity: '1',   transform: 'scale(1) rotate(0deg)' },
          '50%':     { opacity: '0.4', transform: 'scale(0.7) rotate(25deg)' },
        },
      },
    },
  },
  plugins: [],
}
