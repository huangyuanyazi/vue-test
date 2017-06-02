<template>
    <div id='app'>
        <f7-statusbar>
        </f7-statusbar>
        <f7-views>
            <f7-view main>
                <f7-pages navbar-through toolbar-through>
                    <f7-page no-navbar name="index">
                        <f7-navbar title="淘权网" sliding></f7-navbar>
                    </f7-page>
                </f7-pages>
                <f7-toolbar tabbar labels >
                    <f7-link icon-fa="book" text="专利" tab-link="#tab_patent" class="c-fontSize-40"
                             active></f7-link>
                    <f7-link icon-fa="bandcamp" text="商标" tab-link="#tab_trademark"
                             class="c-fontSize-40"></f7-link>
                </f7-toolbar>
                <!--空tab仅供show事件使用-->
                <f7-tabs>
                    <!--tab:show方法在tab激活的时候触发-->
                    <f7-tab id="tab_patent" active @tab:show="tabActived('patent')"></f7-tab>
                    <f7-tab id="tab_trademark" @tab:show="tabActived('trademark')"></f7-tab>
                    <!--<f7-tab id="tab_patent"></f7-tab>-->
                    <!--<f7-tab id="tab_trademark"></f7-tab>-->
                </f7-tabs>
            </f7-view>
        </f7-views>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    /*.c-toolbar {*/
        /*.c-fontSize-40 {*/
            /*font-size: 12px;*/
            /*margin-top: 4px;*/
        /*}*/
    /*}*/
</style>
<script>
    export default{
        methods: {
            tabActived(tab){
                switch (tab) {
                    case "patent":
                        //console.log(this.$router)
                        //console.log(this.$f7)
                        this.$f7.mainView.loadPage('/patent/')
                        break;
                    case "trademark":
                        this.$f7.mainView.loadPage('/trademark/')
                        break;


                }
            }
        }
        ,
        mounted(){
           $$('.toolbar-inner i').attr('style','margin-top:4px')
           $$('.toolbar-inner span').attr('style','font-size:12px')
        }
    }
</script>