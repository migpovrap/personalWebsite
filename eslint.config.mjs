import nextConfig from "eslint-config-next";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import validateFilename from "eslint-plugin-validate-filename";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  ...nextVitals,
  ...nextTs,

  {
    settings: {
      react: {
        version: "19.2",
      },
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "validate-filename": validateFilename,
    },
    rules: {
      "validate-filename/naming-rules": [
        "error",
        {
          rules: [
            { case: "pascal", target: "**/components/**" },
            { case: "camel", target: "**/app/api/**" },
            {
              case: "kebab",
              target: "**/app/**",
              patterns: "^(page|layout|loading|error|not-found|route|template).tsx$",
            },
            { case: "camel", target: "**/hooks/**", patterns: "^use" },
            { case: "camel", target: "**/providers/**", patterns: "^[a-zA-Z]*Provider" },
          ],
        },
      ],
    },
  },

  {
    ignores: [
      ".next/*",
      "out/*",
      "worker-bundle/*",
      "public/*",
      "node_modules/*",
      "next-env.d.ts",
      "eslint.config.mjs",
    ],
  },
];
