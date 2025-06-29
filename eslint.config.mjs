import { defineConfig, globalIgnores } from "eslint/config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([globalIgnores(["node_modules", "*/.angular/cache", "**/*.spec.ts"]), {
    plugins: {
        import: importPlugin
    },
    extends: compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
    ),
}, {
    files: ["**/*.ts", "**/*.js"],

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@angular-eslint/prefer-standalone": "off",
        semi: ["error", "never"],
        indent: ["error", 4],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['@/**'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },
}])