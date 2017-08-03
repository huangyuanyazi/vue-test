<!-- Views-->
<template>
	<!--<div id="patentDetailContainer">-->
	<f7-page no-toolbar name="patent_detail" id='patent_detail'>
		<f7-navbar>
			<f7-nav-left>
				<f7-link icon='icon-back' href="javascript:void(0)" @click="back"></f7-link>
			</f7-nav-left>
			<f7-nav-center>专利详情</f7-nav-center>
			<f7-nav-right>
				<f7-link @click="share" href="javascript:void(0)">分享</f7-link>
			</f7-nav-right>
		</f7-navbar>
		<!--<div id='patent_detail_content'>-->
		<div v-if="isLoading">
		</div>
		<div v-else>
			<f7-block>
				<f7-card>
					<f7-card-header>
						<span>{{patent.name}}</span>
						<span>{{patent.id}}</span>
					</f7-card-header>
					<f7-card-content>
						<p>专利号：{{patent.sn}}
						</p>
						<p>
							{{patent.attributes.type | showFilter('patent', 'type')}}&nbsp;&nbsp; {{patent.attributes.status | showFilter('patent', 'status')}}&nbsp;&nbsp;
							截止{{patent.attributes.deadline}}
						</p>
						<p>
							{{patent.keywords.join()}}
						</p>
					</f7-card-content>
					<f7-card-footer>{{patent.id}}</f7-card-footer>
				</f7-card>
			</f7-block>
			<f7-block>
				<f7-card>
					<f7-card-header>专利详情</f7-card-header>
					<f7-card-content>{{patent.description}}</f7-card-content>
				</f7-card>
			</f7-block>
			<f7-buttons class="c-p-tm-call">
				<f7-button big fill color="red" @click="call(patent)">联系客服</f7-button>
				<f7-button big fill color="green" v-if="seen" @click="openApp">打开应用</f7-button>
			</f7-buttons>
		</div>
	</f7-page>
</template>
<style lang="less" rel="stylesheet/less" scoped>
	.c-p-tm-call {
		position: fixed;
		bottom: 0;
		width: 100%
	}
</style>
<script>
    export default{
        name: 'TqPatentDetail',
        data(){
            return {
                patent: {},
                seen: false,
                isLoading: true
            }
        },
        created(){
            console.log(11111111111)
            let id = this.$route.query.id;
            this.isLoading = true
            this.$f7.showIndicator()
            $$.getJSON(config.api.url + '/items?id=' + id, (data, status, xhr) => {
                this.patent = data[0];
                this.isLoading = false
                this.$f7.hideIndicator()
            })
        },
        beforeCreate(){

        },
        mounted(){
            console.log('mounted--', 333333333)
            console.log(this.patent)

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
                    url: `http://m.tq.com/#page/patent/detail/?id=${id}`,
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
            call(patent){
                this.$f7.alert('客服的相关信息', '淘权网', () => {
                    this.$f7.alert('稍后联系客服...', '淘权网', function () {

                    })
                })
            },
            back(){
                console.log(this.$route.query)
                if (this.$route.query.hasOwnProperty('openMode')) {
                    this.$router.load({url: '/patent/'})
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
                    androidScheme: `taoquanw://taoquanwGoods.com?good=patent&pageId=${id}`,
                    timeout: 600,
                    downloadUrl: 'http://saonianlang.applinzi.com'
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

                    if (!startTime || endTime - startTime >= appOpenConfig.timeout) {
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