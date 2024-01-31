import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@images": "/src/assets/images",
      "@components": "/src/components",
      // 다른 별칭들 추가 가능
    },
  },
});
