<template>
	<div id='app'>
		<f7-statusbar>
		</f7-statusbar>
		<f7-views>
			<f7-view main :domCache="false">
				<f7-pages navbar-through toolbar-through id="pages">
					<f7-page>
						<f7-navbar title="淘权网" sliding></f7-navbar>
					</f7-page>
				</f7-pages>
				<f7-toolbar tabbar labels>
					
					<f7-link icon-fa="book" text="专利11" tab-link="#patentTab" class="c-fontSize-40"
							 active></f7-link>
					<f7-link icon-fa="bandcamp" text="商标" tab-link="#trademarkTab"
							 class="c-fontSize-40"></f7-link>
				</f7-toolbar>
				<f7-tabs>
					<f7-tab id="patentTab" active @tab:show="tabShow('patent')">
					</f7-tab>
					<f7-tab id="trademarkTab" @tab:show="tabShow('trademark')">
					</f7-tab>
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
	/*.toolbar-inner i {*/
	/*margin-top: 4px*/
	/*}*/
	/**/
	/*.toolbar-inner span {*/
	/*font-size: 12px*/
	/*}*/
</style>
<script>
    export default{
        data(){
            return {}
        },
        methods: {
            tabShow(param){
                switch (param) {
                    case'patent':
                        this.$f7.mainView.loadPage('/patent/')
                        break;
                    case 'trademark':
                        this.$f7.mainView.loadPage('/trademark/')
                        break;
                }
            },
        }
        ,
        mounted(){
            $$('.toolbar-inner i').attr('style', 'margin-top:4px')
            $$('.toolbar-inner span').attr('style', 'font-size:12px')
            this.$nextTick(function () {
                this.$f7.mainView.loadPage('/patent/')
            })
        }
    }
</script>