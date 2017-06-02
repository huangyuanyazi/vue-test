<template>
    <div>
        <div class='c-filter'>
            <div class='c-patentType'
                 id='patentTypeFilter'
                 :class="{'chosen':patentTypeFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{patentType}}</span>
            </div>
            <div class='c-patentStatus'
                 id='patentStatusFilter'
                 :class="{'chosen':patentStatusFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{patentStatus}}</span>
            </div>
            <div class='c-priceRange'
                 id='patentPriceRangeFilter'
                 :class="{'chosen':patentPriceRangeFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{patentPrice}}</span>
            </div>
            <div class='c-sortMethod'
                 id='patentSortMethodFilter'
                 :class="{'chosen':patentSortMethodFilterIsChosen}"
                 @click="toggleEject">
                <span class=''>{{patentSort}}</span>
            </div>
        </div>
        <div class='c-patentType-eject'
             id='patentTypeEject'
             :class="{'c-layer-show84':patentTypeEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="patentType.id"
                              v-for='patentType in patentTypes'
                              @click="getParam(patentType)">
                    {{patentType.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>
        <div class='c-patentStatus-eject'
             id='patentStatusEject'
             :class="{'c-layer-show84':patentStatusEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="patentStatus.id"
                              v-for='patentStatus in patentStatuses'
                              @click="getParam(patentStatus)">
                    {{patentStatus.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>
        <div class='c-priceRange-eject'
             id='patentPriceRangeEject'
             :class="{'c-layer-show84':patentPriceRangeEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="patentPrice.id"
                              v-for='patentPrice in patentPrices'
                              @click="getParam(patentPrice)">
                    {{patentPrice.eject_title}}
                </f7-list-item>
            </f7-list>
        </div>
        <div class='c-sortMethod-eject'
             id='patentSortMethodEject'
             :class="{'c-layer-show84':patentSortMethodEjectIsShow}">
            <f7-list class='c-margin0'>
                <f7-list-item class='ejectItem_p'
                              :key="patentSort.id"
                              v-for='patentSort in patentSorts'
                              @click="getParam(patentSort)">
                    {{patentSort.eject_title}}
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
                patentTypes: "",
                patentStatuses: "",
                patentPrices: "",
                patentSorts: "",
                patentType: "专利类型",
                patentStatus: "专利状态",
                patentPrice: "价格范围",
                patentSort: "排序方式",
                param: {},
                patentTypeFilterIsChosen: false,
                patentStatusFilterIsChosen: false,
                patentPriceRangeFilterIsChosen: false,
                patentSortMethodFilterIsChosen: false,
                patentTypeEjectIsShow: false,
                patentStatusEjectIsShow: false,
                patentPriceRangeEjectIsShow: false,
                patentSortMethodEjectIsShow: false
            }
        },
        created() {
            $$.getJSON(config.mock.url + '/patentType', (data, status, xhr) => {
                this.patentTypes = data;
            })
            $$.getJSON(config.mock.url + '/patentStatus', (data, status, xhr) => {
                this.patentStatuses = data;
            })
            $$.getJSON(config.mock.url + '/priceRange', (data, status, xhr) => {
                this.patentPrices = data;
            })
            $$.getJSON(config.mock.url + '/sortMethod', (data, status, xhr) => {
                this.patentSorts = data;
            })
        }
        ,
        methods: {
            toggleEject(e)
            {
//                console.log(filter, eject)
//                if (eject == true) {
//                    this.removeAllEject()
//                    this.removeAllChosen()
//                } else {
//                    this.removeAllEject()
//                    this.removeAllChosen()
//                    this.showChosen(filter)
//                    this.showEject(eject)
//                    console.log(this.patentTypeFilterIsChosen)
//                }
                let id = e.currentTarget.id;
                console.log(id)
                switch (id) {
                    case 'patentTypeFilter':
                        if (this.patentTypeEjectIsShow == true) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.patentTypeFilterIsChosen = true;
                            this.patentTypeEjectIsShow = true;
                        }
                        break;
                    case 'patentStatusFilter':
                        if (this.patentStatusEjectIsShow == true) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.patentStatusFilterIsChosen = true;
                            this.patentStatusEjectIsShow = true;
                        }
                        break;
                    case 'patentPriceRangeFilter':
                        if (this.patentPriceRangeEjectIsShow == true) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.patentPriceRangeFilterIsChosen = true;
                            this.patentPriceRangeEjectIsShow = true;
                        }
                        break;
                    case 'patentSortMethodFilter':
                        if (this.patentSortMethodEjectIsShow == true) {
                            this.removeAllChosen();
                            this.removeAllEject()
                        } else {
                            this.removeAllChosen();
                            this.removeAllEject()
                            this.patentSortMethodFilterIsChosen = true;
                            this.patentSortMethodEjectIsShow = true;
                        }
                        break;
                    default:
                        break

                }
            }
            ,
            removeAllEject()
            {
                this.patentTypeEjectIsShow = false,
                    this.patentStatusEjectIsShow = false,
                    this.patentPriceRangeEjectIsShow = false,
                    this.patentSortMethodEjectIsShow = false
            }
            ,
            removeAllChosen()
            {
                this.patentTypeFilterIsChosen = false,
                    this.patentStatusFilterIsChosen = false,
                    this.patentPriceRangeFilterIsChosen = false,
                    this.patentSortMethodFilterIsChosen = false
            }
            ,
            getParam(patent){
                console.log(this.param)
                this.removeAllChosen();
                this.removeAllEject()
                let title = patent.filter_show.split(',')[1]
                console.log(title)
                let titleId = patent.title_id
                console.log(titleId)
                let titlePre = patent.title_id.split('_')[0]
                switch (titlePre) {
                    case "pt":
                        this.patentType = title;
                        if (titleId == 'pt_1') {
                            if (this.param.hasOwnProperty('patent_type_filter')) {
                                this.$delete(this.param, 'patent_type_filter')
                            }
                        } else {
                            this.$set(this.param, 'patent_type_filter', titleId)
                        }
                        break;
                    case "ps":
                        this.patentStatus = title;
                        if (titleId == 'ps_1') {
                            if (this.param.hasOwnProperty('patent_status_filter')) {
                                this.$delete(this.param, 'patent_status_filter')

                            }
                        } else {
                            this.$set(this.param, 'patent_status_filter', titleId)

                        }
                        break;
                    case "pr":
                        this.patentPrice = title;
                        if (titleId == 'pr_1') {
                            if (this.param.hasOwnProperty('patent_price_filter')) {
                                this.$delete(this.param, 'patent_price_filter')
                            }
                        } else {
                            this.$set(this.param, 'patent_price_filter', titleId)

                        }
                        break;
                    case "sm":
                        this.patentSort = title;
                        this.$set(this.param, '_order', "ASC")

                        if (titleId == 'sm_1') {
                            if (this.param.hasOwnProperty("_sort") && this.param.hasOwnProperty("_order")) {
                                this.$delete(this.param, '_sort')
                                this.$delete(this.param, '_order')

                            }
                        } else if (titleId == 'sm_2') {
                            this.$set(this.param, '_sort', "patent_releaseTime")

                        } else if (titleId == 'sm_3') {
                            this.$set(this.param, '_sort', "patent_hot")

                        } else {
                            this.$set(this.param, '_sort', "patent_price")
                        }
                        break;
                }
                this.$emit('getParam', this.param)
            }

        },

    }
</script>