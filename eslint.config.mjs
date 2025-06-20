import { defineConfig, globalIgnores } from "eslint/config"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([globalIgnores(["**/node_modules", "*/.angular/cache", "**/.vscode", "**/*.spec.ts"]), {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        semi: ["error", "never"],
        indent: ["error", 4],
        "no-console": "off",
        "no-unused-vars": "warn",
        "no-undef": "error",
        eqeqeq: "error",
        "no-trailing-spaces": "error",
        "eol-last": "error",

        "no-multiple-empty-lines": ["error", {
            max: 2,
        }],
    },
}])
