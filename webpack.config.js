'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        newtab: './src/newtab.js',
        popup: './src/popup.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: "vue-style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'newtab.html',
            filename: 'newtab.html',
            chunks: ['newtab']
        }),
        new HtmlWebpackPlugin({
            template: 'popup.html',
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}