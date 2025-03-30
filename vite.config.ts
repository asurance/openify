import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "openify",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
    },
    plugins: [react(), dts({ tsconfigPath: "./tsconfig.app.json" })],
});
