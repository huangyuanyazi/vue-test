/**
 * Created by henry on 2017/3/21 0021.
 */
"use strict";

const STATUS_DELETED = 0;
const STATUS_ACTIVE = 10;
const STATUS_INACTIVE = 11;

const TYPE_ADMIN = 1;
const TYPE_USER = 2;

module.exports.TYPE_ADMIN = TYPE_ADMIN;
module.exports.TYPE_USER = TYPE_USER;
module.exports.rules = {
	username: {
		required: {},
		string: {min: 5, max: 100},
		unique: {targetClass: 'UserCommon'},
		username: {forbiddenWords: ['淘权', 'taoquan']}
	},
	password: {
		required: {},
		string: {min: 6, max: 60},
		password: {},
		compare: {compareAttribute: 'pay_password', operator: '!=='}
	},
	pay_password: {
		string: {min: 6, max: 60},
		password: {},
	},
	email: {
		string: {min: 6, max: 255},
		email: {},
		unique: {targetClass: 'UserCommon'}
	},
	mobile: {
		string: {min: 11, max: 20},
		mobile: {},
		unique: {targetClass: 'UserCommon'}
	},
	status: {
		in: {range: [STATUS_ACTIVE, STATUS_DELETED, STATUS_INACTIVE]}
	}
};