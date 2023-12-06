module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es2020": true
	},
	"extends": [],
	"ignorePatterns": [
		"dist",
		"package.json",
		".eslintrc.cjs",
		".env.ts",
		".env.*.ts",
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"unused-imports",
	],
	"rules": {
		"unused-imports/no-unused-imports": "warn"
	}
}
