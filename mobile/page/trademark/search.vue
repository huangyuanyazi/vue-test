<template>
    <f7-page no-navbar no-toolbar name="trademark_search" id='trademark_search'>
        <!--:clear="true"-->
        <!--<f7-searchbar-->
        <!--:init="isInit"-->
        <!--cancel-link="取消"-->
        <!--placeholder="请输入关键字"-->
        <!--@click:cancel="cancel"-->
        <!--style="top:0"-->
        <!--:value="historyItem"-->
        <!--&gt;</f7-searchbar>-->
        <form class="searchbar searchbar-init">
            <div class="searchbar-input">
                <input type="search" placeholder="输入你想搜索的内容" @keyup.13="keyupEvent" id="trademarkAutocompleteInput"
                       v-model="searchInputValue" autocomplete="off">
                <a href="#" class="searchbar-clear"></a>
            </div>
            <a href="#" class="searchbar-cancel" @click="cancel">取消</a>
        </form>
        <f7-block-title>商标分类</f7-block-title>
        <f7-grid no-gutter id="trademark_classify">
            <f7-col width="50"
                    v-for="classifyItem of classifyItems"
                    @click.native="linkToIndex(classifyItem)">
                {{classifyItem.sort_name}}
            </f7-col>
        </f7-grid>
    </f7-page>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    #trademark_classify {
        background: #ffffff;
        .col-50 {
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            border-right: 1px #efeff4 solid;
            border-bottom: 1px #efeff4 solid;
            height: 25px;
            color: black;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                isInit: true,
                searchInputValue: "",
                classifyItems:[]
            }
        },
        mounted(){
            console.log('mounted')
            let trademarkAutocompleteInput = this.$f7.autocomplete({
                input: '#trademarkAutocompleteInput',
                openIn: 'dropdown',
                //允许加载样式
                preloader: true,
                //对象value的属性名
                valueProperty: 'id',
                //每条数据对象的属性名
                textProperty: 'search_content',
                //限制二十个自动填充结果
                limit: 20,
                //搜索框获得焦点后的默认下拉框
                dropdownPlaceholderText: '试试搜索 "油烟机的发明"',
                //下拉列表为全屏范围
                expandInput: true,
                source: function (autocomplete, query, render) {
                    console.log(query)
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
                            console.log(results)
                            //隐藏加载样式
                            autocomplete.hidePreloader();
//                            console.log(rander(results))
                            //渲染查询结果到显示列表
                            render(results);
                        }
                    });
                }
            });
        },
        methods: {
            cancel()
            {
                this.$router.load({
                    url: "/trademark/"
                })
            }
            ,
            keyupEvent()
            {
                this.$router.load({
                    url: `/trademark/?searchItem=${this.searchInputValue}`
                })
            },
            linkToIndex(classifyItem){
                this.$router.load({url:'/trademark/?searchItem='+classifyItem.sort_name+''})
            }
        },
        created()
        {
            console.log('created')
            $$.getJSON(config.mock.url+'/trademark_classify', (data, status, xhr) => {
               this.classifyItems=data;
            })
        },
        beforeDestroy(){

        }
    }
</script>

