/**
 * Created by Wangxy on 2017/6/15.
 */
'use strict'

let router = require('express').Router()

router.get('/', function (request, response, next) {
    let data = {}
    let user = request.cookies['user']
    if (user) {
        data.user = user
        response.render('index', data)
    } else {
        response.redirect('/login')
    }
})

router.route('/login')
    .get(function (request, response, next) {
        response.render('login')
    })
    .post(function(request, response, next) {
        let username = request.body.username
        let mobile = request.body.mobile
        console.log(mobile)
        // request.http().post('/login', {
        //     username: username,
        //     mobile: mobile
        // }).then(loginRes => {
        //     console.log(loginRes)
        //     response.cookie('user', JSON.stringify([username, mobile]))
        //     // response.json({ })
        //     response.json(loginRes.data)
        // }).catch(loginErr => {
        //     response.status(loginErr.response.status)
        //     response.json(loginErr.response.data)
        // })
        response.cookie('user', JSON.stringify([username, mobile]))
        response.json({})
    })

router.route('/m')
    .get(function (request, response, next) {
        response.render('mobile')
    })

module.exports = router