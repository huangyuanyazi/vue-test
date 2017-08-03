/**
 * mobile dev服务
 * Created by Wangxy on 2017/4/10.
 */
let express = require('express')
let http = require('http')
let devMiddleware = require('webpack-dev-middleware')
let webpack = require('webpack')
let moment = require('moment')

const Config = require('../libs/config')
let buildConfig = Config.get('build')

let mobileWebpackConfig = require('./mobile-webpack-config')
let mobileCompiler = webpack(mobileWebpackConfig)

let mobileDevApp = express()

mobileDevApp.use(devMiddleware(mobileCompiler, {
    stats: {
        colors: true
    }
}))

let mobileDevServer = http.createServer(mobileDevApp)

mobileDevServer.listen(buildConfig.build.development.port, function () {
    let host = mobileDevServer.address().address
    let port = mobileDevServer.address().port
    console.log('site-dev服务已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})

/*
let mobileDev = {
    build: function () {
        console.log('开始构建mobile项目...')
        return devMiddleware(mobileCompiler, {
            stats: {
                colors: true
            }
        })
    }
}

module.exports = mobileDev
*/