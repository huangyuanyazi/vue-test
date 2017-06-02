/**
 * Created by henry on 2017/3/13 0013.
 */
"use strict";

const path = require('path');
let parent = path.resolve(__dirname, 'UserCommon.js');
delete require.cache[__filename];
let userCommon = require('./UserCommon');

userCommon.rules.username.unique = {targetClass: 'Admin'}
userCommon.rules.email.unique = {targetClass: 'Admin'}
userCommon.rules.mobile.unique = {targetClass: 'Admin'}
module.exports.rules = userCommon.rules;