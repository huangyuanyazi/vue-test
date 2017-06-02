<template>
    <!--@click.native="linkToDetail"-->
    <f7-card >
        <f7-card-header>
            <span> {{patentData.patent_header}}</span>
            <span>
						{{patentData.patent_price}}
					</span>
        </f7-card-header>
        <f7-card-content>
            <p>{{patentData.patent_describ}}
            </p>
            <p>
                {{patentData.patent_type}}&nbsp;{{patentData.patent_status}}
            </p>
            <p>
                发布时间：{{patentData.patent_releaseTime}}&nbsp;点击量：{{patentData.patent_hot}}</p>
        </f7-card-content>
        <f7-card-footer>
            {{patentData.company}}&nbsp;id:{{patentData.id}}
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
        props: ['patentData'],
        methods: {
            linkToDetail(){
            }
        }
    }
</script>