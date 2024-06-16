// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      autoInstall: true,
      scale: 1.5,
      unit: 'rem'
    })
  ]
  // ...UnoCSS options
})