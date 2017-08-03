/**
 * Created by Wangxy on 2017/6/15.
 */
'use strict'

let router = require('express').Router()

router.get('/', function(request, response, next) {
    let loginUser = request.session.loginUser
    if (loginUser) {
        let userMenus = loginUser.menus ? loginUser.menus : []
        request.http().get('/menus/flat').then(menusRes => {
            let Menu = require('../library/menu')
            let menu = new Menu(menusRes.data)
            let data = {
                menus: JSON.stringify(menu.getUserTree(userMenus)),
                crumbs: JSON.stringify(menu.getUserCrumbs(userMenus)),
                user: JSON.stringify({
                    username: loginUser.username,
                    real_name: loginUser.real_name
                })
            }
            response.render('index', data)
        }).catch(menusErr => {
            response.json('系统错误')
            //response.status(menusErr.response.status)
            //response.json(menusErr.response.data)
        })
    } else {
        response.redirect('/login')
    }
})

router.route('/login')
    .get(function(request, response, next) {
        // TODO 当cookie中access-token有效时，调用登录api，获取不到用户的menu数据
        if (request.cookies['access-token']) {
            let hostname = request.hostname
            let domain = hostname.substring(hostname.indexOf('.'))
            response.clearCookie('access-token', { domain })
        }
        if (request.session.loginUser) {
            request.session.loginUser = null
        }
        response.render('login')
    })
    .post(function(request, response, next) {
        let identity = request.body.identity
        let password = request.body.password
        request.http().post('/login', {
            identity: identity,
            password: password
        }).then(loginRes => {
            request.session.loginUser = loginRes.data
            response.json(loginRes.data)
        }).catch(loginErr => {
            response.status(loginErr.response.status)
            response.json(loginErr.response.data)
        })
    })

router.get('/logout', function(request, response, next) {
    request.http().post('/logout').then(logoutRes => {
        response.redirect('/login')
    }).catch(logoutErr => {
        response.status(logoutErr.response.status)
        response.json(logoutErr.response.data)
    })
})

module.exports = router