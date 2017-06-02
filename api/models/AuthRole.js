/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

const TYPE_ADMIN = 1;
const TYPE_STORE = 2;

module.exports.rules =  {
	name: {
		required: {},
		string: {max: 64},
	},
	type: {
		required: {},
		integer: {min: 1},
		in: {range: [TYPE_ADMIN,TYPE_STORE]}
	},
	description: {
		string: {max: 128},
	},
	auth_item_ids: {
		json: {type: 'array'}
	},
	'name, type': {
		unique: {}
	}
};