/**
 * 管理员登录
 */
import Vue from "vue"
import ElementUI from "element-ui"
import http from "library/http"

import "element-ui/lib/theme-default/index.css"
import "font-awesome/css/font-awesome.css"
import "asset/style/admin-login.less"

Vue.use(ElementUI)
Vue.prototype.$http = http

const vm = new Vue({
    el: "#app"

})