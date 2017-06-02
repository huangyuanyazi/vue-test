/**
 * 管理中心
 */
"use strict"
var router = require("express").Router()

router.get("/admin", function(request, response, next) {

    response.render("admin/index")
})

router.route("/admin/login")
    .get(function(request, response, next) {
        response.render("admin/login")
    })
    .post(function(request, response, next) {
        response.redirect("/admin")
    })

router.get("/admin/logout", function(request, response, next) {

    response.redirect("/admin/login")
})

module.exports = router