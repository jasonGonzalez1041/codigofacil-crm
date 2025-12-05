export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      ".turbo/**",
      "coverage/**",
      ".nyc_output/**",
      "*.config.*",
      "drizzle/**"
    ],
    rules: {
      "no-unused-vars": "off",
      "prefer-const": "off",
      "no-var": "off",
    },
  },
];