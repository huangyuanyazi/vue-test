/**
 * Created by henry on 2017/6/28 0028.
 */
"use strict";

module.exports.rules =  {
	receiver: {
		required: {},
		mobile: {}
	},
	is_sent: {
		enum: {range: [0,1]}
	},
	sent_at: {
		integer: {min: 0, max: 2147483647},
	},
	error_msg: {
		string: {min: 1, max: 100},
	},
	param: {
		required: {},
		json: {
			pattern: {
				name: {rules: {string:{}}},
				patent: {rules: {string:{}}},
				status: {rules: {string:{}}}
			}
		}
	}
};