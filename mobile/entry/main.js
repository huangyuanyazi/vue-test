/**
 * Created by john on 2017/4/11.
 */
import "framework7"

import "framework7/dist/css/framework7.ios.css"
import "framework7/dist/css/framework7.ios.colors.css"
import "font-awesome/css/font-awesome.css"
import Vue from "vue/dist/vue.js"
import Framework7Vue from "framework7-vue/dist/framework7-vue.js"
import App from "../view/app.vue"
import Routes from "../view/routes.js"
window.$$ = Dom7
import iphoneToDetail from '../view/iphoneToDetail'
// let actionExecutor = null

Vue.use(Framework7Vue)
Vue.filter('showFilter', function (value, shop, attr) {
    if (!value) {
        return '无'
    }
    switch (shop) {
        case 'patent':
            switch (attr) {
                case 'type':
                    return value == 0 ? '发明' : (value == 1 ? '实用新型' : '外观设计')
                    break;
                case 'status':
                    return value == 0 ? '授权未缴费' : '已下证'
                    break;
                default:
                    break
            }
            break;
        case 'trademark':
            return value == 0 ? '文字商标' : '图形商标'
            break;
        default:
            break
    }

})
new Vue({
    el: '#app',
    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        // material: true,
        // routes: Routes,
        pushState: true,
        pushStateSeparator: "#page",
        dynamicNavbar: true,
        routes: Routes,
    },
    // Register App Component
    //
    mounted(){
        iphoneToDetail()
    },
    components: {
        app: App
    },
    methods: {
        // onF7Init: function () {
        //     console.log('f7-init');
        // }
        // preroute: function (view, options) {
        //     let pageUrl = "/"
        //     if(options.url) {
        //         pageUrl = -1 == options.url.indexOf("?") ? options.url : options.url.substring(0, options.url.indexOf("?"))
        //     }
        //     actionExecutor = actions[pageUrl] ? actions[pageUrl] : null
        // },
        // onPageInit: function(app, page) {
        //     if(actionExecutor) {
        //         actionExecutor(function (result) {
        //             if(result.default.pageInit) {
        //                 result.default.pageInit.call(this, app, page)
        //             }
        //         })
        //     }
        // },
        // onPageBeforeAnimation: function(app, page) {
        //     app.showIndicator()
        // },
        // onPageAfterAnimation: function(app, page) {
        //     app.hideIndicator()
        // }
    }
});


// let myApp = new Framework7({
//
// })
//
// let mainView = myApp.addView(".view-main", {
//     dynamicNavbar: true
// })
//
// $$("#tab_patent").on("show", function () {
//     mainView.router.loadPage("page/patent/index.vue")
// })
//
// $$("#tab_trademark").on("show", function () {
//     mainView.router.loadPage("page/trademark/index.vue")
// })
//mainView.hideNavbar()
// let indexPageTemplate = Template7.compile(Dom7("#indexPageTemplate").html())
// $$("#indexPageContent").html(indexPageTemplate({title: "正在加载，请稍等..."}))

// $$(document).on("ajaxStart", function (e) {
//     let xhr = e.detail.xhr
//     xhr.setRequestHeader("access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.6J99RlP_tFsyMwdhqPjgTii3TsF27u77Ui-Z3N5ZQTI")
// })

//setTimeout(mainView.router.loadPage, 1000, "page/patent/index.vue")

