const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};

// For minified version — without external dependencies
const minConfig = {
  entry: "./src/sequence-viewer.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    library: "Sequence",
    libraryTarget: "var",
    filename: "sequence-viewer.min.js",
  },
};

// For complete version — including external dependencies
const maxConfig = {
  entry: "./lib/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    library: "Sequence",
    libraryTarget: "var",
    filename: "sequence-viewer.bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/simple.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = [
  merge(commonConfig, minConfig),
  merge(commonConfig, maxConfig),
];
