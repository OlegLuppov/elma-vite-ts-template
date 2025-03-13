import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist', '**/elmaScripts', 'plugins'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{js,ts,}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'no-var': 'error',
			'prefer-const': 'off',
			'no-console': 'warn',
			'no-alert': 'warn',
			semi: 'off',
			quotes: ['error', 'single'],
			'no-plusplus': 'off',
			'function-paren-newline': 'off',
			'arrow-body-style': 'off',
			'no-mixed-spaces-and-tabs': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			quotes: ['error', 'single'],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	}
)
