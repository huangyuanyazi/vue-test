/**
 * 商品详情
 */
"use strict"
var router = require("express").Router()

router.get("/item", function(request, response, next) {
    let data = []
    response.render("item/index", data)
})

router.get("/item/:id", function(request, response, next) {
    let data = {}
    data.item = {
        name: "这是一个专利商品",
        price: 1650.2
    }
    response.render("item/detail", data)
})

module.exports = router