<template>
	<div class="c-login-container">
		<div class="c-login-title">
			专利查询系统
		</div>
		<form>
			<div class="c-list-block">
				<ul>
					<li class="c-item-content">
						<div class="c-item-inner">
							<div class="c-item-input">
								<input type="text" name="username" placeholder="用户名" v-model="username">
							</div>
						</div>
					</li>
					<li class="c-item-content">
						<div class="c-item-inner c-last">
							<div class="c-item-input">
								<input type="text" name="mobile" placeholder="手机号码" v-model="mobile">
							</div>
						</div>
					</li>
					<li v-if="enableUserErro" class="c-item-content">
						<div class="c-item-inner c-text">
							您输入的用户名或者手机号有误
						</div>
					</li>
					<li v-if="enableServerErro" class="c-item-content">
						<div class="c-item-inner c-text">
							服务器异常
						</div>
					</li>
					<li class="c-item-content">
						<div class="c-item-inner c-last c-button">
							<a href="javascript:void(0)" class="c-item-link c-list-button"
							   @click="login">查&nbsp;
								询</a>
						
						</div>
						<!--<div class="c-item-button">-->
						<!---->
						<!--</div>-->
					
					</li>
				</ul>
			</div>
		
		</form>
	</div>
</template>
<style scoped lang="less">
	.flex-between-align {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-align-items: center;
		align-items: center;
	}
	
	.c-login-container {
		background: #fff;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
		height: 100%;
		position: relative;
		z-index: 1;
		.c-login-title {
			text-align: center;
			font-size: 30px;
			margin-top: 40px;
			letter-spacing: 10px;
		}
		.c-list-block {
			margin: 25px auto;
			/*margin: 35px 0;*/
			font-size: 17px;
			ul {
				background: #fff;
				list-style: none;
				padding: 0;
				margin: 0;
				position: relative;
				li {
					box-sizing: border-box;
					position: relative;
				}
				.c-item-content {
					box-sizing: border-box;
					padding-left: 15px;
					min-height: 44px;
					.flex-between-align;
					position: relative;
					.c-item-inner.c-button.c-last {
						justify-content: center;
						a {
							width: 80%;
							-webkit-border-radius: 50px;
							-moz-border-radius: 50px;
							border-radius: 50px;
							background: -webkit-linear-gradient(left, #ff9000, #ff5000) no-repeat;
							text-align: center;
							color: #fff;
							display: block;
							line-height: 43px;
							text-decoration: none;
						}
						&:after {
							height: 0;
						}
						
					}
					.c-item-inner {
						padding-right: 15px;
						position: relative;
						width: 100%;
						padding-top: 8px;
						padding-bottom: 7px;
						min-height: 44px;
						overflow: hidden;
						.flex-between-align;
						-webkit-align-this: stretch;
						align-this: stretch;
						&:after {
							content: '';
							position: absolute;
							left: 0;
							bottom: 0;
							right: auto;
							top: auto;
							height: 1px;
							width: 100%;
							background-color: #c81623;
							display: block;
							z-index: 15;
						}
						.c-item-input {
							margin-left: 5px;
							width: 100%;
							/*margin-top: -8px;*/
							/*margin-bottom: -7px;*/
							-webkit-flex-shrink: 1;
							flex-shrink: 1;
							input {
								-webkit-appearance: none; //去除浏览器默认样式
								appearance: none;
								box-sizing: border-box;
								border: none;
								background: none;
								border-radius: 0;
								box-shadow: none;
								display: block;
								padding: 0;
								margin: 0;
								width: 100%;
								height: 43px;
								color: #000;
								font-size: 17px;
								outline: 0;
							}
						}
					}
					.c-item-inner.c-text {
						color: red;
						&:after {
							height: 0;
						}
					}
					.c-item-inner.c-last {
						margin-top: 25px;
					}
					
				}
				
			}
			
		}
		
	}
</style>
<script>
    export default{
        name: 'Login',
        data(){
            return {
                username: "",
                mobile: "",
                enableUserErro: false,
                enableServerErro: false,
            }
        },
        methods: {
            login(){
                let self = this
                this.$ajax.get(config.api.url + '/cs-patents', {
                    params: {
                        username: this.username,
                        mobile: this.mobile
                    }
                }).then(function (response) {
                    let data = response.data;
                    console.log('login--data', data)
                    if (data.length > 0) {
                        self.enableUserErro = false;
                        self.$router.push('/patent-index/' + encodeURIComponent(self.username))
                    } else {
                        self.enableUserErro = true;
                        self.enableServerErro = false
                    }

                }).catch(function (error) {
                    console.log(error);
                    self.enableUserErro = false;
                    self.enableServerErro = true
                })
            },

        }
    }
</script>