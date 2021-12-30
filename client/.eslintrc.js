const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'], // https://stackoverflow.com/questions/63002127/parsing-error-parseroptions-project-has-been-set-for-typescript-eslint-parser
  rules: {
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/lines-between-class-members': OFF,
    '@typescript-eslint/naming-convention': WARNING,
    '@typescript-eslint/no-unused-vars': WARNING,
    'react/prop-types': OFF,
    'react/no-array-index-key': WARNING,
    'react/require-default-props': WARNING,
    'import/prefer-default-export': OFF,
    'no-param-reassign': WARNING,
    'no-underscore-dangle': OFF,
    'spaced-comment': WARNING,
    'jsx-a11y/click-events-have-key-events': WARNING,
    'jsx-a11y/no-static-element-interactions': WARNING,
    'import/no-extraneous-dependencies': WARNING,
    'no-restricted-syntax': WARNING,
    'react/destructuring-assignment': OFF,
    'import/no-named-as-default': OFF,
  },
};
