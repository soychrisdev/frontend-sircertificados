module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:import/typescript",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "react", "prettier","unused-imports"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
    "sort-imports": [
      "error",
      {
        "ignoreDeclarationSort": true
      }
  ],
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		]
    
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
      }
    }
  ]
}
