import { defineConfig } from "wxt";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		name: "eagle-thumbnail",
		version: "1.0.0",
		permissions: ["storage"],
	},
	srcDir: "src",
	vite: () => ({
		plugins: [
			svelte({
				configFile: path.resolve("./svelte.config.mjs"),
			}),
		],
	}),
});
