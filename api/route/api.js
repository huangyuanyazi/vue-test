/**
 * Created by henry on 2017/3/17 0017.
 */
"use strict";
const router = require("express").Router();
const helper = require('../libs/helper');
const proxy = require('../libs/proxy');
const api = require('../controller/api');

router.all('/:version/:model', (req, res, next) => {
	api(req, res);
});

router.all('/:version/:model/*', (req, res, next) => {
	api(req, res);
});

module.exports = router;