/**
 * site dev服务
 * Created by john on 2017/4/14.
 */
let express = require("express")
let devMiddleware = require("webpack-dev-middleware")
let webpack = require("webpack")
let config = require("config")
let moment = require("moment")
let http = require("http")

let siteDevApp = express()

let siteWebpackConfig = require("./site-webpack-config")
let siteCompiler = webpack(siteWebpackConfig)

siteDevApp.use(devMiddleware(siteCompiler, {
    stats: {
        colors: true
    }
}))

//启动site-dev服务并监听9096端口
let siteDevServer = http.createServer(siteDevApp)
siteDevServer.listen(config.get("build.siteDev.port"), config.get("build.siteDev.host"), function () {
    let host = siteDevServer.address().address
    let port = siteDevServer.address().port
    console.log("site-dev服务已启动，主机：" + host + "，端口：" + port + " [" + moment().format("YYYY-MM-DD HH:mm:ss") + "]")
})