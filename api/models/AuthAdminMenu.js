/**
 * Created by henry on 2017/3/22 0022.
 */
"use strict";

const path = require('path');
let parent = path.resolve(__dirname, 'AuthItem.js');
delete require.cache[__filename];
const authItem = require('./AuthItem');

authItem.rules.type = {
	integer: {min: 0},
	compare: {compareValue: authItem.TYPE_ADMIN_MENU}
};
authItem.rules.name.unique = {targetClass: 'AuthAdminMenu'};
authItem.rules.parent_id.exist = {targetClass: 'AuthAdminMenu', targetAttribute: 'id'}
module.exports = authItem;