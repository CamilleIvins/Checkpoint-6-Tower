export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-empex7cj2h0al138.us.auth0.com'
export const clientId = 'kyRI3q7Ma6zMxpGCiHHj5zh8In3fcHDN'
export const audience = 'https://sandcastle.com'

// REPO_NAME secret is NOT this repo, but docker
// ZVL4bcvPZQLMBI358CDHdndwYiEn70mF
//kyRI3q7Ma6zMxpGCiHHj5zh8In3fcHDN

// export const dev = window.location.origin.includes('localhost')
// export const baseURL = dev ? 'http://localhost:3000' : '/node-project'

// Also if you are deploying to a nested url you will need to add a route-prefix in your docker-compose secret and add a property  in vite.config.js
// import vue from '@vitejs/plugin-vue'
// import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   base: 'node-project',
//   build: {
//     outDir: 'docs',
//     sourcemap: false,
//   },
//   server: {
//     port: 8080
//   }
// })