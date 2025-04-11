import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "../../.eslintrc.js",
      "plugin:@typescript-eslint/recommended"
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"]
    },
    settings: {
      "next": {
        "rootDir": "packages/client/"
      }
    }
  }),
]

export default eslintConfig
