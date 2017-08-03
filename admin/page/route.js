/**
 * Created by Wangxy on 2017/4/11.
 */
export default [
    { path: '/item/item/index', component: resolve => require(['./item/item-index.vue'], resolve) },
    { path: '/item/item/create', component: resolve => require(['./item/item-edit.vue'], resolve) },
    { path: '/item/item/update', component: resolve => require(['./item/item-edit.vue'], resolve) },
    { path: '/item/item/batch-create', component: resolve => require(['./item/item-batch-edit.vue'], resolve) },
    { path: '/item/item-class/index', component: resolve => require(['./item/item-class-index.vue'], resolve) },
    { path: '/item/item-class/create', component: resolve => require(['./item/item-class-edit.vue'], resolve) },
    { path: '/item/item-class/update', component: resolve => require(['./item/item-class-edit.vue'], resolve) },

    { path: '/content/article/index', component: resolve => require(['./content/article-index.vue'], resolve) },
    { path: '/content/article/create', component: resolve => require(['./content/article-edit.vue'], resolve) },
    { path: '/content/article/update', component: resolve => require(['./content/article-edit.vue'], resolve) },
    { path: '/content/article-category/index', component: resolve => require(['./content/article-category-index.vue'], resolve) },
    { path: '/content/article-category/create', component: resolve => require(['./content/article-category-edit.vue'], resolve) },
    { path: '/content/adv/index', component: resolve => require(['./content/adv-index.vue'], resolve) },
    { path: '/content/adv/create', component: resolve => require(['./content/adv-edit.vue'], resolve) },
    { path: '/content/adv-position/index', component: resolve => require(['./content/adv-position-index.vue'], resolve) },
    { path: '/content/adv-position/create', component: resolve => require(['./content/adv-position-edit.vue'], resolve) },
    { path: '/content/adv-position/update', component: resolve => require(['./content/adv-position-edit.vue'], resolve) },

    { path: '/patent/patent/index', component: resolve => require(['./patent/patent-index.vue'], resolve) },
    { path: '/patent/patent/detail', component: resolve => require(['./patent/patent-detail.vue'], resolve) },
    { path: '/patent/patent/create', component: resolve => require(['./patent/patent-edit.vue'], resolve) },
    { path: '/patent/patent/update', component: resolve => require(['./patent/patent-edit.vue'], resolve) },
    { path: "/patent/patent-status/batch-create", component: resolve => require(['./patent/patent-status-batch-edit.vue'], resolve) },

    { path: '/system/admin/index', component: resolve => require(['./system/admin-index.vue'], resolve) },
    { path: '/system/admin/create', component: resolve => require(['./system/admin-edit.vue'], resolve) },
    { path: '/system/admin/update', component: resolve => require(['./system/admin-edit.vue'], resolve) },
    { path: '/system/admin/auth-update', component: resolve => require(['./system/admin-auth-edit.vue'], resolve) },
    { path: '/system/role/index', component: resolve => require(['./system/role-index.vue'], resolve) },
    { path: '/system/role/create', component: resolve => require(['./system/role-edit.vue'], resolve) },
    { path: '/system/role/update', component: resolve => require(['./system/role-edit.vue'], resolve) },
    { path: '/system/menu/index', component: resolve => require(['./system/menu-index.vue'], resolve) },
    { path: '/system/menu/create', component: resolve => require(['./system/menu-edit.vue'], resolve) },
    { path: '/system/menu/update', component: resolve => require(['./system/menu-edit.vue'], resolve) },
    { path: '/system/setting/index', component: resolve => require(['./system/setting-index.vue'], resolve) },
    { path: '/system/setting/create', component: resolve => require(['./system/setting-edit.vue'], resolve) },
    { path: '/system/setting/update', component: resolve => require(['./system/setting-edit.vue'], resolve) },

    { path: '/', component: resolve => require(['./index.vue'], resolve), meta: { crumb: ["工作台"] } },
    { path: '/error', component: resolve => require(['./error.vue'], resolve), meta: { crumb: ["系统错误"] } }
]