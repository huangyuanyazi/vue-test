/**
 * Created by henry on 2017/3/16 0016.
 */
"use strict";

const _ = require('underscore');
const pluralize = require('pluralize');
const jwt = require('jsonwebtoken');
const url = require('url');
const uaPaser = require('ua-parser-js');
const config = require('../config/main');
const localConfig = require('../config/main-local');
const validation = require("../libs/validation");

let helper = class {
	/**
	 * 深度合并
	 * @param dst   目标对象
	 * @param src   追加对象
	 * @returns {*} 合并后的对象
	 */
	static deepExtend(dst, src) {
		_.each(src, function (v, k) {
			if(_.isObject(v) && !_.isArray(v)) {
				dst[k] = helper.deepExtend(dst[k], v);
			} else {
				dst[k] = src[k];
			}
		});
		return dst;
	};

	/**
	 * 深度拷贝
	 * @param src   源对象
	 * @return 拷贝对象
	 */
	static deepClone(src) {
		return JSON.parse(JSON.stringify(src))
	};
	static _getYiiRule(fields, type, opt, namespace) {
		let rule = {0: fields, 1: type};
		if(opt.targetClass && opt.targetClass.indexOf(namespace) !== 0) {
			opt.targetClass = namespace + opt.targetClass;
		}
		if(type === 'match') {
			opt.pattern = String(opt.pattern);
		}

		return _.extend(rule, opt);
	};
	static getYiiRules(modelRules) {
		//console.log(modelRules);
		let yiiRules = [];
		let modelNamespace = 'common\\models\\';
		_.each(modelRules, (fieldRules, field) => {
			// 逗号分隔的表示多个字段的组合
			let fields = Array(field);
			if (field.indexOf(',') > 0) {
				fields = _.map(field.split(','), str=>{return str.trim()});
			}
			_.each(fieldRules, (opt, type) => {
				// 同一个验证器使用多次，见RegisterEmail.password.compare
				if(_.isArray(opt)) {
					_.each(opt, option => {
						yiiRules.push(this._getYiiRule(fields, type, option, modelNamespace));
					})
				} else {
					yiiRules.push(this._getYiiRule(fields, type, opt, modelNamespace));
				}
			});
		});
		return yiiRules;
	};
	static getModelName(route) {
		let singular = pluralize.singular(route);
		return _.map(singular.split('-'), (str) => {
			return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
		}).join('');
	};
	static getRootDomain(hostname) {
		let arr = hostname.split('.');
		arr[0] = '';
		return arr.join('.');
	};
	static getUaVersions(req){
		let u = req.headers['user-agent'];
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') === -1, //是否web应用程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信
			qq: u.match(/\sQQ/i) === " qq", //是否QQ,
			iosApp: !!u.match(/Cordova\n iOS/),
			androidApp: !!u.match(/Cordova\n Android/)
		};
	};
	static getUaType(req) {
		let ver = this.getUaVersions(req);
		if(ver.mobile || ver.ios || ver.android ||
			ver.iPhone || ver.iPad || ver.weixin)
			return 'wap';
		else if(ver.iosApp || ver.androidApp) return 'app';
		else return 'auth';
	};
	static sequenceTasks(tasks) {
		function recordValue(results, value) {
			results.push(value);
			return results;
		}
		let pushValue = recordValue.bind(null, []);
		return tasks.reduce(function (promise, task) {
			return promise.then(task).then(pushValue);
		}, Promise.resolve());
	};
	static reject(req, res) {
		if(!this.config.debug && req.ip !== '127.0.0.1' && req.ip !== 'localhost') {
			res.status(401).json('内部接口').end();
		}
		return res;
	}
};
helper.config = helper.deepExtend(config, localConfig);

module.exports = helper;