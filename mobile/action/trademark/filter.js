/**
 * filter.js
 * 商标首页的筛选栏点击事件
 * @param layer 弹出层样式
 */
function handleFilter(layer) {
    // let filter_map = {
    //     '.c-patentType': {
    //         eject: ".c-patentType-eject",
    //     },
    //     '#tm_type_filter': {
    //         eject: "#tm_type_filter-eject",
    //     },
    //     '#tm_priceRange_filter': {
    //         eject: "#tm_priceRange_filter-eject",
    //     },
    //     '#tm_sortMethod_filter': {
    //         eject: "#tm_sortMethod_filter-eject",
    //     },
    // };
    /**
     * 筛选栏，弹出层，弹出层参数，一一对应的关系对象
     */
    let loadData_map = {
        '#tm_type_filter': {
            param: "trademark_type",
            eject_content: "#trademark_type_ul",
            eject: "#tm_type_eject",
        },
        '#tm_priceRange_filter': {
            param: "trademark_priceRange",
            eject_content: "#trademark_priceRange_ul",
            eject: "#tm_priceRange_eject"
        },
        '#tm_sortMethod_filter': {
            param: "trademark_sortMethod",
            eject_content: "#trademark_sortMethod_ul",
            eject: "#tm_sortMethod_eject"
        },
    }
    //编译模板
    let listEject_trademarkUl = Template7.compile($$('#ejectTemplate_tm').html());
    // let listEject_trademarkPagination = Template7.compile($$('#ejectSortTemplate').html());
    // $$.getJSON('http://localhost:9093/trademark_classify?_start=0&_end=22', (data, status, xhr) => {
    //     console.log(data)
    //     $$("#trademark_classify_ul_part1").html(listEject_trademarkPagination({eject_titles: data}));
    //
    // })
    // $$.getJSON('http://localhost:9093/trademark_classify?_start=22&_end=45', (data, status, xhr) => {
    //     console.log(data)
    //     $$("#trademark_classify_ul_part2").html(listEject_trademarkPagination({eject_titles: data}));
    //
    // })
    /**
     * 根据关系对象，获取各弹出层内容，并对各点击行为作出合理响应
     */
    for (let key in loadData_map) {
        $$.getJSON(config.mock.url+'/' + loadData_map[key].param, (data, status, xhr) => {
            $$(loadData_map[key].eject_content).html(listEject_trademarkUl({eject_titles: data}));
        })
        $$(key).on('click', function (e) {
            if ($$(loadData_map[key].eject).hasClass(layer)) {
                removeAllChosen()
                removeAllEject()
                console.log('隐藏选中弹出层')
            } else {
                removeAllChosen()
                removeAllEject()
                showEject(loadData_map[key].eject)
                showChosen(key)
                console.log('显示选中弹出层')
            }
        })
    }
    /**
     * 移除所有筛选栏选中状态
     */
    function removeAllChosen() {
        // $$('.c-patentType').removeClass('chosen')
        $$('#tm_type_filter').removeClass('chosen')
        $$('#tm_priceRange_filter').removeClass('chosen')
        $$('#tm_sortMethod_filter').removeClass('chosen')
    }

    /**
     * 为所选筛选栏添加选中样式
     * @param key 所选筛选栏
     */
    function showChosen(key) {

        $$(key).addClass('chosen')
    }

    /**
     * 移除所有弹出层
     */
    function removeAllEject() {
        // $$('.c-patentType-eject').removeClass(layer)
        $$('#tm_type_eject').removeClass(layer)
        $$('#tm_priceRange_eject').removeClass(layer)
        $$('#tm_sortMethod_eject').removeClass(layer)
    }

    /**
     * 根据所点筛选栏弹出相应弹出层
     * @param eject 弹出层样式
     */
    function showEject(eject) {

        $$(eject).addClass(layer)

    }
}
export default handleFilter
        
        
        
        
        
        
