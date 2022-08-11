module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  plugins: ["@typescript-eslint", "jsx-a11y", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
