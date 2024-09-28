import { resolve } from 'path'

export default {
  base: '/CF-VP-Helper/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    target: 'esnext'
  },
  server: {
    port: 8080
  }
}
