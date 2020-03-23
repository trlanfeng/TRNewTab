const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    newtab: "./src/newtab.js",
    background: "./src/background.js",
    popup: "./src/popup.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/i,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.(svg)/i,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "新标签页",
      filename: "newtab.html",
      chunks: ["newtab"],
      template: "./template/template.html"
    }),
    new HtmlWebpackPlugin({
      title: "新标签页",
      filename: "popup.html",
      chunks: ["popup"],
      template: "./template/template.html"
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: "template",
        to: "",
        ignore: [".DS_Store", "template.html"]
      }
    ])
  ]
};
