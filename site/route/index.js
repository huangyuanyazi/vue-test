/**
 * 网站首页
 */
"use strict"
var router = require("express").Router()

router.get("/", function(request, response, next) {
    let data = {}
    data.title = "欢迎访问淘权网"
    data.page = "index"
    response.render("index/index", data)
})

module.exports = router