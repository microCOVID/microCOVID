// Contains config for prettier for .json files.
// Config for .ts files is in .eslintrc.js.
module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.json',
      options: {
        jsonRecursiveSort: true,
      },
    },
  ],
}
