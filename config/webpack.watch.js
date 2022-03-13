/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
