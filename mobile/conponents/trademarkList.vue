<template>
	<f7-card>
		<f7-card-content>
			<div class="c-trademark-container">
				<img :src="trademarkData.images">
				<div class="c-trademark-info">
					<span>{{trademarkData.price}}</span>
					<p>{{trademarkData.name}}</p>
					<p>{{trademarkData.product}}</p>
					<p>注册于{{trademarkData.attributes.regDate}}</p>
					<p style=''>
						{{trademarkData.description}}&nbsp;&nbsp;&nbsp;{{trademarkData.attributes.type | showFilter('trademark')}}&nbsp;&nbsp;&nbsp;点击量：{{trademarkData.follow}}
					</p>
				</div>
			</div>
		</f7-card-content>
		<f7-card-footer>
			id:{{trademarkData.id}}
		</f7-card-footer>
	</f7-card>
</template>
<style lang="less" rel="stylesheet/less" scoped>
	.c-trademark-container {
		display: flex;
		display: -webkit-flex;
		img {
			height: 120px;
			width: 120px;
			/*background: url("../asset/image/logo.png");*/
			/*background-repeat: no-repeat;*/
			/*background-size: contain;*/
			/*background-position: 100%;*/
		}
		div.c-trademark-info {
			padding-left: 10px;
			flex: 1;
			span {
				float: right;
			}
			p:last-child {
				position: absolute;
				bottom: 0;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 60%;
			}
		}
	}
</style>
<script>
    export default{
//        props: {
//            patentData:{
//                type:Object,
//				default:function () {
//					return patentData
//                }
//			}
////            //prop验证
////            patentData: {
////                type: Object,
////                default() {
////                    return {}
////                }
////            },
//        }
        props: ['trademarkData'],
        methods: {},
        data(){
            return {
                imgResource: "",
            }
        },
        created(){
//            console.log(this.trademarkData)
//            this.imgResource = 'http://img.tqtest.com' + attributesObj.images[0]
        }

    }
</script>