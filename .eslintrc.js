module.exports = {
    parserOptions: {
        project: './tsconfig.json'
    },
    env: {
        jest: true,
        mocha: true
    },
    plugins: [
        'mocha',
        'jest'
    ],
    extends: [
        'airbnb-typescript',
        'airbnb-typescript-prettier'
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/ban-ts-ignore": "off"
    },
};