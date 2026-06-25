/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — Salem College deep royal blue
        navy: {
          DEFAULT: '#1A2E8F',
          950: '#0C1540',
          900: '#111E5C',
          800: '#1A2E8F',
          700: '#2540B4',
          600: '#3055CC',
          500: '#4470E0',
          400: '#6690EE',
        },
        // Accent — college gold / warm yellow
        gold: {
          DEFAULT: '#F5B800',
          dark:    '#C99800',
          600:     '#D4A017',
          500:     '#F5B800',
          400:     '#FFCC33',
          300:     '#FFD966',
          200:     '#FFE99A',
          soft:    '#FFFBEB',
          muted:   '#FEF3C7',
        },
        // Accent blue (for links, focus rings)
        accent: {
          DEFAULT: '#2E4EC4',
          soft: '#EBF0FB',
        },
        // Neutral canvas — cool blue-white
        canvas: '#F4F6FC',
        ink:    '#0F1B33',
        primary: '#1A2E8F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        // Soft, layered, low-contrast — premium feel
        xs: '0 1px 2px rgba(15,27,51,0.04)',
        card: '0 1px 2px rgba(15,27,51,0.04), 0 1px 3px rgba(15,27,51,0.06)',
        elevated: '0 4px 12px rgba(15,27,51,0.06), 0 2px 4px rgba(15,27,51,0.04)',
        float: '0 12px 32px -8px rgba(16,54,125,0.18)',
        ring: '0 0 0 4px rgba(59,130,196,0.12)',
      },
      keyframes: {
        shimmer:   { '100%': { transform: 'translateX(100%)' } },
        pulseSoft: { '0%,100%': { opacity: '0.45' }, '50%': { opacity: '1' } },
        goldPulse: { '0%,100%': { opacity: '0.7' }, '50%': { opacity: '1' } },
      },
      animation: {
        shimmer:   'shimmer 1.6s infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        goldPulse: 'goldPulse 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
