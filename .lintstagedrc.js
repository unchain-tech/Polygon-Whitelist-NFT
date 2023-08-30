const path = require('path');

const buildSolhintCommand = (filenames) =>
  `solhint --max-warnings 0 ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

const buildLintCommand = (filenames) =>
  `eslint ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --check ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

module.exports = {
  '**/*.sol': [buildSolhintCommand],
  '**/*.{html,js,jsx}': [buildLintCommand],
  '**/*.{js,jsx,sol}': [buildPrettierCommand],
};
