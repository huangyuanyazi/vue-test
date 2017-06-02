/**
 * Created by henry on 2017/3/21 0021.
 */
"use strict";

module.exports.rules =  {
	auth_item_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'AuthItem', targetAttribute: 'id'}
	},
	user_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'User', targetAttribute: 'id'}
	},
	'auth_item_id, user_id': {
		unique: {message: '权限ID和用户ID的组合已被占用'}
	}
};