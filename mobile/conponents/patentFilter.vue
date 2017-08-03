<template>
	<div>
		<div class='c-filter'>
			<div class='c-patentType'
				 id='patentTypeFilter'
				 :class="{'chosen':patentTypeFilterIsChosen}"
				 @click="toggleEject('this.patentTypeFilterIsChosen','this.patentTypeEjectIsShow')">
				<span class=''>{{patentType}}</span>
			</div>
			<div class='c-patentStatus'
				 id='patentStatusFilter'
				 :class="{'chosen':patentStatusFilterIsChosen}"
				 @click="toggleEject('this.patentStatusFilterIsChosen','this.patentStatusEjectIsShow')">
				<span class=''>{{patentStatus}}</span>
			</div>
			<div class='c-priceRange'
				 id='patentPriceRangeFilter'
				 :class="{'chosen':patentPriceRangeFilterIsChosen}"
				 @click="toggleEject('this.patentPriceRangeFilterIsChosen','this.patentPriceRangeEjectIsShow')">
				<span class=''>{{patentPrice}}</span>
			</div>
			<div class='c-sortMethod'
				 id='patentSortMethodFilter'
				 :class="{'chosen':patentSortMethodFilterIsChosen}"
				 @click="toggleEject('this.patentSortMethodFilterIsChosen','this.patentSortMethodEjectIsShow')">
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
							  @click="getParam(patentType,'this.patentType')">
					{{patentType.ejectTitle}}
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
							  @click="getParam(patentStatus,'this.patentStatus')">
					{{patentStatus.ejectTitle}}
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
							  @click="getParam(patentPrice,'this.patentPrice')">
					{{patentPrice.ejectTitle}}
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
							  @click="getParam(patentSort,'this.patentSort')">
					{{patentSort.ejectTitle}}
				</f7-list-item>
			</f7-list>
		</div>
	
	</div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
	.c-filter {
		display: -webkit-flex;
		flex-direction: row;
		z-index: 300;
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
		.chosen span {
			background: url("../asset/image/on_2.png") no-repeat right center;
			color: #3cb9f3;
		}
	}
	
	.c-patentType-eject, .c-patentStatus-eject, .c-priceRange-eject, .c-sortMethod-eject {
		position: fixed;
		background: #ffffff;
		width: 100%;
		top: -100%;
		-webkit-transition-duration: 0.4s;
		z-index: 20;
		padding: 0;
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
	
	.c-margin0 {
		margin: 0;
	}
</style>
<script>
    import {patentTypeData, patentStatusData, patentPriceRangeData, patentSortMethodData} from '../db/patent.js'
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
                patentSortMethodEjectIsShow: false,
            }
        },
        created() {
            this.patentTypes = patentTypeData;
            this.patentStatuses = patentStatusData;
            this.patentPrices = patentPriceRangeData;
            this.patentSorts = patentSortMethodData;
        }
        ,
        methods: {
            toggleEject(filter, eject)
            {
                if (eval(eject) == true) {
                    this.removeAllEject()
                    this.removeAllChosen()
                } else {
                    this.removeAllEject()
                    this.removeAllChosen()
                    eval(filter + '=true')
                    eval(eject + '=true')
                }
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

//                let id = e.currentTarget.id;
//                console.log(id)
//                switch (id) {
//                    case 'patentTypeFilter':
//                        if (this.patentTypeEjectIsShow == true) {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                        } else {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                            this.patentTypeFilterIsChosen = true;
//                            this.patentTypeEjectIsShow = true;
//                        }
//                        break;
//                    case 'patentStatusFilter':
//                        if (this.patentStatusEjectIsShow == true) {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                        } else {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                            this.patentStatusFilterIsChosen = true;
//                            this.patentStatusEjectIsShow = true;
//                        }
//                        break;
//                    case 'patentPriceRangeFilter':
//                        if (this.patentPriceRangeEjectIsShow == true) {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                        } else {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                            this.patentPriceRangeFilterIsChosen = true;
//                            this.patentPriceRangeEjectIsShow = true;
//                        }
//                        break;
//                    case 'patentSortMethodFilter':
//                        if (this.patentSortMethodEjectIsShow == true) {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                        } else {
//                            this.removeAllChosen();
//                            this.removeAllEject()
//                            this.patentSortMethodFilterIsChosen = true;
//                            this.patentSortMethodEjectIsShow = true;
//                        }
//                        break;
//                    default:
//                        break
//
//                }
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
            getParam(patent, filter){
                console.log(this.param)
                this.removeAllChosen();
                this.removeAllEject()
                eval(filter + '=' + '"' + patent.filterShow + '"')
                let filterId = patent.filterId;
                let filterData = patent.filterData;
                switch (filterId) {
                    case 'patentType':
                        this.$set(this.param, "attributes:type", filterData)
                        break
                    case 'patentStatus':
                        this.$set(this.param, "attributes:status", filterData)
                        break;
                    case 'patentPriceRange':
                        this.$set(this.param, "price", filterData)
                        break;
                    case 'patentSort':
                        this.$set(this.param, "sort", filterData)
                        break;
                    case 'patentSortDefault':
                        this.$delete(this.param, 'sort')
                        break;
                    default:
                        break;
                }
                this.$emit('getParam', this.param)
            }

        },

    }
</script>