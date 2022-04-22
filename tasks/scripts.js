const gulp = require("gulp");
const plumber = require("gulp-plumber");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

module.exports = function scripts() {
  return gulp
    .src("source/js/main.js")
    .pipe(plumber())
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "[name].min.js",
        },
        resolve: {
          fallback: {
            // path: false,
            // util: require.resolve("util/"),
            // stream: require.resolve("stream-browserify"),
            // buffer: require.resolve("buffer"),
            // process: require.resolve("process"),
          },
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
        devtool: "source-map",
        plugins: [
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Swiper: "swiper",
            // mammoth: "mammoth",
            // Buffer: ["buffer", "Buffer"],
            // process: "process",
          }), // jQuery (npm i jquery)
        ],
      })
    )
    .pipe(gulp.dest("build/js"));
};
