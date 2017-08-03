import PatentIndex from '../page/patent/index.vue'
import PatentDetail from '../page/patent/detail.vue'
import PatentSearch from '../page/patent/search.vue'
import TrademarkIndex from '../page/trademark/index.vue'
import TrademarkDetail from '../page/trademark/detail.vue'
import TrademarkSearch from '../page/trademark/search.vue'
// import Vue from "vue/dist/vue.js"
// import VueRouter from 'vue-router'
// Vue.use(VueRouter);
const routes = [
    {
        path: "/patent/",
        component: PatentIndex,
    },
    {
        path: "/patent/detail/",
        component: PatentDetail,
    },
    {
        path: "/patent/search/",
        component: PatentSearch
    },
    {
        path: "/trademark/",
        component: TrademarkIndex,
    },
    {
        path: "/trademark/detail",
        component: TrademarkDetail,
    },
    {
        path: "/trademark/search",
        component: TrademarkSearch,
    },
]
export default routes;