const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const isDev = process.env.ELEVENTY_ENV === "development";

const baseFilename = isDev ? "main" : "main.[contenthash]";

module.exports = {
  entry: [
    path.resolve(__dirname, "src", "js", "main.js"),
    path.resolve(__dirname, "src", "css", "main.scss"),
  ],
  output: {
    path: path.resolve(__dirname, "public", "assets"),
    filename: `${baseFilename}.js`,
  },

  optimization: {
    minimize: !isDev,
    minimizer: [new TerserPlugin({ parallel: true })],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: "style-loader",
          },
          {
            // translates CSS into CommonJS modules
            loader: "css-loader",
          },
          {
            // Run postcss actions
            loader: "postcss-loader",
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: () => {
                  [require("autoprefixer")];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },

  plugins: [
    new WebpackManifestPlugin({ publicPath: "/assets/" }),
    new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
  ],
};
