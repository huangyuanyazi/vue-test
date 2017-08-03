<template>
	<div class="c-page" ref="indexPage">
		<navbar :username="username"
				@input="input"
				@search="search"
				title="我的专利"
				:enableBack="false"
				:enableOpenSearch="enableOpenSearch"
				@closeSearch="closeSearch"
				@openSearch="openSearch"
				v-model="value"
				:enableTitle="enableTitle"
				ref="navbar"
				id="navbar"
		></navbar>
		<div class="c-loading-layer" v-if="enableLoadingLayer">
			<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
		</div>
		<div class="c-page-content" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
			 @touchend="touchEnd($event)" ref="pageContent">
			<div class="c-cards">
				<div class="c-card" v-for="(patent,index) in patents" @click="routerToDetail(patent)">
					<div class="c-card-header">
						<div class="c-first">{{patent.name | zlNameFilter}}</div>
						<div
								class="c-last">{{patent.applied_at | dateFilter}}
						</div>
					</div>
					<div class="c-card-content">
						<div class="c-card-content-inner">
							<div class="c-label">
								<div class="c-label-head"><i class="fa fa-hand-rock-o fa-2x"></i>所有权人</div>
								<div class="c-label-content">{{patent.first_holder_name | nullFilter}}</div>
							</div>
							<div class="c-label">
								<div class="c-label-head"><i class="fa fa-user-md fa-2x"></i>发明人</div>
								<div class="c-label-content">
									{{patent.first_inventor_name | nullFilter}}{{patent.other_inventor_names | nullFilter | inventorFilter}}
								</div>
							</div>
							<div class="c-label">
								<div class="c-label-head"><i class="fa fa-magnet fa-2x"></i>专利类型</div>
								
								<div class="c-label-content">{{patent.type | nullFilter}}</div>
							</div>
							<div class="c-label c-last">
								<div class="c-label-head"><i class="fa fa-refresh fa-2x"></i>审查状态</div>
								
								<div class="c-label-content">{{patent.review_status | statusFilter}}</div>
							</div>
						</div>
					</div>
					<div class="c-card-footer">
						专利号：{{patent.sn | nullFilter}}
					</div>
				</div>
			</div>
			<div class="c-no-data" v-if="enableNoData">
				没有您想要的内容
			</div>
			<div class="c-load" ref="load">
				<div class="c-up-load" v-if="enableUpLoad">上拉加载数据</div>
				<div class="c-load-more" v-if="enableLoadData">加载中&nbsp;<i class="fa fa-spinner fa-spin"></i></div>
				<div class="c-no-more" v-if="enableNoMore">没有更多数据</div>
			</div>
		
		</div>
	</div>

</template>
<style lang="less" scoped>
	.c-loading-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		height: 100px;
		width: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		z-index: 2000;
		color: #c81623;
		background: rgba(0, 0, 0, .4);
		border-radius: 10px;
		i {
			position: relative;
			z-index: 2100;
		}
	}
	
	.one-line-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.flex {
		display: -webkit-flex;
		display: flex;
	}
	
	.flex-between {
		.flex;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-align-items: center;
		align-items: center;
	}
	
	.flex-align {
		.flex;
		-webkit-align-items: center;
		align-items: center;
	}
	
	.c-label.c-last {
		border-bottom: none;
	}
	
	.c-label {
		padding: 0;
		/*margin: 10px;*/
		line-height: 44px;
		display: flex;
		margin-left: 10px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
		.c-label-head {
			display: flex;
			align-items: center;
			padding-left: 0px;
			flex-shrink: 0;
			i {
				margin-right: 5px;
			}
		}
		.c-label-content {
			margin-left: 20px;
			flex-shrink: 1;
			font-size: 15px;
			padding-right: 20px;
			.one-line-ellipsis;
		}
	}
	
	.c-card {
		/*border:1px solid #c81623;*/
		box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
		margin: 10px;
		position: relative;
		border-radius: 2px;
		font-size: 14px;
		border: 1px solid #bbb;
		&:after {
			position: absolute;
			bottom: -30px;
			left: 0;
			overflow: hidden;
			background: #efeff4;
			width: 100%;
			height: 15px;
			content: '';
			border-radius: 50%;
			box-shadow: 0 -11px 5px #efeff4;
		}
		.c-card-header, .c-card-footer {
			min-height: 44px;
			position: relative;
			padding: 10px 15px;
			box-sizing: border-box;
			
		}
		.c-card-header {
			background: #c81623;
			color: #fff;
			border-radius: 2px 2px 0 0;
			font-size: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.c-first {
				width: 80%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				text-align: center;
			}
			.c-last {
				margin-top: 5px;
				font-size: 12px;
			}
		}
		
		.c-card-content {
			position: relative;
			.c-card-content-inner {
				/*padding: 15px;*/
				padding: 15px 0;
				position: relative;
			}
		}
		.c-card-footer {
			.flex-between;
			border-radius: 0 0 2px 2px;
			color: #6d6d72;
			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				bottom: auto;
				right: auto;
				height: 1px;
				width: 100%;
				background-color: #c8c7cc;
				display: block;
				z-index: 15;
			}
		}
	}
	
	.c-page {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #efeff4;
		-webkit-transform: translate3d(0, 0, 0); //触发GPU加速
		transform: translate3d(0, 0, 0);
		.c-page-content {
			overflow: auto;
			-webkit-overflow-scrolling: touch; // 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。
			box-sizing: border-box;
			height: 100%;
			position: relative;
			z-index: 1;
			padding-top: 44px;
			.c-no-data, .c-load {
				color: #6d6d72;
				position: relative;
				font-size: 20px;
			}
			.c-no-data {
				text-align: center;
			}
			.c-load {
				position: relative;
				.c-load-more, .c-no-more, .c-up-load {
					text-align: center;
					line-height: 44px;
				}
			}
			
		}
	}
</style>
<script>
    import navbar from './navbar.vue'
    export default{
        name: 'PatentIndex',
        components: {
            navbar
        },
        data(){
            return {
                value: '',//搜索框输入的内容
                username: '',//用户名
                //-----------------搜索栏与标题栏切换控制
                enableTitle: true,//控制标题的显示
                enableOpenSearch: true,//控制搜索图标的显示
                //-----------------状态显示控制
                enableNoData: false,//控制搜索内容无返回数据的显示状态‘没有您想要的内容’
                enableLoadData: false,//控制‘加载中。。。’加载状态
                enableNoMore: false,//控制‘没有更多数据’的显示
                enableLoadingLayer: false,
                enableUpLoad: false,
                //-----------------发送请求时用到数据
                totalCount: 0,//请求数据返回的总记录条数
                routeParam: {},//请求参数
                perPage: 3,//每一页数据条数
                patents: [],//列表数据
                //------------------上拉时的事件控制
                touching: true,//控制触摸
                loading: false,//说明是否正在加载
                allFinish: false,//说明是否加载完毕
            }
        },
        methods: {
            touchStart(e){
                this.touching = true;
                console.log('touchStart')
                if (this.loading || this.allFinish || (this.totalCount <= this.perPage)) {
                    return;
                }
            },
            touchMove(e){
                if (!this.touching) {
                    return;
                }
                if (this.loading || this.allFinish || (this.totalCount <= this.perPage)) {
                    return;
                }
                console.log('touchMove')
//                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
//                if (diff > 0) e.preventDefault()
            },
            touchEnd(e){
                if (this.loading || this.allFinish || (this.totalCount <= this.perPage)) {
                    return;
                }
                console.log('touchEnd')
                this.loading = false
                this.touching = false
//                //用于判断滑动是否在原地 ----begin
//                let endX = e.changedTouches[0].pageX,
//                    endY = e.changedTouches[0].pageY,
//                    dy = this.startY - endY,
//                    dx = endX - this.startX;
//
//                //如果滑动距离太短
//                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
//                    console.log("滑动距离太短")
//                    return;
//                }

                let outerHeight = this.$el.clientHeight,
                    innerHeight = this.$el.querySelector('.c-cards').clientHeight,
                    scrollTop = this.$el.querySelector('.c-page-content').scrollTop,
                    bottom = innerHeight - outerHeight - scrollTop;
                this.enableUpLoad = true
                if (bottom < 0) {
                    this.enableUpLoad = false
                    this.enableLoadData = true
                    this.onInfinite();
                }
            }
            ,
            onInfinite(){
                console.log('onInfinite')
                if (this.loading) {
                    return;
                }
                this.loading = true;
                console.log('infinite--routeParam--', this.routeParam)
                this.$ajax.get(config.api.url + '/cs-patents', {
                    params: this.routeParam
                }).then((response) => {
                    this.loading = false;
                    console.log(response.data)
                    console.log('infiniteData', response.data)
//                    for (let item of response.data) {
//                        this.patents.push(item)
//                    }
                    this.patents.push(...response.data)
                    this.enableLoadData = false
                    console.log('infinite--page--', this.routeParam.page)
                    console.log('infinite--per-page--', this.perPage)
                    console.log('infinite--totalCount--', this.totalCount)
                    if (this.routeParam.page * this.perPage >= this.totalCount) {
                        console.log('infinite--加载完成')
                        this.enableLoadData = false;
                        this.allFinish = true;
                        this.enableNoMore = true;
                        return;
                    }
                    this.routeParam.page++;
                }).catch(erro => {
                    console.log(erro)
                });
            },
            routerToDetail(patent)
            {
                this.$router.push(`/patent-detail/${patent.id}`)
            }
            ,
            /**
             * 点击搜索按钮事件
             */
            openSearch()
            {
                this.enableOpenSearch = false
                this.enableTitle = false
            }
            ,
            /**
             * 点击取消按钮事件
             */
            closeSearch()
            {
                this.enableOpenSearch = true;
                this.enableTitle = true;
                this.enableNoData = false
                /**
                 * 删除筛选条件重新获取列表
                 */
//                if (this.routeParam.sn) {
//                    this.$delete(this.routeParam, 'sn')
//                }
                if (this.routeParam.q) {
                    this.$delete(this.routeParam, 'q')
                }
                this.enableLoadingLayer = true
                this.initData()
                this.initLoadStatus()
                //滚动条回到顶端
                this.$refs.pageContent.scrollTop = 0;

            }
            ,
            input()
            {
                /**
                 * 如果搜索框内无内容，删除筛选条件重新获取列表
                 */
                if (this.value.length <= 0) {
//                    if (this.routeParam.sn) {
//                        this.$delete(this.routeParam, 'sn')
//                    }
                    if (this.routeParam.q) {
                        this.$delete(this.routeParam, 'q')
                    }
                    this.enableLoadingLayer = true
                    this.initData()
                    this.initLoadStatus()
                    this.$refs.pageContent.scrollTop = 0;
                    console.log('input--this.$route.params', this.$route.params)
                }
            }
            ,
            search()
            {
                this.routeParam.page = 1
                console.log('search', this.routeParam)
//                let reg = /^\d+$/;
//                /**
//                 * 如果搜索框内输入的是纯数字，默认为搜索专利号，否则默认为搜索专利名
//                 */
//                if (reg.test(this.value) == true) {
//                    if (this.routeParam.q) {
//                        this.$delete(this.routeParam, 'q')
//                    }
//                    this.routeParam.sn = `${this.value}`
//                } else {
//                    if (this.routeParam.sn) {
//                        this.$delete(this.routeParam, 'sn')
//                    }
//                    this.routeParam.q = `${this.value}`;
//                }
                this.routeParam.q = `${this.value}`;
                this.enableLoadingLayer = true
                this.initData()
                this.$refs.pageContent.scrollTop = 0;
                //触发搜索框失焦
                document.activeElement.blur()
            }
            ,
            /**
             * 初始化加载状态
             */
            initLoadStatus(){
                if (this.totalCount <= this.perPage) {
                    this.allFinish = true
                    this.enableLoadData = false
                    this.enableNoMore = false
                } else {
                    this.allFinish = false
                    this.enableLoadData = true
                    this.enableNoMore = false
                }
            },
            /**
             * 切换用户
             */
            switchUser()
            {
                this.$router.push('/login')
            }
            ,
            /**
             * 初始化数据
             */
            initData(){
                this.$set(this.routeParam, 'per-page', 3)
                this.$set(this.routeParam, 'page', 1)
                console.log('initData--param--', this.routeParam)
                this.$ajax.get(config.api.url + '/cs-patents', {
                    params: this.routeParam
                }).then(response => {
                    console.log('initData--data--', response.data)
                    this.patents = response.data
                    this.totalCount = response.headers['x-pagination-total-count']
                    this.routeParam.page = 2
                    this.enableLoadData = false
                    this.enableLoadingLayer = false

                })

            }

        }
        ,
        created()
        {
            this.enableLoadingLayer = true
            this.username = this.$route.params.username;
            this.routeParam = this.$route.params;
            this.initData()
        }
        ,
        filters: {
            //过滤返回null的字段，显示‘无’
            nullFilter(value){
                if (value) {
                    return value
                } else {
                    return "无"
                }
            },
            //专利名为null时显示‘专利名：无’
            zlNameFilter(value){
                if (value) {
                    return value
                } else {
                    return '专利名：无'
                }
            },
            //时间戳的格式转换
            dateFilter(value){
                if (value) {
                    let newDate = new Date();
                    let time = Number(value)
                    newDate.setTime(time * 1000)
                    return newDate.toLocaleDateString()
                }
//				console.log(typeof value)
//                return new Date.setTime(Number(value) * 1000).toLocaleString()
            },
            //发明人的过滤
            inventorFilter(value){
                if (value == '无') {
                    return ''
                } else {
                    return '、' + value
                }
            },
            //审查状态过滤
            statusFilter(value){
                if (value) {
                    return value.status
                } else {
                    return '无'
                }
            }
        },
        watch: {
//            patents: {
//                handler(oldValue, newValue){
//                    console.log('watch--patents--', this.patents)
//                    if (this.patents.length > 0) {
//                        this.enableNoData = false;
//                    } else {
//                        this.enableNoData = true;
//                        this.enableNoMore = false;
//                    }
//                },
//                deep: true
//            },
            /**
             * 根据发送请求返回的总数据条数的变化，控制加载状态
             */
            totalCount(oldValue, newValue){
                console.log('totalCount--', this.totalCount)
                if (this.totalCount <= this.perPage) {
                    this.allFinish = true;
                    this.enableNoMore = false
                    this.enableNoData = false;
                    if (this.totalCount <= 0) {
                        this.enableNoData = true;
                    }
                } else {
                    this.enableNoData = false;
                    this.allFinish = false
                    this.enableNoMore = false
                }
            },
        }
    }
</script>