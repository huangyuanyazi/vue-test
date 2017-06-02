/**
 * Created by henry on 2017/3/23 0023.
 */
"use strict";

const path = require('path');
let parent = path.resolve(__dirname, 'AuthItem.js');
delete require.cache[__filename];
const authItem = require('./AuthItem');

authItem.rules.type = {
	integer: {min: 0},
	compare: {compareValue: authItem.TYPE_RESOURCE}
};
authItem.rules.name.unique = {targetClass: 'AuthResource'};
authItem.rules.parent_id.exist = {targetClass: 'AuthResource', targetAttribute: 'id'}
module.exports = authItem;