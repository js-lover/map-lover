import { createTamagui } from 'tamagui'
import { themes, tokens } from '@tamagui/theme-base'

export default createTamagui({
  themes,
  tokens,
  shorthands: {
    p: 'padding',
    m: 'margin',
  },
})
