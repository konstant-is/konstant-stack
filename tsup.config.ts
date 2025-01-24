import { defineConfig } from "tsup";

const payloadEntries = [
  "src/payload/index.ts",
  "src/payload/fields/index.ts",
  "src/payload/queries/index.ts",
  "src/payload/exports/client.ts",
];
export default defineConfig((options) => ({
  entry: [...payloadEntries, "src/utils/index.ts"],
  outDir: "dist", // Output directory
  format: ["cjs", "esm"], // Build CommonJS and ESM formats
  sourcemap: true, // Generate source maps
  dts: true, // Generate type declarations
  // minify: true, // Minify output
  clean: true, // Clean output directory before building
  css: true, // Include CSS in the build
  external: ["react", "payload", "@payloadcms/ui"],
  esbuildOptions: (options) => {
    options.alias = {
      "@": "./src", // Map '@' to the 'src' directory
    };
  },
}));
