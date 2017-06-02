/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

module.exports.rules =  {
	auth_role_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'AuthRole', targetAttribute: 'id'}
	},
	user_id: {
		required: {},
		integer: {min: 0},
		exist: {targetClass: 'UserCommon', targetAttribute: 'id'}
	},
	'auth_role_id, user_id': {
		unique: {}
	}
};