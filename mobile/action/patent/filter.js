/**
 * filter.js
 * 专利首页筛选栏的点击方法
 * @param layer 弹出层样式
 */
function handleFilter(layer) {
    /**
     * 筛选栏，弹出层，弹出层参数，一一对应的关系对象
     */
    var filter_map = {
        '#p_type_filter': {
            param: "patentType",
            eject: "#p_type_eject",
            eject_content: "#patentType_ul"
        },
        '#p_status_filter': {
            param: "patentStatus",
            eject: "#p_status_eject",
            eject_content: "#patentStatus_ul"
        },
        '#p_priceRange_filter': {
            param: "priceRange",
            eject: "#p_priceRange_eject",
            eject_content: "#priceRange_ul"
        },
        '#p_sortMethod_filter': {
            param: "sortMethod",
            eject: "#p_sortMethod_eject",
            eject_content: "#sortMethod_ul"
        },
    };
    //编译模板
    let listEject_patent = Template7.compile($$('#ejectTemplate_p').html());
    /**
     * 根据关系对象，获取各弹出层内容，并对各点击行为作出合理响应
     */
    for (let key in filter_map) {
        $$.getJSON(config.mock.url + '/' + filter_map[key].param, (data, status, xhr) => {
            $$(filter_map[key].eject_content).html(listEject_patent({eject_titles: data}));
            $$(key).on('click', function (e) {
                if ($$(filter_map[key].eject).hasClass(layer)) {
                    removeAllChosen()
                    removeAllEject()
                    console.log('隐藏选中弹出层')
                } else {
                    removeAllChosen()
                    removeAllEject()
                    showEject(filter_map[key].eject)
                    showChosen(key)
                    console.log('显示选中弹出层')

                }
            })
        })
    }
    /**
     * 移除所有筛选栏选中状态
     */
    function removeAllChosen() {
        $$('#p_type_filter').removeClass('chosen')
        $$('#p_status_filter').removeClass('chosen')
        $$('#p_priceRange_filter').removeClass('chosen')
        $$('#p_sortMethod_filter').removeClass('chosen')
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
        $$('#p_type_eject').removeClass(layer)
        $$('#p_status_eject').removeClass(layer)
        $$('#p_priceRange_eject').removeClass(layer)
        $$('#p_sortMethod_eject').removeClass(layer)
    }

    /**
     * 根据所点筛选层弹出相应弹出层
     * @param eject 弹出层样式
     */
    function showEject(eject) {

        $$(eject).addClass(layer)

    }
}
export default handleFilter