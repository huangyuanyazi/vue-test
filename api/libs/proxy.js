/**
 * Created by henry on 2017/3/30 0030.
 */
"use strict";

const url = require('url');
const axios = require('axios');
const qs = require('qs');
const _ = require('underscore');
const helper = require('./helper');

let proxy = class {
	static request(req, res) {
		return new Promise((resolve, reject) => {
			return axios({
				method: req.method,
				url: helper.config.backend + req.path,
				data: qs.stringify(req.body),
				headers: req.headers,
				params: req.query
			}).then(response => {
				//console.log(response);
				resolve(response);
			}).catch(err => {
				reject(err);
			});
		});
	};
};

module.exports = proxy;