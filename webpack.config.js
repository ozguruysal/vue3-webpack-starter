const webpack = require("webpack");
const { resolve } = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackBar = require("webpackbar");

const publicPath = resolve(__dirname, "./public");
const outputPath = resolve(__dirname, "./dist");

const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";

const config = {
  mode: !isProd ? "development" : "production",

  entry: resolve(__dirname, "./src/main.ts"),

  output: {
    path: outputPath,
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].js",
  },

  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
    },
  },

  devtool: isProd ? false : "eval-cheap-source-map",

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|vue)$/,
        loader: "eslint-loader",
        options: {
          failOnError: true,
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new VueLoaderPlugin(),

    new CopyWebpackPlugin({
      patterns: [{ from: publicPath, to: outputPath }],
    }),

    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/index.html"),
      hash: true,
    }),

    new WebpackBar({ color: "#04a59d" }),

    ...(isProd
      ? []
      : [
          new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
              messages: [
                "Your application is running here http://localhost:8080",
              ],
            },
          }),
        ]),
  ],

  devServer: {
    port: 8080,
    historyApiFallback: true,
    overlay: true,
    static: {
      directory: resolve(__dirname, "dist"),
    },
  },

  stats: isProd ? "normal" : "errors-warnings",
};

function buildCssConfig() {
  if (isProd) {
    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
    );
  } else {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { importLoaders: 1 },
        },
        {
          loader: "postcss-loader",
          options: { sourceMap: true },
        },
      ],
    });
  }
}

buildCssConfig();

module.exports = config;
