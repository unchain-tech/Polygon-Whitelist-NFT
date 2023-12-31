module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  plugins: ['prettier-plugin-solidity'],
  overrides: [
    {
      files: '**/*.sol',
      options: {
        tabWidth: 4,
        singleQuote: false,
      },
    },
  ],
};
