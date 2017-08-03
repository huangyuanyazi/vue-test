<template>
	<div>
		<div class="c-nav">
			<div class="c-nav-inner">
				<div class="c-left">
					<div class="c-back"><a href="javascript:void(0)" @click="back" v-if="enableBack"><i
							class="fa fa-angle-left fa-2x"></i></a></div>
				
				</div>
				<transition name="slide-fade">
					<div class="c-center" v-if="enableTitle">{{title}}</div>
				</transition>
				<transition name="slide-fade">
					<div class="c-center c-center-input" v-if="!enableTitle">
						<i class="fa fa-search fa-1x c-search-img"></i>
						<form action="javascript:void(0)">
							<input type="search"
								   autocomplete="off"
								   placeholder="/专利名称关键字"
								   @input="input"
								   @keyup.enter="search"
							>
						</form>
					</div>
				</transition>
				<div class="c-right">
					<a href="javascript:void(0)" @click="openSearch" v-if="enableOpenSearch"><i
							class="fa fa-search fa-1x"></i></a>
					<a href="javascript:void(0)" @click="closeSearch" v-if="enableCloseSearch">取消</a>
					<a href="javascript:void(0)" @click="openUser"><i
							class="fa fa-user-o fa-1x"></i></a>
				</div>
			</div>
		</div>
		<div v-if="enablePopover" class="c-popover">
			<div class="c-angle">
			</div>
			<div class="c-popover-content">
				<div class="c-list-block">
					<ul>
						<li>
							<div class=" c-item-content">
								<div class="c-item-inner c-text">
									欢迎您：
								</div>
							</div>
						</li>
						<li>
							<div class=" c-item-content">
								<div class="c-item-inner c-text">
									{{username}}
								</div>
							</div>
						</li>
						<li>
							<a class=" c-item-content" @click="switchUser" href="javascript:void(0)">
								<div class="c-item-inner c-last">
									切换用户
								</div>
							</a>
						</li>
					
					</ul>
				</div>
			</div>
		</div>
		<transition name="slide-fade">
			<div v-if="enablePopover" class="c-popover-layer" @click="closeLayer"></div>
		</transition>
	</div>
</template>
<style lang="less" scoped>
	.slide-fade-enter-active {
		transition: all .8s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter, .slide-fade-leave-active {
		transform: translateX(40px);
		opacity: 0;
	}
	
	input[type=search] {
		height: 30px;
		padding-left: 30px;
		box-sizing: border-box;
		display: block;
		/*border: #c9c9ce solid 2px;*/
		border: none;
		border-radius: 5px;
		color: #000;
		font-size: 14px;
		background-color: #fff;
	}
	
	input[type=search]::-webkit-input-placeholder {
		/*text-align: center;*/
	}
	
	input[type=search]::-webkit-search-cancel-button {
		margin-right: 10px;
		/*-webkit-appearance: none;*/
		/*display: none;*/
		/*position: relative;*/
		/*height: 20px;*/
		/*width: 20px;*/
		/*border-radius: 50%;*/
		/*!*color:#c81623 ;*!*/
		/*background-color: rgba(0, 0, 0, .4);*/
	}
	
	input[type=search]::-webkit-search-results-button {
		-webkit-appearance: none;
	}
	
	.one-line-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
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
	
	.c-popover-layer {
		position: absolute;
		background: rgba(0, 0, 0, .4);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	
	.c-popover {
		position: absolute;
		top: 54px;
		right: 5px;
		z-index: 2000;
		margin: 0;
		background: rgba(255, 255, 255, .95);
		.c-angle {
			height: 26px;
			width: 26px;
			background: rgba(255, 255, 255, .95);
			transform: rotate(45deg);
			position: absolute;
			right: 7px;
			top: -5px;
			border-radius: 2px;
		}
		.c-popover-content {
			box-sizing: border-box;
			width: 180px;
			background: rgba(255, 255, 255, .95);
			position: absolute;
			right: 0px;
			border-radius: 13px;
			.c-list-block {
				border-radius: 13px;
				font-size: 17px;
				ul {
					border-radius: 13px;
					background: #fff;
					list-style: none;
					padding: 0;
					margin: 0;
					position: relative;
					li {
						box-sizing: border-box;
						position: relative;
						a {
							text-decoration: none;
							&:active {
								transition-duration: 0s;
								-webkit-transition-duration: 0s;
								background-color: #d9d9d9;
							}
						}
						.c-item-content {
							box-sizing: border-box;
							line-height: 44px;
							text-align: center;
							c-item-inner.c-text {
								color: #000;
							}
							.c-item-inner.c-last {
								color: #c81623;
								&:after {
									height: 0;
								}
							}
							.c-item-inner {
								
								&:after {
									content: '';
									position: absolute;
									left: 0;
									bottom: 0;
									right: auto;
									top: auto;
									height: 1px;
									width: 100%;
									background-color: #c8c7cc;
									display: block;
									z-index: 15;
								}
							}
						}
					}
					
				}
			}
		}
	}
	
	.c-nav {
		position: absolute;
		left: 0;
		top: 0;
		background: #c81623;
		color: #ffffff;
		height: 44px;
		width: 100%;
		box-sizing: border-box;
		font-size: 17px;
		margin: 0;
		z-index: 500;
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
		.c-nav-inner {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			padding: 0 8px;
			box-sizing: border-box;
			.flex-between;
			.c-left, .c-center, .c-right {
				.flex-align;
			}
			.c-left, .c-right {
				-webkit-justify-content: flex-start;
				justify-content: flex-start;
				webkit-flex-shrink: 0;
				flex-shrink: 0;
			}
			.c-left {
				width: 70px;
				a {
					color: #ffffff;
					text-decoration: none;
				}
				flex-shrink: 1000;
			}
			
			.c-center {
				font-size: 17px;
				font-weight: 500;
				/*text-align: center;*/
				/*margin: 0;*/
				position: relative;
				overflow: hidden;
				.one-line-ellipsis; //文本不换行
				line-height: 44px;
				-webkit-flex-shrink: 10;
				flex-shrink: 10;
				.c-search-img {
					position: relative;
					left: 25px;
					color: #c81623
				}
				
			}
			.c-center.c-center-input {
				flex-shrink: 0;
				form {
					/*width:100%;*/
				}
				
			}
			.c-right {
				margin-left: 10px;
				/*padding-right: 10px;*/
				width: 70px;
				display: flex;
				flex-shrink: 1;
				align-items: center;
				justify-content: flex-end;
				a {
					color: #ffffff;
					text-decoration: none;
					margin-right: 10px;
				}
			}
		}
	}
</style>
<script>
    export default{
        props: ['enableBack', 'title', 'username', 'enableTitle', 'enableOpenSearch'],
        data(){
            return {
                enablePopover: false,
                enableCloseSearch: false,
            }
        },
        watch: {},
        computed: {},
        methods: {
            back(){
                this.$router.go(-1)
            },
            openSearch()
            {
                this.enableCloseSearch = true;
                this.$emit('openSearch')
            },
            closeSearch()
            {
                this.enableCloseSearch = false;
                this.$emit('closeSearch')
            },
            switchUser()
            {
                this.$router.push('/login')
            },
            openUser(){
                this.enablePopover = true;
            },
            closeLayer(){
                this.enablePopover = false;
            },
            search(){
                this.$emit('search')
            },
            input(event){
                const value = event.target.value;
                this.$emit('input', value)
            }

        }
    }
</script>