/**
 * Created by henry on 2017/3/14 0014.
 */
"use strict";

const _ = require('underscore');
const validator = require('./validator');

module.exports = class {
	/**
	 *
	 * @param modelName     string      要验证的模型名称
	 * @param data      object      要验证的模型数据
	 * @param backend   string      后端验证接口地址
	 *                  为空则从配置文件中加载，用于api接口服务；
	 *                  对于前端需要指定，如https://api.taoquanw.com/v1/validation
	 */
	constructor(modelName, data=null, backend=null) {
		this.modelName = modelName;
		this.model = require('../models/'+ modelName);;
		this.data = data;

		let config = require('./helper').config;
		if(backend) validator.backend = backend;
		else validator.backend = config.backend + config.validationPath;
	};

	/**
	 *
	 * @param field string  字段名
	 * @param label string 字段描述
	 * @param optMsg object {integer: {min: message, max: message}, ...}
	 * @returns Promise 验证成功返回true，失败返回描述
	 */
	validateField(field, label='', optMsg={}) {
		// 先判断不需要remote的，以加快响应
		let promises = [];
		let errors = [];
		_.each(this.model.rules[field], (option, rule) => {
			let value = this.data[field];
			let ruleOptMsg = optMsg[rule] || {};
			let result = validator[rule](this, field, value, option, label, ruleOptMsg);
			if (result instanceof Promise) {
				// 需要远程判断
				promises.push(result);
			} else if (!validator.isEmpty(result)) {
				errors = errors.concat(result);
			}
		});
		if(!_.isEmpty(errors)) return Promise.resolve(errors);
		return Promise.all(promises);
	};
};