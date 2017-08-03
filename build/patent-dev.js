/**
 * Created by Wangxy on 2017/6/15.
 */
let express = require('express')
let http = require('http')
let devMiddleware = require('webpack-dev-middleware')
let webpack = require('webpack')
let path = require('path')
let template = require('art-template')
let moment = require('moment')

const Config = require('../libs/config')
let buildConfig = Config.get('build')

let patentWebpackConfig = require('./patent-webpack-config')
let patentCompiler = webpack(patentWebpackConfig)

let patentDevApp = express()

patentDevApp.use(devMiddleware(patentCompiler, {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    stats: {
        colors: true
    }
}))

let patentDevServer = http.createServer(patentDevApp)

patentDevServer.listen(buildConfig.build.development.port, function () {
    let host = patentDevServer.address().address
    let port = patentDevServer.address().port
    console.log('patent-dev服务已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})

/*
let patentDev = {
    build: function () {
        console.log('开始构建patent项目...')
        return devMiddleware(patentCompiler, {
            stats: {
                colors: true
            }
        })
    },
    render: function () {
        return function (request, response, next) {
            //重写render函数
            response.render = (view, locals) => {
                patentCompiler.outputFileSystem.readFile(path.join(patentCompiler.outputPath, 'view', view + '.html'), (err, result) => {
                    response.set('Content-Type', 'text/html')
                    if (err) {
                        response.send(err)
                    } else {
                        let html = template.render(result.toString(), locals, { extname: '.html' })
                        response.send(html)
                    }
                })
            }
            next()
        }
    }
}

module.exports = patentDev
*/