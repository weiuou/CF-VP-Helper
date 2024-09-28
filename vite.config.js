import { resolve } from 'path'

export default {
  base:'https://github.com/weiuou/CF-VP-Helper/blob/gh-pages/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    target: 'esnext'
  },
  server: {
    port: 8080
  }
}
