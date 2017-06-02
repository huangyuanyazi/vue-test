/**
 * mobile dev服务
 * Created by john on 2017/4/10.
 */
let express = require("express")
let devMiddleware = require("webpack-dev-middleware")
let webpack = require("webpack")
let config = require("config")
let moment = require("moment")
let http = require("http")

let mobileDevApp = express()

let mobileWebpackConfig = require("./mobile-webpack-config")
let mobileCompiler = webpack(mobileWebpackConfig)

mobileDevApp.use(devMiddleware(mobileCompiler, {
    stats: {
        colors: true
    }
}))

//启动mobile-dev服务并监听9097端口
let mobileDevServer = http.createServer(mobileDevApp)
mobileDevServer.listen(config.get("build.mobileDev.port"), config.get("build.mobileDev.host"), function () {
    let host = mobileDevServer.address().address
    let port = mobileDevServer.address().port
    console.log("mobile-dev服务已启动，主机：" + host + "，端口：" + port + " [" + moment().format("YYYY-MM-DD HH:mm:ss") + "]")
})
