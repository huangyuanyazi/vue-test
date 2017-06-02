<template>
    <div>
        <div class='c-filter'>
            <div class='c-patentType'
                 id='trademarkTypeFilter'
                 :class="{'chosen':trademarkTypeFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{trademarkType}}</span>
            </div>
            <div class='c-priceRange'
                 id='trademarkPriceRangeFilter'
                 :class="{'chosen':trademarkPriceRangeFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{trademarkPrice}}</span>
            </div>
            <div class='c-sortMethod'
                 id='trademarkSortMethodFilter'
                 :class="{'chosen':trademarkSortMethodFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{trademarkSort}}</span>
            </div>
        </div>
        <div class='c-patentType-eject'
             id='trademarkTypeEject'
             :class="{'c-layer-show84':trademarkTypeEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="trademarkType.id"
                              v-for='trademarkType in trademarkTypes'
                              @click="getParam(trademarkType)">
                    {{trademarkType.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>
        <div class='c-priceRange-eject'
             id='trademarkPriceRangeEject'
             :class="{'c-layer-show84':trademarkPriceRangeEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="trademarkPrice.id"
                              v-for='trademarkPrice in trademarkPrices'
                              @click="getParam(trademarkPrice)">
                    {{trademarkPrice.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>
        <div class='c-sortMethod-eject'
             id='trademarkSortMethodEject'
             :class="{'c-layer-show84':trademarkSortMethodEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="trademarkSort.id"
                              v-for='trademarkSort in trademarkSorts'
                              @click="getParam(trademarkSort)">
                    {{trademarkSort.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>

    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .c-filter {
        display: -webkit-flex;
        flex-direction: row;
        z-index:300;
        position: fixed;
        width: 100%;
        top: 44px;
        background: #f7f7f8;
        height: 40px;
        //筛选栏下方横线
        &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: auto;
            top: auto;
            height: 1px;
            width: 100%;
            background-color: #c4c4c4;
            display: block;
            z-index: 15;
        }
        div {
            display: flex;
            flex: 1;
            align-items: center; //交叉轴对齐方式，主轴为水平则交叉轴为垂直
            justify-content: center; //主轴对齐方式，主轴默认水平
            span {
                background: url("../asset/image/on_1.png") no-repeat right;
                padding-right: 15px;
            }
        }
        .chosen span{
            background: url("../asset/image/on_2.png") no-repeat right center;
            color: #3cb9f3;
        }
    }
    .c-patentType-eject,.c-patentStatus-eject,.c-priceRange-eject,.c-sortMethod-eject {
        position: fixed;
        background: #ffffff;
        width: 100%;
        top: -100%;
        -webkit-transition-duration: 0.4s;
        z-index: 20;
        padding:0;
    }

    .c-layer-show84 {
        top: 84px;
        &:after {
            position: fixed;
            content: "";
            width: 100%;
            height: 100%;
            display: block;
            background: rgba(0, 0, 0, 0.2);
        }
    }
    .c-margin0{
        margin:0;
    }
</style>
<script>
    export default{
        data(){
            return {
                trademarkTypes: "",
                trademarkStatuses: "",
                trademarkPrices: "",
                trademarkSorts: "",
                trademarkType: "商标类型",
                trademarkPrice: "价格范围",
                trademarkSort: "排序方式",
                param: {},
                trademarkTypeFilterIsChosen: false,
                trademarkPriceRangeFilterIsChosen: false,
                trademarkSortMethodFilterIsChosen: false,
                trademarkTypeEjectIsShow: false,
                trademarkPriceRangeEjectIsShow: false,
                trademarkSortMethodEjectIsShow: false
            }
        },
        created() {
            $$.getJSON(config.mock.url + '/trademark_type', (data, status, xhr) => {
                this.trademarkTypes = data;
            })
            $$.getJSON(config.mock.url + '/trademark_priceRange', (data, status, xhr) => {
                this.trademarkPrices = data;
            })
            $$.getJSON(config.mock.url + '/trademark_sortMethod', (data, status, xhr) => {
                this.trademarkSorts = data;
            })
        }
        ,
        methods: {
            toggleEject(e)
            {
                let id = e.currentTarget.id;
                console.log(id)
                switch (id) {
                    case 'trademarkTypeFilter':
                        if (this.trademarkTypeEjectIsShow == true) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.trademarkTypeFilterIsChosen = true;
                            this.trademarkTypeEjectIsShow = true;
                        }
                        break;
                    case 'trademarkPriceRangeFilter':
                        if (this.trademarkPriceRangeEjectIsShow) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.trademarkPriceRangeFilterIsChosen = true;
                            this.trademarkPriceRangeEjectIsShow = true;
                        }
                        break;
                    case 'trademarkSortMethodFilter':
                        if (this.trademarkSortMethodEjectIsShow) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.trademarkSortMethodFilterIsChosen = true;
                            this.trademarkSortMethodEjectIsShow = true;
                        }
                        break;
                    default:
                        break

                }
            }
            ,
            removeAllEject()
            {
                this.trademarkTypeEjectIsShow = false,
                    this.trademarkPriceRangeEjectIsShow = false,
                    this.trademarkSortMethodEjectIsShow = false
            }
            ,
            removeAllChosen()
            {
                this.trademarkTypeFilterIsChosen = false,
                    this.trademarkPriceRangeFilterIsChosen = false,
                    this.trademarkSortMethodFilterIsChosen = false
            }
            ,
            getParam(trademark){
                console.log(this.param)
                this.removeAllChosen();
                this.removeAllEject()
                let title = trademark.eject_title;
                console.log(title)
                let titleId = trademark.title_id
                console.log(titleId)
                let titlePre = trademark.title_id.split('_')[0]
                switch (titlePre) {
                    case "tt":
                        this.trademarkType = title;
                        if (titleId == 'tt_1') {
                            if (this.param.hasOwnProperty('tt_filter')) {
                                this.$delete(this.param, 'tt_filter')
                            }
                        } else {
                            this.$set(this.param, 'tt_filter', titleId)
                        }
                        break;
                    case "tp":
                        this.trademarkPrice = title;
                        if (titleId == 'tp_1') {
                            if (this.param.hasOwnProperty('tp_filter')) {
                                this.$delete(this.param, 'tp_filter')
                            }
                        } else {
                            this.$set(this.param, 'tp_filter', titleId)

                        }
                        break;
                    case "ts":
                        this.trademarkSort = title;
                        this.$set(this.param, '_order', "ASC")

                        if (titleId == 'ts_1') {
                            if (this.param.hasOwnProperty("_sort") && this.param.hasOwnProperty("_order")) {
                                this.$delete(this.param, '_sort')
                                this.$delete(this.param, '_order')

                            }
                        } else if (titleId == 'ts_2') {
                            this.$set(this.param, '_sort', "trademark_releaseTime")

                        } else if (titleId == 'ts_3') {
                            this.$set(this.param, '_sort', "trademark_hot")

                        } else {
                            this.$set(this.param, '_sort', "trademark_price")
                        }
                        break;
                }
                this.$emit('getParam', this.param)
            }

        },

    }
</script>