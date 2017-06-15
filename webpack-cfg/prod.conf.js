// dev开发基础模式
'use strict'
const path = require('path');
// 配置是否md5版本化
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, '..', 'assets'),
        filename: '[name].js',
        library:'openApp',
        libraryTarget:'umd'
    }
};
