import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: ["src/index.ts"],
		outDir: "dist",
		format: ["esm"],
		clean: true,
		minify: !options.watch,
		splitting: false,
		sourcemap: false,
	};
});
