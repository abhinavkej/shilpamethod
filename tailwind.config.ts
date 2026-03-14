import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        deep: '#1B3B2A',
        sage: '#4A7A5C',
        'lt-sage': '#EAF4ED',
        terra: '#C4714A',
        gold: '#A68B52',
        muted: '#6B7B6E',
        warm: '#8B7E74',
        border: '#E2D9CC',
        'risk-low': '#2A7A50',
        'risk-low-bg': '#E8F5EE',
        'risk-med': '#C9952A',
        'risk-med-bg': '#FEF3E2',
        'risk-hi': '#B83A33',
        'risk-hi-bg': '#FDECEA',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
