// Contains config for prettier for .json files.
// Config for .ts files is in .eslintrc.js.
module.exports = {
    overrides: [
	{
	    files: "*.json",
	    options: {
		tabWidth: 2,
		useTabs: false,
		jsonRecursiveSort: true,
	    }
	}
    ]
}
