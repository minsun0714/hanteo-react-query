module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:react-hooks/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: ['react-refresh', '@tanstack/query'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@tanstack/query/exhaustive-deps': 'error',
		'@tanstack/query/no-deprecated-options': 'error',
		'@tanstack/query/prefer-query-object-syntax': 'error',
		'@tanstack/query/stable-query-client': 'error',
	},
};
