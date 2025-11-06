import { useColorScheme as useNativewindColorScheme } from "nativewind";

/**
 * Hook personalizado para manejo de color scheme (dark mode)
 * Envuelve el hook de NativeWind con una API más clara
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  return {
    /**
     * Color scheme actual: 'light', 'dark', o 'system'
     */
    colorScheme,
    /**
     * Determina si está en modo oscuro
     */
    isDark: colorScheme === "dark",
    /**
     * Determina si está en modo claro
     */
    isLight: colorScheme === "light",
    /**
     * Determina si está usando el tema del sistema
     */
    isSystem: colorScheme === "system",
    /**
     * Establece el color scheme
     * @param scheme - 'light', 'dark', o 'system'
     */
    setColorScheme,
    /**
     * Alterna entre light y dark (no afecta system)
     */
    toggleColorScheme,
  };
}
