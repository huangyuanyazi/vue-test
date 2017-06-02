/**
 * Created by henry on 2017/3/13 0013.
 */
"use strict";

const app = require("express")();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const process = require('process');

const helper = require('./libs/helper');
const validation = require("./libs/validation");
const config = helper.config;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(require('./route/api'));

process.on('unhandledRejection', function (err) {
	console.error('Unhandled Rejection: ', err);
});

process.on(`uncaughtException`, function (err) {
	console.error('Unhandled Exception: ', err);
});

app.listen(config.port, function() {
    console.log('> API server started at '+config.port);
});