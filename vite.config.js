import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Port is selected per role via npm scripts:
//   npm run student → 2020, staff → 2021, admin → 2022, superadmin → 2023
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2020,
    open: true,
  },
  preview: {
    port: 2020,
  },
})
