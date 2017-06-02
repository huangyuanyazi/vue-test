/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

module.exports.rules =  {
	auth_menu_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'AuthItem', targetAttribute: 'id'}
	},
	auth_resource_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'AuthResource', targetAttribute: 'id'}
	},
	'auth_menu_id, auth_resource_id': {
		unique: {}
	}
};