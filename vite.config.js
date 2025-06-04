// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      '3c383de6-6b4e-4f4d-8c90-8bf4278b21c2-00-1gsepyxp5kbxw.picard.replit.dev'
    ],
    host: '0.0.0.0', // Ensure the server is accessible externally
    port: 5000, // Use port 5000 for development
  },
});