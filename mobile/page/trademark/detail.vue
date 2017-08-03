<!-- Views-->
<template>
	<f7-page no-toolbar name="trademark_detail" id='trademark_detail'>
		<f7-navbar>
			<f7-nav-left>
				<f7-link icon='icon-back' @click="back" href="javascript:void(0)"></f7-link>
			</f7-nav-left>
			<f7-nav-center>商标详情</f7-nav-center>
			<f7-nav-right>
				<f7-link @click="share" href="javascript:void(0)">分享</f7-link>
			</f7-nav-right>
		</f7-navbar>
		<f7-block>
			<f7-card>
				<f7-card-content>
					<img :src="imgResource">
				</f7-card-content>
			</f7-card>
		</f7-block>
		<f7-block>
			<f7-card>
				<f7-card-header>
					{{trademark.name}}
				</f7-card-header>
				<f7-card-content>
					<span>{{trademark.id}}</span>
					<p>{{trademark.name}}
					</p>
					<p>{{product}}&nbsp;&nbsp; 注册于{{regDate}}
					</p>
					<p>
						{{trademark.description}}
					</p>
				</f7-card-content>
			</f7-card>
		</f7-block>
		
		<f7-block>
			<f7-card>
				<f7-card-header>
					商标描述
				</f7-card-header>
				<f7-card-content>
					{{trademark.description}}
				</f7-card-content>
			</f7-card>
		</f7-block>
		<f7-buttons class="c-p-tm-call">
			<f7-button big fill color="red" @click="call(trademark)">联系客服</f7-button>
			<f7-button big fill color="green" v-if="seen" @click="openApp">打开应用</f7-button>
		</f7-buttons>
	</f7-page>
</template>
<style rel="stylesheet/less" lang="less" scoped>
	img {
		height: 150px;
		width: 100%;
		/*background: url("../../asset/image/logo.png");*/
		/*background-repeat: no-repeat;*/
		/*background-position: 100%;*/
		/*background-size: contain;*/
	}
	
	#trademark_detail_content {
		padding-bottom: 80px;
		span {
			float: right;
		}
	}
	
	.c-p-tm-call {
		position: fixed;
		bottom: 0;
		width: 100%
	}
</style>
<script>
    export default{
        name: 'TqTrademarkDetail',
        data(){
            return {
                trademark: "",
                seen: false,
                regDate: "",
                product: "",
                imgResource: "",
                type: ""

            }
        },
        created(){
//            console.log(page.url)
//            console.log(this.url)
            let id = this.$route.query.id;
            $$.getJSON(config.api.url + '/items/?id=' + id, (data, status, xhr) => {
                this.trademark = data
            })
            let attributesObj = JSON.parse(this.trademark.attributes)
            let typeId = attributesObj.type
            this.imgResource = 'http://img.tqtest.com' + attributesObj.images[0]
            this.type = typeId == 0 ? '文字商标' : '图形商标'
            this.regDate = attributesObj.regDate
            this.product = attributesObj.product;
        },
        mounted(){
            //当前页的链接地址
            let url = window.location.href;
            let file = url.indexOf('file');
            if (file == 0) {
                // $$('#sharePatentDetail').text('分享')
                this.seen = false
            } else {
                this.seen = true
            }
        },
        methods: {
            share(){
                /**
                 *
                 * @type {{message: 分享链接的描述性文字, url: 分享的链接}}
                 */
                let id = this.$route.query.id
                let options = {
                    message: '淘权网商品详情', // not supported on some apps (Facebook, Instagram)
                    // subject: 'the subject', // fi. for email
                    // files: ['', ''], // an array of filenames either locally or remotely
                    url: `http://192.168.1.126:9097/#/trademark/detail/?id=${id}`,
                    // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                }
                /**
                 *调用成功的回调函数
                 */
                let onSuccess = function (result) {
                    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                }
                /**
                 *调用失败的回调函数
                 */
                let onError = function (msg) {
                    console.log("Sharing failed with message: " + msg);
                }
                //触发分享方法
                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
            },
            call(trademark){
                this.$f7.alert(trademark.name)
            },
            back(){
                console.log(this.$route.query)
                if (this.$route.query.hasOwnProperty('openMode')) {
                    this.$router.load({url: '/trademark/'})
                } else {
                    this.$router.back()
                }
            },
            openApp(){
                //浏览器用于 HTTP 请求的用户代理头的值.用于判断从什么系统的浏览器打开的本页面
                let ua = navigator.userAgent.toLowerCase();
                //用于销毁timeout
                let timeoutMethod;
                let id = this.$route.query.id;
                /**
                 * 打开app或者下载链接的一些配置文件
                 * @type {{iosScheme: ios的应用打开接口, androidScheme: android的应用打开接口, timeout: 延迟时间, downloadUrl: 下载链接}}
                 */
                let appOpenConfig = {
                    iosScheme: 'will://',
                    androidScheme: `taoquanw://taoquanwGoods.com?good=trademark&pageId=${id}`,
                    timeout: 600,
                    downloadUrl: 'https://www.baidu.com'
                };
                //延迟的开始时间
                let startTime = Date.now();
                /**
                 * 预装了本应用时打开应用
                 */
                if (ua.indexOf('os') > 0) {
                    window.location = appOpenConfig.iosScheme
                } else {
                    window.location = appOpenConfig.androidScheme
                }
                /**
                 * 没有装本应用跳转至下载
                 */
                timeoutMethod = setTimeout(function () {
                    let endTime = Date.now();

                    if (!startTime || endTime - startTime > appOpenConfig.timeout + 200) {
                        window.location = appOpenConfig.downloadUrl;
                    }

                }, appOpenConfig.timeout);
                /**
                 * 销毁timeout方法
                 */
                window.onblur = function () {
                    clearTimeout(timeoutMethod);
                }
            }
        }
    }
</script>
