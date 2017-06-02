/**
 * index.js
 * 专利首页的相关js代码
 */
//导入filter.js的方法
import handleFilter from './filter.js'
export default {
    pageInit (app, page) {
        //模板编译
        let listTemplate = Template7.compile($$("#patent_template").html())
        //请求参数
        let param = {_page: 1, _limit: 10}
        let query = page.query;
        /**
         * 处理专利搜索页热门搜索栏传来的参数
         */
        if (query.hasOwnProperty('hotSearch')) {
            let hotSearchParam = query.hotSearch;
            console.log('专利--热门搜索查询参数--' + hotSearchParam)
            switch (true) {
                case hotSearchParam == "pt_2" || hotSearchParam == "pt_3" || hotSearchParam == "pt_4":
                    param.patent_type_filter = hotSearchParam
                    break
                //-------------------------------------------
                case hotSearchParam == "ps_2" || hotSearchParam == "ps_3":
                    param.patent_status_filter = hotSearchParam
                    break;
                //--------------------------------------------
                case hotSearchParam == "pr_2" || hotSearchParam == "pr_3" || hotSearchParam == "pr_4" || hotSearchParam == "pr_5" || hotSearchParam == "pr_6" || hotSearchParam == "pr_7" || clickedItem == "pr_8":
                    param.patent_price_filter = hotSearchParam
                    break;
                default:
                    break;
            }
        }
        /**
         * 处理专利搜索页搜索框传来的参数
         */
        if (query.hasOwnProperty('search')) {
            let search = query.search;
            console.log('专利--search input查询参数--' + search)
        }
        /**
         * 处理专利搜索页历史搜索栏传来的参数
         */
        if (query.hasOwnProperty('historySearch')) {
            let historySearchItem = query.historySearch;
            console.log('专利--历史搜索查询参数--' + historySearchItem)
        }
        /**
         * 初始化数据
         */
        $$.getJSON(config.mock.url + '/patent', param, (data, status, xhr) => {
            // console.log(data)
            $$("#patent_ul").html(listTemplate({patents: data}))

        })
        //筛选栏事件
        handleFilter('c-layer-show84')
        //排序各项的点击次数，根据奇偶来判断是升序还是降序
        let p_priceRange_click_count = 0;
        let p_hot_click_count = 0;
        let p_releaseTime_click_count = 0;
        //注意不能用document作为代理否则重复绑定，
        $$('#page_patent').on('click', '.ejectItem_p', ejectItemClickEvent_tm)
        /**
         * 弹出层各项点击事件
         * @param e
         */
        function ejectItemClickEvent_tm(e) {
            // let clickedItem = this.childNodes[1].innerText;
            console.log('click-----------')
            //弹出层各项文字
            let clickedItem = $$(this).find('.item-title').text()
            //清除字符串首尾空格
            clickedItem = trim(clickedItem)
            //移除遮罩层和选中状态
            removeAllEject()
            removeAllChosen()
            //取出选中项的data-id数据
            let dataID = $$(this).data('id')
            //取出选中项的data-filter数据
            let filterArray = $$(this).data('filter').split(",")
            let selector = filterArray[0];
            let filterName = filterArray[1]
            //筛选栏根据所选条件重新赋值
            $$(selector).find('span').text(filterName)
            console.log(filterName)
            /**
             * 根据筛选条件向请求参数param中放入数据
             */
            switch (true) {
                case dataID == "pt_2" || dataID == "pt_3" || dataID == "pt_4":
                    console.log(clickedItem)
                    param.patent_type_filter = dataID
                    console.log(dataID)
                    break
                //-------------------------------------------
                case dataID == "ps_2" || dataID == "ps_3":
                    param.patent_status_filter = dataID
                    break;
                //--------------------------------------------
                case dataID == "pr_2" || dataID == "pr_3" || dataID == "pr_4" || dataID == "pr_5" || dataID == "pr_6" || dataID == "pr_7" || dataID == "pr_8":
                    param.patent_price_filter = dataID
                    break;
                case dataID == "sm_2" :
                    p_priceRange_click_count++
                    console.log(p_priceRange_click_count)
                    param._sort = "patent_releaseTime"
                    if (p_priceRange_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }
                    break;
                case  dataID == "sm_3":
                    p_hot_click_count++
                    console.log(p_hot_click_count)
                    param._sort = "patent_hot";
                    if (p_hot_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }

                    break;
                case  dataID == "sm_4":
                    p_releaseTime_click_count++
                    console.log(p_releaseTime_click_count)
                    param._sort = "patent_price"
                    if (p_releaseTime_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }
                    break;
                case dataID == "pt_1":
                    delete param["patent_type_filter"]
                    break;
                case dataID == "ps_1":
                    delete param["patent_status_filter"]
                    break;
                case dataID == "pr_1":
                    delete param["patent_price_filter"]
                    break;
                case dataID == "sm_1":
                    delete param["_sort"]
                    delete param["_order"]
                    break
            }
            //重置初始页码
            param._page = 1;
            //滚动条置顶
            $$('#p_pageContent').scrollTop(0)
            /**
             * 根据所选条件向服务器请求数据
             */
            $$.getJSON(config.mock.url + '/patent',
                param,
                (data, status, xhr) => {
                    $$("#patent_ul").html(listTemplate({patents: data}))
                    //初始页面后重置滚动事件的初始页码
                    param._page = 2
                    //总数据条数
                    let totalCount = xhr.getResponseHeader('X-Total-Count');
                    /**
                     * 根据数据条数判断是否需要添加修改preloader样式
                     */
                    if (totalCount == 0) {
                        console.log('data=0')
                        app.detachInfiniteScroll($$('#p_pageContent'))
                        if ($$('#p_pageContent').find('#p_infinite_preloader').length == 0) {
                            $$('#p_pageContent').append('<div class="infinite-scroll-preloader" id="p_infinite_preloader">对不起,没有您想要的内容</div>')
                            console.log('数据--0', 'preloader--0', '添加preloader')
                        } else {
                            $$('#p_infinite_preloader').html('对不起没有您想要的内容')
                            console.log('数据--0', 'preloader--1', '修改preloader')
                        }
                    } else if (totalCount > 0 && totalCount <= 5) {
                        app.detachInfiniteScroll($$('#p_pageContent'))
                        console.log('0<data<=5')
                        if ($$('#p_pageContent').find('#p_infinite_preloader').length !== 0) {
                            $$('#p_infinite_preloader').remove()
                            console.log('0<data<=5', '移除preloader')
                        }
                    } else {
                        //开启滚动事件
                        app.attachInfiniteScroll($$('#p_pageContent'))
                        console.log('data>5')
                        if ($$('#p_pageContent').find('#p_infinite_preloader').length == 0) {
                            $$('#p_pageContent').append('<div class="infinite-scroll-preloader" id="p_infinite_preloader"><div class="preloader"></div></div>')
                            console.log('data>5', 'preloader--0', '添加preloader')
                        } else {
                            $$('#p_infinite_preloader').html('<div class="preloader"></div>')
                        }
                    }
                })
        }

        //当前页数
        param._page = 2;
        //每页记录数
        let perCount = 10
        //总记录数
        let totalCount = 0
        //加载开关
        let loading = false
        /**
         * 无限滚动事件
         */
        $$('#p_pageContent').on('infinite', function (e) {
            //加载开关
            if (loading)
                return;
            loading = true;
            console.log('滚动param--------------------')
            //模拟一秒加载过程
            setTimeout(function () {
                loading = false
                //每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                $$.getJSON(config.mock.url + "/patent", param,
                    (data, status, xhr) => {
                        //数据总数
                        totalCount = xhr.getResponseHeader("X-Total-Count");
                        console.log(totalCount + "---" + param._page)
                        let obj_patent = {patents: data};
                        let html_pre_index = listTemplate(obj_patent)

                        $$("#patent_ul").append(html_pre_index)
                        //销毁滚动事件
                        if (param._page * perCount >= totalCount) {
                            app.detachInfiniteScroll($$('#p_pageContent'))
                            $$('#p_infinite_preloader').remove()
                            return
                        }
                        //下次滚动发送请求时，分页为下一页
                        param._page++
                    })
            }, 1000)
        })
    }
}
/**
 * 去除字符串两端空格方法
 * @param str
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 清除所有遮罩层
 */
function removeAllEject() {
    $$('#p_type_eject').removeClass('c-layer-show84')
    $$('#p_status_eject').removeClass('c-layer-show84')
    $$('#p_priceRange_eject').removeClass('c-layer-show84')
    $$('#p_sortMethod_eject').removeClass('c-layer-show84')
}
/**
 * 清除所有选中状态
 */
function removeAllChosen() {
    $$('#p_type_filter').removeClass('chosen')
    $$('#p_status_filter').removeClass('chosen')
    $$('#p_priceRange_filter').removeClass('chosen')
    $$('#p_sortMethod_filter').removeClass('chosen')
}


