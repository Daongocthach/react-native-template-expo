import { Elevation, ThemeColors } from "@/theme/theme"

export type ThemeColorKeys = Exclude<keyof ThemeColors, "elevation">
export type ElevationKeys = keyof Elevation

export type DropdownProps = {
  label: string
  value: string
}

export type FileProps = {
  uri: string
  name: string
  type: string
}