<template>
	<!--@click.native="linkToDetail"-->
	<f7-card>
		<f7-card-header>
			<span> {{patentData.name}}</span>
			<span>{{patentData.price}}</span>
		</f7-card-header>
		<f7-card-content>
			<p>{{patentData.description}}
			</p>
			<p>
				{{patentData.attributes.type | showFilter('patent', 'type')}}&nbsp;{{patentData.attributes.status|showFilter('patent','status')}}
			</p>
			<p>
				发布时间：{{patentData.shelved_at}}&nbsp;点击量：{{patentData.follow}}</p>
		</f7-card-content>
		<f7-card-footer>
			id:{{patentData.id}}
		</f7-card-footer>
	</f7-card>
</template>
<style lang="less" rel="stylesheet/less" scoped>

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
        data(){
            return {
                type: "",
                status: ""
            }
        },
        props: ['patentData'],
        methods: {
            linkToDetail(){
            }
        },
        mounted(){
//            console.log('patentList--Mounted')
////
        },
        created(){
            console.log('patentList--Created')
        },
    }
</script>