/**
 * 管理中心
 */
import Vue from "vue"
import VueRouter from "vue-router"
import ElementUI from "element-ui"
import http from "library/http"
import routes from "../page/admin/route"

import Layout from "../page/admin/layout.vue"
import TqEditor from "widget/editor.vue"

import "element-ui/lib/theme-default/index.css"
import "font-awesome/css/font-awesome.css"
import "quill/dist/quill.snow.css"
import "asset/style/admin.less"

//注入插件
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http = http

//注册组件
Vue.component("tq-editor", TqEditor)

//定义过滤器
Vue.filter("date-format", value => moment(value * 1000).format("YYYY-MM-DD HH:mm"))

//实例化Vue
const vm = new Vue({
    el: "#placeholder",
    router: new VueRouter({ routes }),
    template: "<layout/>",
    components: { Layout },
    watch: {
        "$route" (to, from) {
            // console.log(to.path)
            // console.log(from.path)
        }
    }
})
//console.log(config.api)