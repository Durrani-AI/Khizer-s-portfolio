import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
	plugins: [
		tsconfigPaths(),
		tanstackStart(),
		react(),
		tailwindcss(),
		...(command === "build" ? [cloudflare({
			viteEnvironment: {
				name: "ssr",
			},
		})] : []),
	],
	resolve: {
		// Keep a single React runtime to avoid subtle hydration/render mismatches.
		dedupe: ["react", "react-dom"],
	},
}));
