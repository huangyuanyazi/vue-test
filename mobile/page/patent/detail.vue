<!-- Views-->
<template>
    <!--<div id="patentDetailContainer">-->
    <f7-page no-toolbar name="patent_detail" id='patent_detail'>
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon='icon-back' href="javascript:void(0)" @click="$router.back()"></f7-link>
            </f7-nav-left>
            <f7-nav-center>专利详情</f7-nav-center>
            <f7-nav-right>
                <f7-link id="share_patent_detail">分享</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <!--<div id='patent_detail_content'>-->
        <f7-block>
            <f7-card>
                <f7-card-header>
                    <span>{{patent.patent_header}}</span>
                    <span>{{patent.id}}</span>
                </f7-card-header>
                <f7-card-content>
                    <p>专利号：{{patent.patent_number}}
                    </p>
                    <p>{{patent.patent_type}}&nbsp;&nbsp; {{patent.patent_status}}&nbsp;&nbsp;
                        截止{{patent.patent_deadline}}
                    </p>
                    <p>
                        {{patent.patent_key}}
                    </p>
                </f7-card-content>
                <f7-card-footer>{{patent.company}}</f7-card-footer>
            </f7-card>
        </f7-block>
        <f7-block>
            <f7-card>
                <f7-card-header>专利详情</f7-card-header>
                <f7-card-content>{{patent.patent_describ}}</f7-card-content>
            </f7-card>
        </f7-block>
        <!--<div class="content-block">-->
        <!--<div class="card">-->
        <!--<div class="card-header">-->
        <!--专利发布人-->
        <!--</div>-->
        <!--<div class="card-content">-->
        <!--<div class="card-content-inner">-->
        <!--<p>{{company}}</p>-->
        <!--<p><a href="page/patent/seller_patent.html?company={{company}}" class="">他还有{{patent_count}}个专利正在转让-->
        <!--&gt;</a></p>-->
        <!--</div>-->
        <!--</div>-->
        <!---->
        <!--</div>-->
        <!--</div>-->
        <f7-button big fill round color="red" class="c-p-tm-call">Big Red Button</f7-button>
        <!--</div>-->
    </f7-page>
    <!--</div>-->
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .c-p-tm-call{
        position: fixed;
        bottom: 0;
        width: 100%
    }
</style>
<script>
    export default{
        data(){
            return {
                patent: "",
            }
        },
        created(){
//            console.log(page.url)
//            console.log(this.url)
            let id = this.$route.query.id;
            $$.getJSON(config.mock.url + '/patent/' + id, (data, status, xhr) => {
                this.patent = data
            })


        }
    }
</script>