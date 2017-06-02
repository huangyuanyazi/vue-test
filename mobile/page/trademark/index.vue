<template>
    <f7-page name="pagePatent"
             id='page_patent'
             :infinite-scroll="isScroll"
             @infinite="onInfiniteScroll"
             :infinite-scroll-preloader="hasPreloader">
        <f7-navbar class="c-no-bottomLine">
            <f7-nav-left>
                商标
            </f7-nav-left>
            <f7-nav-center sliding class='c-virtualSearch'>
                <a href='/trademark/search'>
                    <f7-icon fa="search"></f7-icon>
                    <span>
					输入您想要的内容
				    </span>
                </a>
            </f7-nav-center>
        </f7-navbar>
        <div style="height: 44px"></div>
        <trademark-filter @getParam='getParamData'></trademark-filter>
        <trademark-card v-for='trademark in trademarks' :trademarkData="trademark"
                        @click.native="$router.load({url:'/trademark/detail/?id='+trademark.id+''})"></trademark-card>
    </f7-page>
    <!--<div class="col-50">{{sort_name}}</div>-->
    <!--{{/each}}-->
    <!--</script>-->
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .c-no-bottomLine{
        &:after{
            height:0;
        }
    }
    .c-virtualSearch{
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
<script>
    import TrademarkFilter from "../../conponents/trademarkFilter.vue"
    import TrademarkCard from "../../conponents/trademarkList.vue"
    export default{
        data(){
            return {
                trademarks: {},
                param: {},
                loading: false,
                totalCount: 0,
                perCount: 10,
                isScroll: true,
                hasPreloader: true
            }

        },
        created() {
            this.param._page = 1;
            this.param._limit = 10;
            console.log(this.param)
            $$.getJSON(config.mock.url + '/trademark', this.param, (data, status, xhr) => {
                this.trademarks = data;
                console.log('created')
                this.param._page = 2
            })
            console.log('来自搜索页的查询数据--------------', this.$route.query)
        },
        watch: {
            param: {
                handler(curVal, oldVal){
                    console.log('监测param的变化-------')
                    this.param._page = 1;
                    this.param._limit = 10;
                    $$.getJSON(config.mock.url + '/trademark', this.param, (data, status, xhr) => {
                        this.totalCount = xhr.getResponseHeader("X-Total-Count");
                        console.log(this.totalCount)
                        $$('.page-content').scrollTop(0)
                        this.param._page = 2
                        this.trademarks = data;
                        this.$f7.attachInfiniteScroll($$('.page-content'));
                        if(this.totalCount>10){
                            this.hasPreloader = true
                        }else{
                            this.hasPreloader = false
                        }
                    })
                },
                deep: true
            }
        },
        components: {
            trademarkFilter: TrademarkFilter,
            trademarkCard: TrademarkCard,
        },
        methods: {
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
                //模拟一秒加载过程
                setTimeout(function () {
                    self.loading = false
                    //每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                    console.log(self.param)
                    $$.getJSON(config.mock.url + "/trademark", self.param,
                        (data, status, xhr) => {
                            self.totalCount = xhr.getResponseHeader("X-Total-Count");
                            console.log(data)
                            for (let item of data) {
                                self.trademarks.push(item)
                            }
                            //销毁滚动事件
                            console.log(self.param._page, '销毁测试')
                            console.log(self.perCount, '销毁测试')
                            console.log(self.totalCount, '销毁测试')
                            let page = self.param._page
                            if (page * self.perCount >= self.totalCount) {
                                self.$f7.detachInfiniteScroll($$('.infinite-scroll'))
                                self.hasPreloader = false
                                console.log(self.isScroll)
                                return
                            }
                            //下次滚动发送请求时，分页为下一页
                            self.param._page++
                            console.log(self.param._page, '---------------------------')
                        })
                }, 1000)
            }
        },


    }

</script>