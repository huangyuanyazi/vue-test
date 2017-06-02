/**
 * detail.js
 * 商标详情页的相关代码
 */
export default {
    pageInit (app, page) {
        //获取传入的id参数
        let id = page.query.id
        //编译模板
        let trademarkDetailTemplate = Template7.compile($$("#trademark_detail_template").html())
        /**
         * 根据传入的id获取相应的数据
         */
        $$.getJSON(config.mock.url+"/trademark/" + id, (data, status, xhr) => {
            $$("#trademark_detail_content").html(trademarkDetailTemplate(data))
        })
        /**
         * 点击分享按钮弹出actionsheet,并给每个按钮设置了点击事件
         */
        $$('#share_trademark_detail').on('click', function () {
            console.log('点击了分享')
            var buttons = [
                {
                    text: '微信',
                    bold: true, color: "orange",
                    onClick:function () {
                        app.alert('您分享了微信')
                    }
                },
                {
                    text: '新浪',
                    bold: true, color: "green",
                    onClick:function () {
                        app.alert('您分享了新浪')
                    }
                },
                {
                    text: 'QQ',
                    bold: true, color: "purple",
                    onClick:function () {
                        app.alert('您分享了QQ')
                    }
                },
                {
                    text: '取消',
                    bold: true, color: "red"
                },
            ];
            app.actions(buttons);
        })
        /**
         * 联系卖家按钮的点击事件
         */
        $$('#trademark_detail').on('click','.c-p-tm-call',function () {
            let tel = $$(this).data('sellerTel');
            app.alert('您拨打的是卖家'+tel+'的电话')
        })

    }
}








