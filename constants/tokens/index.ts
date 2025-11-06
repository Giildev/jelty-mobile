/**
 * Jelty Design System Tokens
 *
 * Sistema de diseño centralizado con estética moderna
 * Todos los valores de diseño de la app deben usar estos tokens
 */

// ============================================
// COLORES
// ============================================

export const colors = {
  // Brand Primary - Deep Purple
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
    950: '#1F024B',  // Main brand color
    DEFAULT: '#1F024B',
  },

  // Accent Colors
  accent: {
    lime: {
      50: '#FEFCE8',
      100: '#FEFFC8',
      200: '#FEFF88',
      300: '#E0FF2C',  // Main lime accent
      400: '#C9E619',
      500: '#A8C410',
      600: '#7F9409',
      700: '#5F6F0C',
      DEFAULT: '#E0FF2C',
    },
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#0CDA51',  // Main green accent
      600: '#16A34A',
      700: '#15803D',
      DEFAULT: '#0CDA51',
    },
  },

  // Secondary - Blue
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#147BFE',  // Main secondary
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    DEFAULT: '#147BFE',
  },

  // Base/Neutral
  base: {
    black: '#1C1C1C',
    white: '#FFFFFF',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#1C1C1C',
      950: '#0A0A0A',
    },
  },

  // Semantic Colors
  semantic: {
    success: '#0CDA51',
    warning: '#FBB040',
    error: '#EF4444',
    info: '#147BFE',
  },

  // Glass/Translucent overlays (para usar en StyleSheet)
  glass: {
    light: 'rgba(255, 255, 255, 0.7)',
    lightHeavy: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(28, 28, 28, 0.7)',
    darkHeavy: 'rgba(28, 28, 28, 0.9)',
    primaryLight: 'rgba(31, 2, 75, 0.1)',
    primaryMedium: 'rgba(31, 2, 75, 0.3)',
    primaryHeavy: 'rgba(31, 2, 75, 0.7)',
  },
} as const;

// ============================================
// ESPACIADO
// ============================================

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

// ============================================
// TIPOGRAFÍA
// ============================================

export const typography = {
  fontFamily: {
    sans: ['Roboto_400Regular', 'Roboto_500Medium', 'Roboto_700Bold', 'system-ui', '-apple-system'],
    mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 1,
    '6xl': 1,
    '7xl': 1,
    '8xl': 1,
    '9xl': 1,
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const radius = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// ============================================
// SOMBRAS
// ============================================

export const shadows = {
  // Sombras estándar
  xs: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 16,
  },

  // Sombras glass (suaves, difusas, con tinte primary)
  glass: {
    shadowColor: '#1F024B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  glassHeavy: {
    shadowColor: '#1F024B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 10,
  },
} as const;

// ============================================
// OPACIDAD
// ============================================

export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

// ============================================
// BLUR (para backdrop filters)
// ============================================

export const blur = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 40,
  '3xl': 64,
} as const;

// ============================================
// ANIMACIONES
// ============================================

export const animations = {
  duration: {
    fastest: 100,
    fast: 200,
    normal: 300,
    slow: 400,
    slowest: 500,
  },
  easing: {
    // Curvas de Apple-style
    standard: [0.4, 0.0, 0.2, 1] as const,
    emphasized: [0.4, 0.0, 0.6, 1] as const,
    decelerated: [0.0, 0.0, 0.2, 1] as const,
    accelerated: [0.4, 0.0, 1, 1] as const,
  },
} as const;

// ============================================
// BREAKPOINTS (para responsive)
// ============================================

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================
// EXPORTS HELPERS
// ============================================

// Export todo junto para fácil importación
export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  opacity,
  blur,
  animations,
  breakpoints,
} as const;

export default tokens;

// ============================================
// TYPESCRIPT TYPES
// ============================================

/**
 * Tipo para la paleta de colores completa
 */
export type ColorPalette = typeof colors;

/**
 * Tipo para la escala de espaciado
 */
export type SpacingScale = typeof spacing;

/**
 * Tipo para el sistema de tipografía
 */
export type TypographySystem = typeof typography;

/**
 * Tipo para la escala de border radius
 */
export type RadiusScale = typeof radius;

/**
 * Tipo para los estilos de sombras
 */
export type ShadowStyles = typeof shadows;

/**
 * Tipo para la escala de opacidad
 */
export type OpacityScale = typeof opacity;

/**
 * Tipo para la escala de blur
 */
export type BlurScale = typeof blur;

/**
 * Tipo para la configuración de animaciones
 */
export type AnimationConfig = typeof animations;

/**
 * Tipo para los breakpoints responsive
 */
export type Breakpoints = typeof breakpoints;

/**
 * Tipo para todos los tokens del sistema de diseño
 */
export type DesignTokens = typeof tokens;
