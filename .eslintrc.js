module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  globals: {
    ethereum: 'readonly',
    ethers: 'readonly',
    fundButton: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html'],
    'html/report-bad-indent': 'error',
  },
};
