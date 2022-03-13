/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function increaseVersion() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  let packageJson = fs.readFileSync(packageJsonPath);
  packageJson = JSON.parse(packageJson);
  let version = packageJson.version;
  const versionArr = version.split('.');
  versionArr[versionArr.length - 1] = +versionArr[versionArr.length - 1] + 1;
  packageJson.version = versionArr.join('.');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  // 修改 manifest
  const manifestPath = path.join(__dirname, '../template/manifest.json');
  let manifestJson = fs.readFileSync(manifestPath);
  manifestJson = JSON.parse(manifestJson);
  manifestJson.version = packageJson.version;
  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2));
}

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), increaseVersion],
});
