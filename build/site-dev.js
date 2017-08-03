/**
 * site dev服务
 * Created by Wangxy on 2017/4/14.
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

let siteWebpackConfig = require('./site-webpack-config')
let siteCompiler = webpack(siteWebpackConfig)

let siteDevApp = express()

siteDevApp.use(devMiddleware(siteCompiler, {
    stats: {
        colors: true
    }
}))

let siteDevServer = http.createServer(siteDevApp)

siteDevServer.listen(buildConfig.build.development.port, function () {
    let host = siteDevServer.address().address
    let port = siteDevServer.address().port
    console.log('site-dev服务已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})

/*
let siteDev = {
    build: function () {
        console.log('开始构建site项目...')
        return devMiddleware(siteCompiler, {
            stats: {
                colors: true
            }
        })
    },
    render: function () {
        return function (request, response, next) {
            //重写render函数
            response.render = (view, locals) => {
                siteCompiler.outputFileSystem.readFile(path.join(siteCompiler.outputPath, 'view', view + '.html'), (err, result) => {
                    response.set('Content-Type', 'text/html')
                    if (err) {
                        response.send(err)
                    } else {
                        let html = template.render(result.toString(), locals, {root: path.resolve('site', 'view'), extname: '.html', imports: require('../site/library/template-filter') })
                        response.send(html)
                    }
                })
            }
            next()
        }
    }
}

module.exports = siteDev
*/