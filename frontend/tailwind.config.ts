import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.24)'
      },
      keyframes: {
        pulseGrid: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.7' }
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -20px, 0)' }
        }
      },
      animation: {
        pulseGrid: 'pulseGrid 8s ease-in-out infinite',
        driftSlow: 'drift 12s ease-in-out infinite'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'gaetan_dark',
    themes: [
      {
        gaetan_dark: {
          primary: '#38bdf8',
          secondary: '#818cf8',
          accent: '#22d3ee',
          neutral: '#111827',
          'base-100': '#05070d',
          'base-200': '#0c1325',
          'base-300': '#111d32',
          'base-content': '#e5eef9',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      },
      {
        gaetan_light: {
          primary: '#0f4c81',
          secondary: '#5b5bd6',
          accent: '#0891b2',
          neutral: '#1f2937',
          'base-100': '#f3f6fa',
          'base-200': '#e8eef7',
          'base-300': '#dce5f2',
          'base-content': '#17253a',
          info: '#2563eb',
          success: '#16a34a',
          warning: '#ca8a04',
          error: '#dc2626'
        }
      }
    ]
  }
};

export default config;
