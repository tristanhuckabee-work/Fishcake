import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      "/assets": "http://localhost:8000",
      "/tickets": "http://localhost:8000",
      "/users": "http://localhost:8000",
      "/session": "http://localhost:8000",
    }
  }
});