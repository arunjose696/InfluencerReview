export default defineConfig({
  server: {
    proxy: {
      '/api-images': {
        target: 'https://yt3.ggpht.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-images/, '')
      }
    }
  }
}) 