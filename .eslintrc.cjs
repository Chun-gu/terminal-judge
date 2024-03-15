module.exports = {
	root: true,
	env: { node: true, es2024: true },
	settings: {
		"import/resolver": { typescript: true, node: true },
	},
	extends: [
		"eslint:recommended",
		"plugin:import/typescript",
		"plugin:import/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json"],
		tsconfigRootDir: __dirname,
	},
	plugins: ["@typescript-eslint", "@stylistic"],
	rules: {
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@stylistic/padding-line-between-statements": [
			"error",
			{ prev: "*", blankLine: "always", next: "return" },
			{ prev: "import", blankLine: "always", next: "*" },
			{ prev: "import", blankLine: "any", next: "import" },
			{ prev: ["type", "interface"], blankLine: "always", next: "*" },
		],
		"sort-imports": [
			"error",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
				allowSeparatedGroups: true,
			},
		],
		"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
		"import/order": [
			"error",
			{
				groups: [
					"builtin",
					"external",
					"internal",
					["parent", "sibling", "index"],
					"type",
				],
				pathGroups: [
					{
						pattern: "@/**",
						position: "after",
						group: "external",
					},
				],
				"newlines-between": "always",
				pathGroupsExcludedImportTypes: ["type"],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	overrides: [
		{
			files: ["./**/*.{cjs,js}"],
			extends: ["plugin:@typescript-eslint/disable-type-checked"],
		},
	],
};
