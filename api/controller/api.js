/**
 * Created by henry on 2017/3/17 0017.
 */
"use strict";
const _ = require('underscore');
const co = require('co');
const url = require('url');
const axios = require('axios');
const helper = require('../libs/helper');
const validation = require("../libs/validation");
const validator = require("../libs/validator");
const proxy = require('../libs/proxy');

module.exports = async (req, res, action) => {
	console.log('-----------------------------------------------------------------------------');
	console.log(req.method, req.query, req.body, req.params);

	if(!_.contains(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'], req.method)) {
		return res.status(405).json('不支持的HTTP方法');
	}

	const version = req.params.version;
	let modelName = helper.getModelName(req.params.model);
	let model;

	try {
		model = require('../models/'+ modelName);
	} catch (err) {
		console.error(err);
		res.status(404).json('请求的资源不存在');
		return;
	}

	if(!_.isFunction(model.beforeProxy)) model.beforeProxy = (req, res) => {
		return res;
	};
	if(!_.isFunction(model.afterProxy)) model.afterProxy = (req, res) => {
		return res;
	};

	try {
		// 前处理
		res = await model.beforeProxy(req, res);
		if (res.finished) return;

		// 导出数据验证规则
		if (!model.through && _.contains(['PUT', 'POST', 'PATCH'], req.method)) {
			req.headers['_rule_'] = encodeURI(JSON.stringify(helper.getYiiRules(model.rules)));
			console.log('model: ', modelName);
			console.log(model.rules);
		}

		// 代理请求后端
		let proxyRes = await proxy.request(req, res);
		res.locals.data = proxyRes.data;

		// 后处理
		res = await model.afterProxy(req, res);
		if (res.finished) return;

		res.set(proxyRes.headers);
		res.status(proxyRes.status);
		res.send(proxyRes.data);
	} catch (err) {
		console.error(err);
		if(err.response) {
			res
				.status(err.response.status)
				.json(err.response.data)
				.end();
		} else {
			res
				.status(500)
				.json(err.message)
				.end();
		}
	}
};