<template>
	<!--<div id='patentContainer'>-->
	<f7-page ref="patent"
			 name="pagePatent"
			 id='page_patent'
			 :infinite-scroll="isScroll"
			 @infinite="onInfiniteScroll"
			 :infinite-scroll-preloader="hasPreloader"
	>
		<f7-navbar class="c-no-bottomLine">
			<f7-nav-left>
				专利
			</f7-nav-left>
			<f7-nav-center sliding class='c-virtualSearch'>
				<a href='javascript:void(0)' @click="toSearchPage">
					<f7-icon fa="search"></f7-icon>
					<span>
					输入您想要的内容
				    </span>
				</a>
			</f7-nav-center>
		</f7-navbar>
		<patent-filter @getParam='getParamData'></patent-filter>
		<div style="height: 44px"></div>
		<patent-card v-for='patent in patents' :patentData="patent"
					 @click.native="$router.load({url:'/patent/detail/?id='+patent.id+''})"
					 :key="patent.id"></patent-card>
		<div style="height:20px"></div>
	</f7-page>
	<!--</div>-->
</template>
<style lang="less" rel="stylesheet/less" scoped>
	.c-no-bottomLine {
		&:after {
			height: 0;
		}
	}
	
	.c-virtualSearch {
		width: 80%;
		height: 35px;
		color: #6d6d72;
		background: #e3e3e5;
		-webkit-border-radius: 50px;
		a {
			color: #6d6d72;
			font-size: 15px;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center
		}
	}
</style>
<script type="text/ecmascript-6">
    import PatentFilter from "../../conponents/patentFilter.vue"
    import PatentCard from "../../conponents/patentList.vue"
    export default{
        name: 'TqPatent',
        data(){
            return {
                patents: {},
                param: {},
                loading: false,
                totalCount: 0,
                perCount: 10,
                isScroll: true,
                hasPreloader: true
            }

        },
        created() {
            console.log('patentIndex--created')
            this.param.page = 1;
//            this.param['per-page'] = 10;
//            this.param = {"item_class_id": 1, "per-page": 100, "page": 5}
            this.param['item_class_ids:0'] = 1
            this.param['per-page'] = 10;
//            console.log('this.param', this.param)
            $$.getJSON(config.api.url + '/items', this.param, (data, status, xhr) => {
                this.patents = data;
                console.log('created')
                this.param.page = 2
                console.log(data)
            })
//            this.$on('getParamData', (param) => { //Hub接收事件
//                console.log(param)
//
//            });
        },
        watch: {
            param: {
                handler(curVal, oldVal){
                    console.log('监测param的变化-------')
                    this.param.page = 1;
                    this.param['per-page'] = 10;
                    this.param['item_class_ids:0'] = 1
//                    console.log(this.param)
                    this.$f7.showIndicator()
                    $$.getJSON(config.api.url + '/items', this.param, (data, status, xhr) => {
                        this.$f7.hideIndicator()

                        this.totalCount = xhr.getResponseHeader("X-Pagination-Total-Count");
                        console.log(this.totalCount)
                        $$('.page-content').scrollTop(0)
                        this.param.page = 2
                        this.patents = data;

//                        this.isScroll = true
//                        this.hasPreloader = true
                        this.$f7.attachInfiniteScroll($$('.page-content'));
//                        this.isScroll = true;
                        if (this.totalCount > 10) {
                            this.hasPreloader = true
                        } else {
                            this.hasPreloader = false
                        }
                    })
                },
                deep: true
            }
        },
        ready(){
            console.log('ready')
        },
        attached() {
            console.log('attached')
        },
        components: {
            patentFilter: PatentFilter,
            patentCard: PatentCard,
        },
        methods: {
            toSearchPage(){
                this.$router.load({url: '/patent/search'})
            },
            getParamData(data){
                this.param = data;
                console.log('来自组件的数据-------')
                console.log(this.param)
            },
            onInfiniteScroll(){
                let self = this;
                if (this.loading)
                    return;
                this.loading = true
                console.log('滚动param--------------------')
                //每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                console.log(self.param)
                $$.getJSON(config.api.url + "/items", self.param,
                    (data, status, xhr) => {
                        self.loading = false
                        self.totalCount = xhr.getResponseHeader("X-Pagination-Total-Count");
//                            console.log(data)
//                        console.log(self)
//                        data.forEach(function (item) {
//                            self.patents.push(item)
//                        })
                        self.patents.push(...data)
                        //销毁滚动事件
                        console.log(self.param.page, '销毁测试')
                        console.log(self.perCount, '销毁测试')
                        console.log(self.totalCount, '销毁测试')
                        let page = self.param.page
                        if (page * self.perCount >= self.totalCount) {
//                            console.log($$('.infinite-scroll'))
                            self.$f7.detachInfiniteScroll($$('.infinite-scroll'))
//                                self.isScroll = false;
                            self.hasPreloader = false;
//                                self.loading = true
//                                console.log(self.isScroll)
                            return
                        }
                        //下次滚动发送请求时，分页为下一页
                        self.param.page++
                        console.log(self.param.page, '---------------------------')
                    })
            }
        },
        computed: {},
        mounted () {

        }
    }
</script>