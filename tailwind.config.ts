import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d1d1f',
        secondary: '#86868b',
        tertiary: '#6e6e73',
        surface: '#ffffff',
        'surface-alt': '#f5f5f7',
        border: '#d2d2d7',
        accent: '#1d1d1f',
        'accent-hover': '#424245',
        sage: '#2d6a4f',
        'sage-light': '#edf6f0',
        'risk-low': '#2d6a4f',
        'risk-low-bg': '#edf6f0',
        'risk-med': '#b5850a',
        'risk-med-bg': '#fef9e7',
        'risk-hi': '#c1292e',
        'risk-hi-bg': '#fdeaea',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"SF Mono"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '300' }],
        'display-lg': ['56px', { lineHeight: '1.07', letterSpacing: '-0.025em', fontWeight: '300' }],
        'display-md': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-sm': ['28px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
        'body-lg': ['21px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['17px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
} satisfies Config
