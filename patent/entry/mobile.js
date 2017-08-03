/**
 * 移动端入口js
 * Created by Wangxy on 2017/6/23.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.css'
import '../asset/style/mobile.less'
import axios from 'axios'
import routes from '../page/mobile/route.js'
import Layout from '../page/mobile/layout.vue'
Vue.prototype.$ajax = axios
Vue.use(VueRouter)
let router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

let app = new Vue({
    router,
    el: "#app",
    template: '<layout/>',
    components: {
        Layout
    }

})