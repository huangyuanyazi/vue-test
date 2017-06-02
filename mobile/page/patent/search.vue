<template>
    <f7-page no-navbar no-toolbar name="patent_search" id='patent_search'>
        <!--:clear="true"-->
        <!--<div @keyup.13="keyupEvent">-->
        <!--<f7-searchbar-->
        <!--:init="isInit"-->
        <!--cancel-link="取消"-->
        <!--placeholder="请输入关键字"-->
        <!--@click:cancel="cancel"-->
        <!--style="top:0"-->
        <!--:value="searchInputValue"-->
        <!--id="patentAutocompleteInput"-->
        <!--&gt;</f7-searchbar>-->
        <!--</div>-->

        <form class="searchbar searchbar-init">
            <div class="searchbar-input">
                <input type="search" placeholder="输入你想搜索的内容" @keyup.13="keyupEvent" id="patentAutocompleteInput"
                       v-model="searchInputValue" autocomplete="off">
            </div>
            <a  class="searchbar-cancel" @click="cancel">取消</a>
        </form>
        <f7-card id="hot">
            <f7-card-header ref="hot">热门搜索</f7-card-header>
            <f7-card-content>
                <f7-chip :text="hotSearch.hot_search_item"
                         v-for="hotSearch of hotSearchAll"
                         @click="$router.load({url:'/patent/?searchItem='+hotSearch.hot_search_item+''})">
                </f7-chip>
            </f7-card-content>
        </f7-card>


        <f7-card>
            <f7-card-header ref="hot">历史搜索</f7-card-header>
            <f7-card-content>
                <f7-list>
                    <f7-list-item :title="historyItem.title"
                                  v-for="historyItem of historyItems"
                                  @click="$router.load({url:'/patent/?searchItem='+historyItem.title+''})"
                    ></f7-list-item>
                </f7-list>
            </f7-card-content>
            <f7-card-footer>
                <span></span>
                <span @click="clearHistory">清除历史记录</span>
                <span></span>
            </f7-card-footer>
        </f7-card>
    </f7-page>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .chip {
        font-size: 13px;
        font-weight: 400;
        color: rgba(0, 0, 0, .87);
        background: rgba(0, 0, 0, .12);
        display: inline-block;
        height: 32px;
        line-height: 32px;
        border-radius: 16px;
        padding: 0 12px;
        box-sizing: border-box;
        vertical-align: middle;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        margin: 10px 10px;
    }
</style>
<script>
    export default{
        name: 'TqPatentSearch',
        data(){
            return {
                hotSearchAll: "",
                historyItems: [],
                isInit: true,
                searchInputValue: ""
            }
        },
        mounted(){
            console.log('patentSearch mounted')
            this.autocompleteMethod()
            //组件中对dom进行操作一般使用如下方法
//            this.$refs.hot._self.$el.style.backgroundColor='blue'

//            $$('#hot').attr('style', 'color:red')
//            this.$nextTick(function () {
//                $$('#hot').attr('style', 'color:red')
//            })

//            this.$f7.autocomplete({
//                input: '#patentAutocompleteInput',
//                openIn: 'dropdown',
//                //允许加载样式
//                preloader: true,
//                //对象value的属性名
//                valueProperty: 'id',
//                //对象text的属性名
//                textProperty: 'search_content',
//                //限制二十个自动填充结果
//                limit: 20,
//                //搜索框获得焦点后的默认下拉框
//                dropdownPlaceholderText: '试试搜索 "油烟机的发明"',
//                //下拉列表为全屏范围
//                expandInput: true,
//                source: function (autocomplete, query, render) {
//                    this.searchInputValue = query
//                    var results = [];
//                    if (query.length === 0) {
//                        render(results);
//                        return;
//                    }
//                    // 显示加载样式
//                    autocomplete.showPreloader();
//                    /**
//                     * 发送异步请求获取数据
//                     */
//                    $$.ajax({
//                        url: config.mock.url + '/autocomplete_search',
//                        method: 'GET',
//                        dataType: 'json',
//                        //发送查询参数到服务器
//                        data: {
//                            query: query
//                        },
//                        success: function (data) {
//                            console.log(data)
//                            /**
//                             * 找到匹配项
//                             */
//                            for (var i = 0; i < data.length; i++) {
//                                if (data[i].search_content.toLowerCase().indexOf(query.toLowerCase()) >= 0)
//                                    results.push(data[i]);
//                            }
//                            //隐藏加载样式
//                            autocomplete.hidePreloader();
////                            console.log(rander(results))
//                            //渲染查询结果到显示列表
//                            render(results);
//                        }
//                    });
//                }
//            });
        },
        methods: {
            cancel()
            {
                this.$router.back()
            }
            ,
            storeHistory(event)
            {
                alert(event.keyCode)
            }
            ,
            clearHistory()
            {
                this.historyItems = []
                localStorage.removeItem('historySearch')
            }
            ,
            keyupEvent()
            {
                this.historyItems.push({title: this.searchInputValue})
                window.localStorage.setItem('historySearch', JSON.stringify(this.historyItems));
                this.$router.load({
                    url: `/patent?searchItem=${this.searchInputValue}`
                })
//                this.historyItemsString.push(JSON.stringify({title: this.searchInputValue}))
//                window.localStorage.historySearchData = JSON.stringify(this.historyItemsString);

            },
            autocompleteMethod(){
                this.$f7.autocomplete({
                    input: '#patentAutocompleteInput',
                    openIn: 'dropdown',
                    //允许加载样式
                    preloader: true,
                    //对象value的属性名
                    valueProperty: 'id',
                    //对象text的属性名
                    textProperty: 'search_content',
                    //限制二十个自动填充结果
                    limit: 20,
                    //搜索框获得焦点后的默认下拉框
                    dropdownPlaceholderText: '试试搜索 "油烟机的发明"',
                    //下拉列表为全屏范围
                    expandInput: true,
                    source: function (autocomplete, query, render) {
                        this.searchInputValue = query
                        var results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        // 显示加载样式
                        autocomplete.showPreloader();
                        /**
                         * 发送异步请求获取数据
                         */
                        $$.ajax({
                            url: config.mock.url + '/autocomplete_search',
                            method: 'GET',
                            dataType: 'json',
                            //发送查询参数到服务器
                            data: {
                                query: query
                            },
                            success: function (data) {
                                console.log(data)
                                /**
                                 * 找到匹配项
                                 */
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].search_content.toLowerCase().indexOf(query.toLowerCase()) >= 0)
                                        results.push(data[i]);
                                }
                                //隐藏加载样式
                                autocomplete.hidePreloader();
//                            console.log(rander(results))
                                //渲染查询结果到显示列表
                                render(results);
                            }
                        });
                    }
                });
            }
        },
        created()
        {
            console.log('patentSearch created')
            $$.getJSON(config.mock.url + "/hot_search", (data, status, xhr) => {
                this.hotSearchAll = data
            })
            if (window.localStorage.getItem('historySearch')) {
//                console.log(window.localStorage.getItem('historySearch'));
//                for(let item of JSON.parse(window.localStorage.getItem('historySearch'))){
//                    this.historyItems.push(item)
//                }
                this.historyItems = JSON.parse(window.localStorage.getItem('historySearch'))
            }
        },
        beforeDestroy(){

        },
        beforeUpdate(){
//            $$('#hot').attr('style', 'color:red')
        },
        beforeMount(){
//            $$('#hot').attr('style', 'color:red')
        },
        computed:{
        },
        updated(){
//            $$('#hot').attr('style', 'color:red')
        }

    }

</script>