import { resolve } from 'path'

export default {
  base:'https://github.com/weiuou/CF-VP-Helper/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
}
