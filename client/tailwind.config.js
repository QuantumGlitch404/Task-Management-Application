/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      colors: {
        midnight: '#000000',
        obsidian: '#0a0a0a',
        charcoal: '#141414',
        graphite: '#1f1f1f',
        
        white: '#fafafa',
        silver: '#b4b4b4',
        slate: '#6e6e6e',
        shadow: '#3a3a3a',
        
        blue: {
          primary: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          glow: 'rgba(59, 130, 246, 0.15)',
        },
        
        green: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
          glow: 'rgba(34, 197, 94, 0.15)',
        },
        
        amber: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        
        red: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
          glow: 'rgba(239, 68, 68, 0.15)',
        },
        
        gray: {
          DEFAULT: '#8b8b8b',
          light: '#a3a3a3',
          glow: 'rgba(139, 139, 139, 0.15)',
        },

        border: {
          DEFAULT: '#1f1f1f',
          light: '#2a2a2a'
        },
        
        input: {
          bg: '#0f0f0f'
        },
        card: {
          bg: '#0a0a0a'
        },
        overlay: 'rgba(0, 0, 0, 0.8)'
      },
      fontFamily: {
        heading: ['Sora', '-apple-system', 'sans-serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '40px',
        8: '48px',
        9: '64px',
        10: '80px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      }
    },
  },
  plugins: [],
}
