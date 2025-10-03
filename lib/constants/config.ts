import { Dimensions } from 'react-native'


export const VERSION = "v1.1"
export const VERSION_PATCH = 1
export const STORE_NAME = "finetag"

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height


export const FONT_FAMILIES = {
  REGULAR: 'Poppins-Regular',
  MEDIUM: 'Poppins-Medium',
  SEMIBOLD: 'Poppins-SemiBold',
  BOLD: 'Poppins-Bold',
}

export const FONT_SIZES = {
  CAPTION: 12,
  BODY: 14,
  BODY_LARGE: 16,
  TITLE: 18,
  HEADING: 20,
  DISPLAY: 24
}
