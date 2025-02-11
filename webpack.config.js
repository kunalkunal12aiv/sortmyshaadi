// ...existing webpack config...
module.exports = {
  // ...existing config...
  devtool: 'source-map',
  module: {
    rules: [
      // ...existing rules...
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/react-datepicker/
      }
    ]
  },
  // Add ignoreWarnings to suppress source map warnings from react-datepicker
  ignoreWarnings: [
    {
      module: /react-datepicker\/.*/,
      message: /Failed to parse source map/
    }
  ],
  // ...existing config...
};
