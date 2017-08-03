/**
 * 移动端单页应用路由
 * Created by Wangxy on 2017/6/23.
 */
// import Layout from './layout.vue'
import Login from './login.vue'
import PatentIndex from './patent-index.vue'
import PatentDetail from './patent-detail.vue'
const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/patent-index/:username', component: PatentIndex},
    {path: '/patent-detail/:id', component: PatentDetail}
];
export default routes;