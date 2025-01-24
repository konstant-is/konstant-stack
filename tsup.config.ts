import { defineConfig } from "tsup";

const payload = [
  "src/payload/index.ts",
  "src/payload/fields/index.ts",
  "src/payload/queries/index.ts",
  "src/payload/exports/client.ts",
];

const utils = ["src/utils/index.ts", "src/utils/date/index.ts"];

export default defineConfig((options) => ({
  entry: [...payload, ...utils],
  outDir: "dist", // Output directory
  format: ["cjs", "esm"], // Build CommonJS and ESM formats
  sourcemap: true, // Generate source maps
  dts: true, // Generate type declarations
  // minify: true, // Minify output
  clean: true, // Clean output directory before building
  css: true, // Include CSS in the build
  external: [
    "@payloadcms/next",
    "@payloadcms/ui",
    "date-fns",
    "next",
    "payload",
    "react",
    "react-dom",
  ],
  esbuildOptions: (options) => {
    options.alias = {
      "@": "./src", // Map '@' to the 'src' directory
    };
  },
}));
