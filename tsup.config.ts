import { sassPlugin } from "esbuild-sass-plugin";
import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "src/utils/index.ts",
    "src/utils/date.ts",
    "src/utils/object.ts",
    "src/utils/string.ts",
    "src/payload/index.ts",
    "src/payload/components.ts",
  ], // Main entry point
  outDir: "dist", // Output directory
  format: ["cjs", "esm"], // Build CommonJS and ESM formats
  sourcemap: true, // Generate source maps
  dts: true, // Generate type declarations
  // minify: true, // Minify output
  clean: true, // Clean output directory before building
  css: true, // Include CSS in the build
  external: ["react", "payload"],
  // injectCSS: true,
  esbuildPlugins: [
    sassPlugin({
      type: "css",
    }),
  ],
  esbuildOptions: (options) => {
    options.alias = {
      "@": "./src", // Map '@' to the 'src' directory
    };
  },
}));
