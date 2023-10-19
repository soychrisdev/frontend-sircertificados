import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  if (command === "serve") {
    console.log("using vite.config. DEV option");

    return {
      plugins: [react()],
      server: {
        proxy: {
          "/api": {
            target: "http://[::1]:3000/api",
            secure: false,
            changeOrigin: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    };
  } else {
    console.log("using vite.config. build option");
    return {
      plugins: [react()],
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:3000/Constancias/api", // work in build
            // target: "http://[::1]:54111/api", // work in build but local
            secure: false,
            changeOrigin: true, // work in local
            // rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    };
  }
});
