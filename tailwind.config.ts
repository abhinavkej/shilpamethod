import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: '#F8F3E8',
        bone: '#FBF7EE',
        sand: '#EFE7D4',
        surface: '#FFFFFF',
        'surface-alt': '#F8F3E8',

        // Deep warm greens (primary brand)
        forest: '#1F3A2E',
        ivy: '#2D5445',
        moss: '#4A7A5C',

        // Coral / terracotta (accent — warm, clinical, not pink)
        coral: '#D97757',
        'coral-soft': '#F4D7C8',
        rust: '#B85C3F',

        // Neutrals
        ink: '#1A1A1A',
        graphite: '#2B2B2B',
        slate: '#6B6358',
        muted: '#8C8478',
        border: '#D9CFBE',

        // Semantic (retained for the document mockup)
        'risk-low': '#2D6A4F',
        'risk-low-bg': '#E5EEE6',
        'risk-med': '#B5850A',
        'risk-med-bg': '#F8EFD4',
        'risk-hi': '#C1292E',
        'risk-hi-bg': '#F5DCD8',

        // Aliases for prior code paths
        primary: '#1F3A2E',
        secondary: '#6B6358',
        tertiary: '#8C8478',
        accent: '#D97757',
        'accent-hover': '#B85C3F',
        sage: '#2D6A4F',
        'sage-light': '#E5EEE6',
      },
      fontFamily: {
        display: ['"Fraunces"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(44px, 7vw, 88px)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '400' }],
        'display-xl': ['clamp(40px, 5.5vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg': ['clamp(32px, 4vw, 48px)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['clamp(28px, 3vw, 36px)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-sm': ['24px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-lg': ['19px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['17px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.55', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
} satisfies Config
