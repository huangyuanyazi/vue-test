/**
 * 用户中心
 */
"use strict"
var router = require("express").Router()

router.get("/user", function(request, response, next) {
    response.render("user/index")
})

router.post("/user/login", function(request, response, next) {
    response.redirect("/user")
})

router.get("/user/logout", function(request, response, next) {
    response.redirect("/user")
})

module.exports = router