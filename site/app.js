/**
 * site web服务
 */
let env = process.env.NODE_ENV || "production"

let express = require("express")
let template = require("art-template")
let path = require("path")
let glob = require("glob")
let config = require("config")
let moment = require("moment")
let http = require("http")

let siteApp = express()

//载入资源清单（asset变量可在模板中直接引用）
siteApp.locals.asset = require(path.resolve("site", "public", "manifest.json"))

//托管public下的静态资源（无需通过路由）
siteApp.use(express.static(path.resolve("site", "public")))

//采用artTemplate模板引擎
siteApp.engine("html", template.__express)
siteApp.set("view engine", "html")

//设置模板文件根路径
siteApp.set("views", path.resolve("site", "view"))

//自动加载route目录下的所有路由文件
let routeRoot = path.resolve("site", "route")
glob.sync(routeRoot + "/**/").map(function (folder) {
    let routePath = folder.substring(routeRoot.length)
    glob.sync(folder + "*.js").map(function (file) {
        siteApp.use(routePath, require(file))
    })
})

//启动web服务并监听8080端口
let siteServer = http.createServer(siteApp)
siteServer.listen(config.get("server.site.port"), config.get("server.site.host"), function () {
    let host = siteServer.address().address
    let port = siteServer.address().port
    console.log("site服务(" + env + ")已启动，主机：" + host + "，端口：" + port + " [" + moment().format("YYYY-MM-DD HH:mm:ss") + "]")
})