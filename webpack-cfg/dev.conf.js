// dev开发基础模式
'use strict'
const path = require('path');
const config = require('../config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractTextPlugin = new ExtractTextPlugin('css/[name].css');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, '..', 'test'),
        filename: '[name].js',
        library:'openApp',
        libraryTarget:'umd'
    }
};
