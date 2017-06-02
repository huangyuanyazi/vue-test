<template>
    <!--<div id='patentContainer'>-->
    <f7-page name="pagePatent" id='page_patent' :infinite-scroll="isScroll" @infinite="onInfiniteScroll"
             :infinite-scroll-preloader="hasPreloader">
        <f7-navbar class="c-no-bottomLine">
            <f7-nav-left>
                专利
            </f7-nav-left>
            <f7-nav-center sliding class='c-virtualSearch'>
                <a href='/patent/search'>
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
                     @click.native="$router.load({url:'/patent/detail/?id='+patent.id+''})"></patent-card>
        <!--<div class="page-content  infinite-scroll-bottom " id='p_pageContent'>-->

        <!--<div class="infinite-scroll-preloader" id='p_infinite_preloader'>-->
        <!--<div class="preloader"></div>-->
        <!--</div>-->

        <!--</div>-->
        <!--<script id="patent_template" type="text/template7">-->
        <!---->
        <!---->
        <!---->
        <!--</script>-->
        <!--<script type='text/template7' id='ejectTemplate_p'>-->
        <!---->
        <!--</script>-->
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
<script>
    import PatentFilter from "../../conponents/patentFilter.vue"
    import PatentCard from "../../conponents/patentList.vue"
    export default{
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
            this.param._page = 1;
            this.param._limit = 10;
            console.log(this.param)
            $$.getJSON(config.mock.url + '/patent', this.param, (data, status, xhr) => {
                this.patents = data;
                console.log('created')
                this.param._page = 2
//                this.paramInvariant._page=2
            })
//            this.$on('getParamData', (param) => { //Hub接收事件
//                console.log(param)
//
//            });
            console.log('来自搜索页的查询数据--------------', this.$route.query)
        },
        watch: {
            param: {
                handler(curVal, oldVal){
                    console.log('监测param的变化-------')
                    this.param._page = 1;
                    this.param._limit = 10;
                    $$.getJSON(config.mock.url + '/patent', this.param, (data, status, xhr) => {
//                        if (curVal._page == oldVal._page) {
//                            return
//                        }
//                        if (curVal._page != oldVal._page) {
//                            return
//                        }
                        this.totalCount = xhr.getResponseHeader("X-Total-Count");
                        console.log(this.totalCount)
                        $$('.page-content').scrollTop(0)
                        this.param._page = 2
                        this.patents = data;
//                        this.isScroll = true
//                        this.hasPreloader = true
                        this.$f7.attachInfiniteScroll($$('.page-content'));
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
                    $$.getJSON(config.mock.url + "/patent", self.param,
                        (data, status, xhr) => {
//                        self.loading = false
                            self.totalCount = xhr.getResponseHeader("X-Total-Count");
                            console.log(data)
//                        console.log(self)
//                        data.forEach(function (item) {
//                            self.patents.push(item)
//                        })
                            for (let item of data) {
                                self.patents.push(item)
                            }
                            //销毁滚动事件
                            console.log(self.param._page, '销毁测试')
                            console.log(self.perCount, '销毁测试')
                            console.log(self.totalCount, '销毁测试')
                            let page = self.param._page
                            if (page * self.perCount >= self.totalCount) {
//                            console.log($$('.infinite-scroll'))
                                self.$f7.detachInfiniteScroll($$('.infinite-scroll'))
//                            self.isScroll = false
                                self.hasPreloader = false
//                                self.loading = true
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
        computed: {
//            newParam() {
//                //计算返回一组新数据格式-->{'0':'xxx','1':'xxx','2':'xxx'}<--[模拟索引号]]
//                let obj = {};
//                for (let i = 0; i < this.param.length; i++) obj[i] = this.param[i];
//                return obj;
//            }
        },
        mounted () {
            let a = this.$router
            let b = this.$f7.mainView.router
            console.log(a==b)

        }
    }
</script>