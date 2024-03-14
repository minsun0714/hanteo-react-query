module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh"],
  settings: {
    "import/resolver": {
      node: {},
      typescript: {
        directory: "./src",
      },
    },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
