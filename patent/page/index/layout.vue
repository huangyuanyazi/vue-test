<template>
    <div class="c-index">
        <div class="c-top-wrapper">
            <div class="c-patent">
                <div class="c-top">
                    <div class="c-logo">淘权网专利查询系统</div>
                    <div class="c-user">欢迎您：{{username}}&nbsp;&nbsp;<el-button type="text" @click="changeUser">注销</el-button></div>
                </div>
            </div>
        </div>
        <div class="c-patent">
            <div class="c-page">
                <keep-alive :include="/^Tq.*Index$/">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <div class="c-footer">
            <div class="c-patent">
                <div class="c-copyright">
                    &copy; 2017 淘权网 版权所有 苏ICP备15054372号 增值电信业务经营许可证：苏B2-20170062
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqLayout',
        data () {
            return {
                username: null
            }
        },
        mounted () {
            this.username = this.$loginUser[0]
        },
        methods: {
            changeUser () {
                location.href = '/login'
            }
        }
    }
</script>