'use strict';

const merge = require('webpack-merge');
//入口文件扫描结果
const entryConf = require('./webpack-cfg/entry.conf.js');
// webpack 相关配置文件
// 基础配置
const baseConf = require('./webpack-cfg/base.conf.js');
// 开发环境配置
const devConf = require('./webpack-cfg/dev.conf.js');
const prodConf = require('./webpack-cfg/prod.conf.js');
// common config
const commonConf = require('./webpack-cfg/common.conf.js');
module.exports = (env) => {
    // 根据 env判断当前的环境，之后进行 选择具体的配置文件进行编译
    let webpackConfig;
    let runMode = env['NODE_ENV'];
    let baseMerge = merge.strategy(baseConf);

    if (runMode === 'test') {
        return baseMerge(commonConf, entryConf, devConf);
    } else if (runMode === 'prod') {
        return baseMerge(commonConf, entryConf, prodConf);
    }

}
