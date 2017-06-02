/**
 * mock服务
 */
let jsonServer = require("json-server")
//let express = require("express")
let path = require("path")
let glob = require("glob")
let config = require("config")
let moment = require("moment")
let http = require("http")

let mockApp = jsonServer.create()
//let app = express()
//app.set("json spaces", 2)

mockApp.use(jsonServer.defaults())

//定义db.json以外的其他路由，优先级高于db.json
let routeRoot = path.resolve("mock", "route")
glob.sync(routeRoot + "/**/").map(function (folder) {
    let routePath = folder.substring(routeRoot.length)
    glob.sync(folder + "*.js").map(function (file) {
        mockApp.use(routePath, require(file))
    })
})

mockApp.use(jsonServer.router(path.join(__dirname, "db.json")))

//启动mock服务并监听9093端口
let mockServer = http.createServer(mockApp)
mockServer.listen(config.get("server.mock.port"), config.get("server.mock.host"), function () {
    let host = mockServer.address().address
    let port = mockServer.address().port
    console.log("mock服务已启动，主机：" + host + "，端口：" + port + " [" + moment().format("YYYY-MM-DD HH:mm:ss") + "]")
})