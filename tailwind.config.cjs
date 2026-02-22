/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          moss: '#2E4036',
          clay: '#CC5833',
          cream: '#F2F0E9',
          surface: '#FFFFFF',
          charcoal: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      typography: ({ theme }) => ({
        brand: {
          css: {
            '--tw-prose-body': theme('colors.brand.charcoal'),
            '--tw-prose-headings': theme('colors.brand.charcoal'),
            '--tw-prose-links': theme('colors.brand.moss'),
            '--tw-prose-bold': theme('colors.brand.charcoal'),
            '--tw-prose-bullets': theme('colors.brand.clay'),
            '--tw-prose-quote-borders': theme('colors.brand.clay'),
            h1: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontStyle: 'italic',
              fontWeight: '400',
            },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontStyle: 'italic',
              fontWeight: '400',
            },
            blockquote: {
              borderLeftColor: theme('colors.brand.clay'),
              fontStyle: 'italic',
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
