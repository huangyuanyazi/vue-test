/**
 * Created by john on 2017/4/11.
 */
export default [
    {path: "/item/index", component: resolve => require(["./item/index.vue"], resolve)},
    {path: "/item/edit", component: resolve => require(["./item/edit.vue"], resolve)},
    {path: "/trade/purchase-order-index", component: resolve => require(["./trade/purchase-order-index.vue"], resolve)},
    {path: "/trade/sale-order-index", component: resolve => require(["./trade/sale-order-index.vue"], resolve)},
    {path: "/article/index/:page?", component: resolve => require(["./article/index.vue"], resolve), name:["内容", "文章管理"]},
    {path: "/article/edit/:id?", component: resolve => require(["./article/edit.vue"], resolve), name:["内容", "文章管理", "编辑"]},
    //{path: "/article/edit/:id?", component: require(["./article/edit.vue"]), name:["内容", "文章管理", "编辑"]},
    {path: "/article/category-index", component: resolve => require(["./article/category-index.vue"], resolve), name:["内容", "分类管理"]},
    {path: "/article/category-edit/:id?", component: resolve => require(["./article/category-edit.vue"], resolve), name:["内容", "分类管理", "编辑"]}
]