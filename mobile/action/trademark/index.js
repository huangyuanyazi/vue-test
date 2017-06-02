/**
 * index.js
 * 商标首页的相关js代码
 */
//导入filter.js中方法
import handleFilter from './filter.js'

export default {
    pageInit (app, page) {
        //模板编译
        let listTemplate = Template7.compile($$("#trademark_template").html())
        //请求参数
        let param = {_page: 1, _limit: 5}
        let query = page.query
        /**
         * 处理从搜索页面分类栏传入的参数
         */
        if (query.hasOwnProperty('sort')) {
            let sortParam = query.sort;
            param.trademark_sort = sortParam;
            console.log('商标--分类查询参数--'+sortParam)
        }
        /**
         * 处理从搜索页面搜索栏传入的参数
         */
        if(query.hasOwnProperty('search')){
            let search = query.search;
            console.log('商标--search input查询参数--'+search)
        }
        /**
         * 页面初始化
         */
        $$.getJSON(config.mock.url+"/trademark", param, (data, status, xhr) => {
            $$("#trademark_ul").html(listTemplate({trademark: data}));
            let totalCount = xhr.getResponseHeader('X-Total-Count')
            if (totalCount <= 5) {
                $$('#tm_infinite_preloader').remove()
            }
        })
        //筛选栏
        handleFilter('c-layer-show84')
        //筛选栏的原始数据
        const tmTpText_0 = $$("#tm_type_filter span").text()
        const tmPrText_0 = $$("#tm_priceRange_filter span").text()
        const tmSmText_0 = $$("#tm_sortMethod_filter span").text()
        //排序各项的点击次数，根据奇偶来判断是升序还是降序
        let tm_priceRange_click_count = 0;
        let tm_hot_click_count = 0;
        let tm_releaseTime_click_count = 0;
        /**
         * 筛选栏各项点击事件
         */
        $$('#page_trademark').on('click', '.ejectItem_tm', function (e) {
            //清除各遮罩层和筛选栏的选中状态
            removeAllEject()
            removeAllChosen()
            //遮罩层各项文字
            let clickedItem = $$(this).find('.item-title').text();
            //清除字符串首尾空格
            clickedItem = trim(clickedItem);
            //取出所点击的各项data属性中的值
            let dataID = $$(this).data('id');
            /**
             * 判断点击项的dataID,修改筛选栏文字，把dataID作为筛选条件加入到param参数
             */
            switch (true) {
                case dataID == 'tt_2' || dataID == 'tt_3':
                    $$('#tm_type_filter span').text(clickedItem)
                    param.tt_filter = dataID
                    break;
                case dataID == 'tp_2' || dataID == 'tp_3' || dataID == 'tp_4' || dataID == 'tp_5' || dataID == 'tp_6' || dataID == 'tp_7' || dataID == 'tp_8':
                    $$('#tm_priceRange_filter span').text(clickedItem)
                    param.tp_filter = dataID
                    break;
                case dataID == 'ts_2' :
                    $$('#tm_sortMethod_filter span').text(clickedItem);
                    tm_priceRange_click_count++
                    param._sort = "trademark_registDate"
                    if (tm_priceRange_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }
                    break;
                case dataID == 'ts_3' :
                    $$('#tm_sortMethod_filter span').text(clickedItem);
                    tm_hot_click_count++
                    param._sort = "hot"
                    if (tm_hot_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }
                    break;
                case  dataID == 'ts_4':
                    $$('#tm_sortMethod_filter span').text(clickedItem);
                    tm_releaseTime_click_count++
                    param._sort = "trademark_price"
                    if (tm_releaseTime_click_count % 2 == 0) {
                        param._order = "DESC";
                    } else {
                        param._order = "ASC";
                    }
                    break;
                case dataID == 'tt_1':
                    $$("#tm_type_filter span").text(tmTpText_0);
                    delete param['tt_filter']
                    break;
                case dataID == 'tp_1':
                    $$('.c-priceRange span').text(tmPrText_0);
                    delete param['tp_filter']
                    break;
                case dataID == 'ts_1':
                    $$('#tm_sortMethod_filter span').text(tmSmText_0);
                    delete param['_sort']
                    delete param['_order']
                    break;
                default:
                    break;
            }
            //初始化_page
            param._page = 1;
            /**
             * 根据所选条件向服务器请求数据
             */
            $$.getJSON(config.mock.url+"/trademark", param, (data, status, xhr) => {
                //修改_page,用在滚动事件中
                param._page = 2;
                //数据总条数
                let totalCount = xhr.getResponseHeader('X-Total-Count')
                console.log('总数------' + totalCount)
                $$("#trademark_ul").html(listTemplate({trademark: data}));
                //滚动容器置顶
                $$('#tm_pageContent').scrollTop(0)
                /**
                 * 根据数据条数判断是否需要添加修改preloader样式
                 */
                if (totalCount == 0) {
                    console.log('data=0')
                    //销毁滚动事件
                    app.detachInfiniteScroll($$('#tm_pageContent'))
                    if ($$('#tm_pageContent').find('#tm_infinite_preloader').length == 0) {
                        $$('#tm_pageContent').append('<div class="infinite-scroll-preloader" id="tm_infinite_preloader">对不起,没有您想要的内容</div>')
                        console.log('数据--0', 'preloader--0', '添加preloader')
                    } else {
                        $$('#tm_infinite_preloader').html('对不起,没有您想要的内容')
                        console.log('数据--0', 'preloader--1', '修改preloader')
                    }
                } else if (totalCount > 0 && totalCount <= 5) {
                    //销毁滚动事件
                    app.detachInfiniteScroll($$('#tm_pageContent'))
                    console.log('0<data<=5')
                    if ($$('#tm_pageContent').find('#tm_infinite_preloader').length !== 0) {
                        $$('#tm_infinite_preloader').remove()
                        console.log('0<data<=5', '移除preloader')
                    }
                } else {
                    console.log('data>5')
                    //开启滚动事件
                    app.attachInfiniteScroll($$('#tm_pageContent'))
                    if ($$('#tm_pageContent').find('#tm_infinite_preloader').length == 0) {
                        $$('#tm_pageContent').append('<div class="infinite-scroll-preloader" id="tm_infinite_preloader"><div class="preloader"></div></div>')
                        console.log('data>5', 'preloader--0', '添加preloader')
                    } else {
                        $$('#tm_infinite_preloader').html('<div class="preloader"></div>')
                    }
                }


            })
        })
        //加载与否的开关
        let loading = false;
        //初始化页面时，滚动事件的初始_page
        param._page = 2;
        //每次加载的条数
        let perCount = 5;
        //数据总量
        let totalCount = 0;
        /**
         * 无限滚动事件
         */
        $$('#tm_pageContent').on('infinite', function (e) {
            //如果正在加载结束滚动事件
            if (loading)
                return;
            //正在加载
            loading = true;
            //模拟一秒加载过程
            setTimeout(function () {
                //加载结束
                loading = false;
                /**
                 * 每次滚动发送新的请求，动态参数为_page,此为总数据的分页数
                 */
                $$.getJSON(config.mock.url+"/trademark", param, (data, status, xhr) => {
                    totalCount = xhr.getResponseHeader('X-Total-Count')
                    console.log(totalCount + '----' + param._page)
                    let obj_patent = {trademark: data}
                    let html_pre_index = listTemplate(obj_patent);
                    $$("#trademark_ul").append(html_pre_index);
                    //如果加载的总数据大于等于回调数据时，销毁滚动事件和清除preloader样式
                    if (param._page * perCount >= totalCount) {
                        app.detachInfiniteScroll($$('#tm_pageContent'))
                        $$('#tm_infinite_preloader').remove()
                        return;
                    }
                    //下次滚动发送请求时，分页为下一页
                    param._page++
                })
            }, 1000)
        })
    }
}
/**
 * 去除字符串两端空格
 * @param str
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/, "")
}
/**
 * 清除所有遮罩层
 */
function removeAllEject() {
    $$('#tm_type_eject').removeClass('c-layer-show84')
    $$('#tm_priceRange_eject').removeClass('c-layer-show84')
    $$('#tm_sortMethod_eject').removeClass('c-layer-show84')
}
/**
 * 清除所有选中状态
 */
function removeAllChosen() {
    $$('#tm_type_filter').removeClass('chosen')
    $$('#tm_priceRange_filter').removeClass('chosen')
    $$('#tm_sortMethod_filter').removeClass('chosen')
}
