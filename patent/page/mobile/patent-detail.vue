<template>
	<div class="c-page">
		<navbar title="专利详情"
				:enableOpenSearch="false"
				:enableBack="true"
				:enableTitle="true"
				:username="username"
		></navbar>
		<div class="c-page-content">
			<div class="c-content-header">
				基本信息
			</div>
			<div class="c-content-block c-inset">
				<div class="c-content-block-inner">
					<div class="c-label">
						<div class="c-label-head c-short">审查状态</div>
						<div class="c-label-content c-short">{{patent.review_status | statusFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head c-short">专利号</div>
						<div class="c-label-content c-short">{{patent.sn | nullFilter}}</div>
					</div>
					<div class="c-label c-last">
						<div class="c-label-head c-short">专利名称</div>
						<div class="c-label-content c-short">{{patent.name | nullFilter}}</div>
					</div>
				</div>
			</div>
			<div class="c-content-header">
				联系人
			</div>
			<div class="c-content-block c-inset">
				<div class="c-content-block-inner">
					<div class="c-label">
						<div class="c-label-head"><i class="fa fa-user-circle"></i>姓名</div>
						<div class="c-label-content">{{patent.contact | nullFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head"><i class="fa fa-phone-square"></i>手机</div>
						<div class="c-label-content">{{patent.mobile | nullFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head"><i class="fa fa-envelope-o"></i>邮箱</div>
						<div class="c-label-content">{{patent.email | nullFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head"><i class="fa fa-qq"></i>qq号</div>
						<div class="c-label-content">{{patent.qq | nullFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head"><i class="fa fa-weixin"></i>微信</div>
						<div class="c-label-content">{{patent.weixin | nullFilter}}</div>
					</div>
					<div class="c-label c-last">
						<div class="c-label-head"><i class="fa fa-address-book-o"></i>证书接收地址</div>
						<div class="c-label-content">{{patent.address | nullFilter}}</div>
					</div>
				
				</div>
			</div>
			<div class="c-content-header">
				发明人
			</div>
			<div class="c-content-block c-inset">
				<div class="c-content-block-inner">
					<div class="c-label ">
						<div class="c-label-head c-short">第一发明人姓名</div>
						<div class="c-label-content c-short">{{patent.first_inventor_name | nullFilter}}</div>
					</div>
					<div class="c-label">
						<div class="c-label-head c-short">第一发明人身份证</div>
						<div class="c-label-content c-short">{{patent.first_inventor_id | nullFilter}}</div>
					</div>
					<div class="c-label c-last" v-if="enableOtherInventor">
						<div class="c-label-head c-short">其他发明人姓名</div>
						<div class="c-label-content c-short">{{patent.other_inventor_names}}</div>
					</div>
				</div>
			</div>
			<div class="c-content-header">
				专利权人
			</div>
			<div class="c-content-block c-inset">
				
				<div class="c-content-block-inner">
					<div class="c-content-inner-header">
						第一专利权人
					</div>
					<div class="c-item">
						<div class="c-label c-item-first">
							<div class="c-label-head c-short">姓名</div>
							<div class="c-label-content c-short">{{patent.first_holder_name | nullFilter}}</div>
						</div>
						<div class="c-label">
							<div class="c-label-head c-short">身份证</div>
							<div class="c-label-content c-short">{{patent.first_holder_id | nullFilter}}</div>
						</div>
						<div class="c-label">
							<div class="c-label-head c-short">邮编</div>
							<div class="c-label-content c-short">{{patent.first_holder_zip_code | nullFilter}}</div>
						</div>
						<div class="c-label c-last">
							<div class="c-label-head c-short">地址</div>
							<div class="c-label-content c-short">{{patent.first_holder_address | nullFilter}}</div>
						</div>
					
					</div>
					<div v-for="(holder,index) in patent.other_holders" v-if="enableOtherHolders">
						<div class="c-content-inner-header">
							第{{index | holderNumberFilter}}专利权人
						</div>
						<div class="c-item">
							<div class="c-label ">
								<div class="c-label-head c-short">姓名</div>
								<div class="c-label-content c-short">{{holder.name}}
								</div>
							</div>
							<div class="c-label c-last">
								<div class="c-label-head c-short">身份证</div>
								<div class="c-label-content c-short">{{holder.id}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="height: 44px"></div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.c-content-header {
		line-height: 44px;
		text-align: center;
		background: #c81623;
		color: #fff;
		border-radius: 10px 50px 0 0;
		margin-left: 15px;
		margin-right: 15px;
		margin-top: 40px;
		width: 50%;
	}
	
	.c-content-inner-header {
		width: 50%;
		line-height: 22px;
		text-align: center;
		background: #c81623;
		color: #fff;
		border-radius: 50px 50px 0 0;
		margin-top: 20px;
		
	}
	
	.c-label.c-last {
		border: none;
		/*margin-top: 15px;*/
	}
	
	.c-label {
		border-bottom: 1px solid #e1e1e1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
		word-break: break-all;
		word-wrap: break-word;
		/*height: 40px;*/
		.c-label-head {
			/*-webkit-box-sizing: border-box;*/
			flex-shrink: 0;
			i {
				margin-right: 5px;
			}
		}
		.c-label-content {
			/*-webkit-box-sizing: border-box;*/
			/*vertical-align: top;*/
			/*margin-left: 10px;*/
			/*flex-wrap: wrap;*/
			font-size: 15px;
			flex-shrink: 1;
			margin-left: 20px;
			text-align: right;
			/*padding-right:40px;*/
		}
	}
	
	.c-content-block.c-inset {
		margin-left: 15px;
		margin-right: 15px;
		/*border-radius: 7px;*/
		-webkit-border-radius: 7px;
		/*box-shadow: 0 1px 4px rgba(0, 0, 0, .3);*/
		position: relative;
		box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
		/*border: 1px solid #bbb;*/
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
		
	}
	
	.c-content-block {
		/*margin-top: 10px;*/
		/*margin: 20px 0;*/
		padding: 0 15px;
		color: #6d6d72;
		box-sizing: border-box;
		.c-content-block-inner {
			/*border-radius: 0 0 7px 7px;*/
			background: #fff;
			padding: 20px 15px;
			margin-left: -15px;
			width: 100%;
			position: relative;
			color: #000;
			.c-item {
				box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
				border-radius: 0 0 7px 7px;
				margin: 0;
				padding: 10px 15px;
				.c-item-first {
					margin-top: 0px;
				}
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
		}
	}
</style>
<script>
    import navbar from './navbar.vue'
    export default{
        name: 'PatentDetail',
        components: {
            navbar
        },
        data(){
            return {
                patent: {},
                enableOtherHolders: true,
                username: '',
                enableOtherInventor: true
            }
        },
        mounted(){
            console.log('mounted', this.patent)
            console.log('mounted', this.patent.other_holders)


        },
        created(){
            console.log('created')
            let routeParam = this.$route.params;
            let self = this;
            this.$ajax.get(config.api.url + '/cs-patents', {
                params: routeParam
            }).then(response => {
                if (response.data) {
                    console.log(response.data)
                    self.patent = response.data[0]
                    this.username = self.patent.username
                    if (self.patent.other_holders) {
                        self.enableOtherHolders = true;
                    } else {
                        self.enableOtherHolders = false;
                    }
                    if (self.patent.other_inventor_names) {
                        self.enableOtherInventor = true
                    } else {
                        self.enableOtherInventor = false
                    }
                }
            })
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            switchUser(){
                this.$router.push('/login')
            }
        },
        filters: {
            holderNumberFilter(value){
                let chNumber = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                return chNumber[value + 2]
            },
            nullFilter(value){
                if (value) {
                    return value
                } else {
                    return '无'
                }
            },
            statusFilter(value){
                if (value) {
                    return value.status
                } else {
                    return '无'
                }
            }
        }

    }
</script>