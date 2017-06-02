<!-- Views-->
<template>
    <f7-page no-toolbar name="trademark_detail" id='trademark_detail'>
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon='icon-back' href="/trademark/"></f7-link>
            </f7-nav-left>
            <f7-nav-center>商标详情</f7-nav-center>
            <f7-nav-right>
                <f7-link id="share_trademark_detail">分享</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <f7-card>
                <f7-card-content>
                    <div class="c-large-background"></div>
                </f7-card-content>
            </f7-card>
        </f7-block>
        <f7-block>
            <f7-card>
                <f7-card-header>
                    {{trademark.trademark_header}}
                </f7-card-header>
                <f7-card-content>
                    <span>{{trademark.id}}</span>
                    <p>{{trademark.trademark_header}}
                    </p>
                    <p>{{trademark.trademark_sort}}&nbsp;&nbsp; 注册于{{trademark.trademark_registDate}}
                    </p>
                    <p>
                        {{trademark.trademark_describ}}
                    </p>
                </f7-card-content>
            </f7-card>
        </f7-block>

        <f7-block>
            <f7-card>
                <f7-card-header>
                    {{trademark.trademark_describ}}
                </f7-card-header>
                <f7-card-content>
                    {{trademark.trademark_describ}}
                </f7-card-content>
            </f7-card>
        </f7-block>
        <f7-button big fill round color="red" class="c-p-tm-call">Big Red Button</f7-button>
    </f7-page>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    .c-large-background {
        height: 150px;
        background: url("../../asset/image/logo.png");
        background-repeat: no-repeat;
        background-position: 100%;
        background-size: contain;
    }

    #trademark_detail_content {
        padding-bottom: 80px;
        span {
            float: right;
        }
    }
    .c-p-tm-call {
        position: fixed;
        bottom: 0;
        width: 100%
    }
</style>
<script>
    export default{
        data(){
            return {
                trademark: "",
            }
        },
        created(){
//            console.log(page.url)
//            console.log(this.url)
            let id = this.$route.query.id;
            $$.getJSON(config.mock.url + '/trademark/' + id, (data, status, xhr) => {
                this.trademark = data
            })


        }
    }
</script>
