/**
 * Created by henry on 2017/3/28 0028.
 */
"use strict";

const helper = require('../libs/helper');

module.exports.rules =  {
	identity: {
		required: {},
		string: {min: 5, max: 255},
	},
	password: {
		required: {},
		string: {min: 6, max: 60},
	},
};

module.exports.beforeProxy = (req, res) => {
	return helper.reject(req, res);
};