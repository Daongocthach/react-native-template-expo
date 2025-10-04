import { useTheme } from "@/contexts/ThemeProvider"
import { ThemeColorKeys, ElevationKeys } from "@/lib/types"

export function useResolveColor() {
  const { colors } = useTheme()

  function resolveColor(
    colorName?: ThemeColorKeys | ElevationKeys | string
  ): string | undefined {
    if (!colorName) return undefined

    if ((colors.elevation as any)[colorName as ElevationKeys]) {
      return colors.elevation[colorName as ElevationKeys]
    }

    if ((colors as any)[colorName as ThemeColorKeys]) {
      return (colors as any)[colorName as ThemeColorKeys]
    }

    return colorName
  }

  return { resolveColor }
}
