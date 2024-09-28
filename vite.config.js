import { resolve } from 'path'

export default {
  base: 'https://raw.githubusercontent.com/weiuou/CF-VP-Helper/refs/heads/gh-pages/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    target: 'esnext'
  },
  server: {
    port: 8080
  }
}
