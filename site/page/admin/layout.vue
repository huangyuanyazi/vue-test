<template>
    <div class="c-admin">
        <div class="c-top">
            <div class="c-crumb">
                <el-breadcrumb >
                    <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="crumb of crumbs">{{crumb}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="c-user">
                <el-dropdown @command="userCommand">
                    <span><i class="fa fa-user-circle"></i>admin <i class="fa fa-chevron-down"></i></span>
                    <el-dropdown-menu class="c-user-action" slot="dropdown">
                        <el-dropdown-item> 修改密码 <i class="fa fa-edit"></i></el-dropdown-item>
                        <el-dropdown-item command="logout"> 退出系统 <i class="fa fa-sign-out"></i></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="c-side">
            <div class="c-logo"><a href="/" target="_blank"><img :src="require('asset/image/logo-small.png')"></a></div>
            <el-menu :router="true" theme="dark" class="c-menu" @open="handleOpen" @close="handleClose">
                <el-menu-item index="/" class="c-home-menu"><i class="fa fa-desktop"></i>工作台</el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="fa fa-balance-scale"></i>交易</template>
                    <el-menu-item index="/trade/sale-order-index" style="text-align: center">销售订单</el-menu-item>
                    <el-menu-item index="/trade/purchase-order-index" style="text-align: center">采购订单</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="fa fa-list"></i>商品</template>
                    <el-menu-item index="/item/index" style="text-align: center">商品列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="fa fa-file-text-o"></i>内容</template>
                    <el-menu-item index="/article/index" style="text-align: center">文章管理</el-menu-item>
                    <el-menu-item index="/article/category-index" style="text-align: center">分类管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="fa fa-user-circle-o"></i>会员</template>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="fa fa-bar-chart"></i>统计</template>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title"><i class="fa fa-cogs"></i>系统</template>
                </el-submenu>
            </el-menu>
        </div>
        <div class="c-page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                crumbs: []
            }
        },
        watch: {
            "$route" (to, from) {
                this.crumbs = to.name
                //console.log(to)
            }
        },
        mounted () {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            userCommand(command) {
                console.log('click on item ' + command);
                if("password" == command) {

                } else if("logout" == command) {
                    location.href = "/admin/logout"
                }
            }
        }

//        beforeCreate () {
//            console.log("beforeCreate")
//        },
//        created () {
//            console.log("created")
//        },
//        beforeMount () {
//            console.log("beforeMount")
//        },
//        mounted () {
//            console.log("mounted")
//        },
//        beforeUpdate () {
//            console.log("beforeUpdate")
//        },
//        updated () {
//            console.log("updated")
//        },
//        activated () {
//            console.log("activated")
//        },
//        deactivated () {
//            console.log("deactivated")
//        },
//        beforeDestroy () {
//            console.log("beforeDestroy")
//        },
//        destroyed () {
//            console.log("destroyed")
//        }
    }
</script>