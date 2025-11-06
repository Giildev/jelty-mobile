import { useColorScheme as useNativewindColorScheme } from "nativewind";

/**
 * Hook personalizado para manejo de color scheme (dark mode)
 * Envuelve el hook de NativeWind con una API más clara
 *
 * Nota: NativeWind v4 retorna 'light' | 'dark' | undefined
 * El valor undefined significa que está usando el tema del sistema
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  return {
    /**
     * Color scheme actual: 'light', 'dark', o undefined (sistema)
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
    isSystem: colorScheme === undefined,
    /**
     * Establece el color scheme
     * @param scheme - 'light', 'dark', o undefined (para sistema)
     */
    setColorScheme,
    /**
     * Alterna entre light y dark (no afecta system)
     */
    toggleColorScheme,
  };
}
