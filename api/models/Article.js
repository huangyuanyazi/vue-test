/**
 * Created by henry on 2017/3/15 0015.
 */
"use strict";

module.exports.rules = {
	article_category_id: {
		required: {},
		integer: {min: 1},
		exist: {targetClass: 'ArticleCategory', targetAttribute: 'id'}
	},
	title: {
		required: {},
		string: {max: 100},
	},
	keywords: {
		required: {},
		string: {max: 100},
		json: {type: 'array'}
	},
	content: {
		required: {}
	},
	hits: {
		integer: {min: 0},
	},
	order: {
		integer: {min: 0},
	},
	created_by: {
		integer: {min: 0},
		exist: {targetClass: 'Admin', targetAttribute: 'id'}
	},
	updated_by: {
		integer: {min: 0},
		exist: {targetClass: 'Admin', targetAttribute: 'id'}
	},
	created_at: {
		integer: {min: 0},
	},
	updated_at: {
		integer: {min: 0},
	},
	source: {
		string: {max: 100},
		url: {}
	},
};