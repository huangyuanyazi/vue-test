<template>
    <f7-card >
        <f7-card-content>
            <div class="c-trademark-container">
                <div class="c-trademark-img">
                </div>
                <div class="c-trademark-info">
                    <span>{{trademarkData.trademark_price}}</span>
                    <p>{{trademarkData.trademark_header}}</p>
                    <p>{{trademarkData.trademark_sort}}&nbsp;&nbsp;&nbsp;注册于{{trademarkData.trademark_registDate}}</p>
                    <p style=''>
                        {{trademarkData.trademark_describ}}&nbsp;&nbsp;&nbsp;{{trademarkData.trademark_type}}&nbsp;&nbsp;&nbsp;点击量：{{trademarkData.hot}}
                    </p>
                </div>
            </div>
        </f7-card-content>
        <f7-card-footer>
            {{trademarkData.company}}&nbsp;id:{{trademarkData.id}}
        </f7-card-footer>
    </f7-card>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .c-trademark-container {
        display: flex;
        display: -webkit-flex;
        div.c-trademark-img {
            height: 120px;
            width: 120px;
            background: url("../asset/image/logo.png");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 100%;
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
        methods: {}
    }
</script>