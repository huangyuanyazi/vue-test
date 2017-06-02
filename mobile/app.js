/**
 * mobile web服务
 * Created by john on 2017/4/11.
 */
let env = process.env.NODE_ENV || "production"

let express = require("express")
let path = require("path")
let config = require("config")
let moment = require("moment")
let http = require("http")

let mobileApp = express()

//托管public下的静态资源（无需通过路由）
mobileApp.use(express.static(path.resolve("mobile", "public")))

//启动web服务并监听8081端口
let mobileServer = http.createServer(mobileApp)
mobileServer.listen(config.get("server.mobile.port"), config.get("server.mobile.host"), function () {
    let host = mobileServer.address().address
    let port = mobileServer.address().port
    console.log("mobile服务(" + env + ")已启动，主机：" + host + "，端口：" + port + " [" + moment().format("YYYY-MM-DD HH:mm:ss") + "]")
})