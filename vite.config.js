import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    target: 'esnext'
  },
  server: {
    port: 8080
  }
}
