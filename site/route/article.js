/**
 * 文章资讯
 */
"use strict"

var router = require("express").Router()

router.get("/article", function(request, response, next) {
    let data = {}
    response.render("article/index", data)
})

router.get("/article/:id", function(request, response, next) {
    let data = {
        title: "文章标题"
    }
    response.render("article/detail", data)
})

module.exports = router

/*
let actions = {}

//文章首页
actions["GET/"] = response => {
    let data = {}

    response.render("article/index", data)
}

//文章详情
actions["GET/:id"] = function(response) {
    let id = this.params
    console.log(id)
    let data = {
        id: id,
        title: "文章标题"
    }
    response.render("article/detail", data)
}

//发布评论
actions["POST/comment"] = response => {

}

module.exports = actions
*/