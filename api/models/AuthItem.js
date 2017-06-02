/**
 * Created by henry on 2017/3/22 0022.
 */
"use strict";

const TYPE_RESOURCE = 1;
const TYPE_ADMIN_MENU = 2;
const TYPE_STORE_MENU = 3;

module.exports.TYPE_RESOURCE = TYPE_RESOURCE;
module.exports.TYPE_ADMIN_MENU = TYPE_ADMIN_MENU;
module.exports.TYPE_STORE_MENU = TYPE_STORE_MENU;

module.exports.rules =  {
	name: {
		required: {},
		string: {max: 64}
	},
	type: {
		integer: {min: 0},
		in: {range: [TYPE_RESOURCE,TYPE_ADMIN_MENU,TYPE_STORE_MENU]}
	},
	parent_id: {
		integer: {min: 0},
		exist: {targetClass: 'AuthItem', targetAttribute: 'id'}
	},
	description: {
		string: {max: 64}
	},
	rule: {
		string: {max: 64}
	},
};