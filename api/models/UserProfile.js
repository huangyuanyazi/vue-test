/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

module.exports.rules =  {
	user_id: {
		required: {},
		integer: {min: 0},
		exist: {targetClass: 'User', targetAttribute: 'id'}
	},
	nickname: {
		string: {min: 2, max: 50},
	},
	real_name: {
		string: {min: 2, max: 50},
	},
	points: {
		integer: {min: 0},
	},
	frozen_points: {
		integer: {min: 0},
	},
	balance: {
		float: {min: 0.0}
	},
	frozen_balance: {
		float: {min: 0.0}
	},
	gender: {
		string: {length: 1},
		in: {range: ['M', 'F']}
	},
	birthday: {
		date: {format: 'yyyy-MM-dd'}
	},
	avatar: {
		string: {min: 2, max: 255},
	},
	qq: {
		string: {min: 5, max: 20},
	},
	register_ip: {
		integer: {min: 0},
	},
	logged_in_ip: {
		integer: {min: 0},
	},
	logged_in_at: {
		integer: {min: 0},
	}
};