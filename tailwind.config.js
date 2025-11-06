/**
 * Jelty Tailwind Configuration
 *
 * Sistema de diseño completo moderno
 * Todos los tokens están centralizados en constants/tokens/index.ts
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ============================================
      // COLORES
      // ============================================
      colors: {
        // Brand Primary - Deep Purple (#1F024B)
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#1F024B',
          DEFAULT: '#1F024B',
        },
        // Accent Lime (#E0FF2C)
        'accent-lime': {
          50: '#FEFCE8',
          100: '#FEFFC8',
          200: '#FEFF88',
          300: '#E0FF2C',
          400: '#C9E619',
          500: '#A8C410',
          600: '#7F9409',
          700: '#5F6F0C',
          DEFAULT: '#E0FF2C',
        },
        // Accent Green (#0CDA51)
        'accent-green': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#0CDA51',
          600: '#16A34A',
          700: '#15803D',
          DEFAULT: '#0CDA51',
        },
        // Secondary Blue (#147BFE)
        secondary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#147BFE',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#147BFE',
        },
        // Base colors
        base: {
          black: '#1C1C1C',
          white: '#FFFFFF',
        },
        // Semantic colors
        success: '#0CDA51',
        warning: '#FBB040',
        error: '#EF4444',
        info: '#147BFE',
      },

      // ============================================
      // ESPACIADO
      // ============================================
      spacing: {
        0.5: '2px',
        1.5: '6px',
        2.5: '10px',
        3.5: '14px',
      },

      // ============================================
      // TIPOGRAFÍA
      // ============================================
      fontFamily: {
        sans: ['Roboto_400Regular', 'Roboto_500Medium', 'Roboto_700Bold', 'system-ui', '-apple-system'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
        '7xl': ['72px', { lineHeight: '1' }],
        '8xl': ['96px', { lineHeight: '1' }],
        '9xl': ['128px', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.8px',
        tight: '-0.4px',
        normal: '0px',
        wide: '0.4px',
        wider: '0.8px',
        widest: '1.6px',
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },

      // ============================================
      // SOMBRAS (via plugin)
      // ============================================
      // Las sombras se implementan como utilidades custom

      // ============================================
      // OPACIDAD
      // ============================================
      opacity: {
        5: '0.05',
        95: '0.95',
      },

      // ============================================
      // BLUR
      // ============================================
      blur: {
        xs: '2px',
        '3xl': '64px',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
    },
  },

  // ============================================
  // PLUGINS
  // ============================================
  plugins: [
    // Plugin para efectos Glass Morphism
    function({ addUtilities }) {
      const glassUtilities = {
        // Glass Light (para light mode)
        '.glass-light': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        '.glass-light-heavy': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },

        // Glass Dark (para dark mode)
        '.glass-dark': {
          backgroundColor: 'rgba(28, 28, 28, 0.7)',
        },
        '.glass-dark-heavy': {
          backgroundColor: 'rgba(28, 28, 28, 0.9)',
        },

        // Glass Primary
        '.glass-primary': {
          backgroundColor: 'rgba(31, 2, 75, 0.3)',
        },
        '.glass-primary-medium': {
          backgroundColor: 'rgba(31, 2, 75, 0.5)',
        },
        '.glass-primary-heavy': {
          backgroundColor: 'rgba(31, 2, 75, 0.7)',
        },
      };

      addUtilities(glassUtilities);
    },

    // Nota: Las sombras personalizadas para React Native deben ser aplicadas
    // usando StyleSheet.create() con los objetos de constants/tokens/shadows.ts
    // porque React Native requiere shadowOffset como objeto { width, height },
    // no como string CSS.
  ],
}
