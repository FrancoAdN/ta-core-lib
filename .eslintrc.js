module.exports = {
  env: {
    es2020: true,
    jest: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit',
      },
    ],
    'import/order': 'off',
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    '@typescript-eslint/member-ordering': 'off',
    'arrow-parens': ['off', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-inferrable-types': ['off', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': ['off', 'always'],
    '@typescript-eslint/no-explicit-any': ['off', 'always'],
    '@typescript-eslint/ban-types': ['off', 'always'],
    'prefer-spread': ['off', 'always'],
    '@typescript-eslint/no-array-constructor': ['off', 'always'],
    'no-console': ['error'],
    'prefer-const': ['off', 'always'],
    '@typescript-eslint/no-empty-function': ['off', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'no-return-await': ['error'],
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'max-len': [
          'error',
          {
            code: 150,
            ignoreStrings: true,
          },
        ],
      },
    },
  ],
};
