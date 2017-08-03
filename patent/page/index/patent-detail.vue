<template>
    <div class="c-patent-detail">
        <div class="c-header">
            <div class="c-left">
                <div class="c-title">专利详情</div>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            
            <p class="c-patent-title">基本信息</p>
            <ul class="c-patent-main">
                <li class="c-patent-list">
                    <div class="c-patent-name">专利号：</div>
                    <div class="c-patent-text" >{{patent.sn}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">专利名称：</div>
                    <div class="c-patent-text" >{{patent.name}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">申请状态：</div>
                    <div class="c-patent-text" >{{patent.payment_status_id}}</div>
                </li>
            </ul>
            <p class="c-patent-title">联系方式</p>
            <ul class="c-patent-main">
                <li class="c-patent-list">
                    <div class="c-patent-name">联系人姓名：</div>
                    <div class="c-patent-text" >{{patent.contact}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">联系人手机：</div>
                    <div class="c-patent-text" >{{patent.mobile}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">证书接收地址：</div>
                    <div class="c-patent-text" >{{patent.address}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">邮箱：</div>
                    <div class="c-patent-text" >{{patent.email}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">微信号：</div>
                    <div class="c-patent-text" >{{patent.weixin}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">QQ：</div>
                    <div class="c-patent-text" >{{patent.qq}}</div>
                </li>
            </ul>
            <p class="c-patent-title">发明人</p>
            <ul class="c-patent-main">
                <li class="c-patent-list">
                    <div class="c-patent-name">第一发明人姓名：</div>
                    <div class="c-patent-text" >{{patent.first_inventor_name}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">第一发明人身份证号：</div>
                    <div class="c-patent-text" >{{patent.first_inventor_id}}</div>
                </li>
                <li class="c-patent-list">
                    <div class="c-patent-name">其它发明人姓名：</div>
                    <div class="c-patent-text" >{{patent.other_inventor_names}}</div>
                </li>
                <li class="c-patent-list" >
                    <p class="c-list-title" >第一专利权人</p>
                    <ul class="c-patent-main c-list-main">
                        <li class="c-patent-list">
                            <div class="c-patent-name">姓名：</div>
                            <div class="c-patent-text" >{{patent.first_holder_name}}</div>
                        </li>
                        <li class="c-patent-list">
                            <div class="c-patent-name">身份证号：</div>
                            <div class="c-patent-text" >{{patent.first_holder_id}}</div>
                        </li>
                        <li class="c-patent-list">
                            <div class="c-patent-name">地址：</div>
                            <div class="c-patent-text" >{{patent.first_holder_address}}</div>
                        </li>
                        <li class="c-patent-list">
                            <div class="c-patent-name">邮编：</div>
                            <div class="c-patent-text" >{{patent.first_holder_zip_code}}</div>
                        </li>
                    </ul> 
                </li>
                <li class="c-patent-list" v-for="(item,index) in patent.other_holders">
                    <p class="c-list-title" >第{{chineseNum(index+2)}}专利权人</p>
                    <ul class="c-patent-main c-list-main">
                        <li class="c-patent-list" >
                            <div class="c-patent-name">姓名：</div>
                            <div class="c-patent-text" >{{item.name}}</div>
                        </li>
                        <li class="c-patent-list">
                            <div class="c-patent-name">身份证号：</div>
                            <div class="c-patent-text" >{{item.id}}</div>
                        </li>
                    </ul> 
                </li> 
            </ul>
            <p class="c-patent-title">申请进度</p>
            <el-steps :space="80" direction="vertical" :active="patent.payment_status_id" style="padding:20px 0 20px 16% ">
                <el-step title="等待申请费" description="专利文件专利局已经受理，等待我方缴纳申请费，我方会及时安排缴费，请耐心等待。"></el-step>
                <el-step title="等待提案" description="申请文件已经缴纳申请费，开始等待专利局分配审查员审查。"></el-step>
                <el-step title="分类待提取" description="专利申请文件已经完成专业领域分类，等待审查员接受案件。"></el-step>
            </el-steps>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqPatentDetail',
        data () {
            return {
                patent: {
                    id: '',
                    name: '',
                    sn: ''
                }
            }
        },
        mounted () {
            let id = this.$route.params.id
            this.$http.get('/cs-patents/' + id).then(res => {
                this.patent = res.data
            })
        },
        methods: {
            cancel () {
                this.$router.go(-1)
            },
            chineseNum (n) {
                var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
                var s = '';
                var n = '' + n; // 数字转为字符串
                for (var i = 0; i < n.length; i++) {
                    s += cnum[parseInt(n.charAt(i))];
                }
                if (s.length == 2) { // 两位数的时候
                    // 如果个位数是0的时候，令改成十
                    if (s.charAt(1) == cnum[0]) {
                        s = s.charAt(0) + cnum[10];
                        // 如果是一十改成十
                        if (s == cnum[1] + cnum[10]) {
                            s = cnum[10]
                        }
                    } else if (s.charAt(0) == cnum[1]) {
                        // 如果十位数是一的话改成十
                        s = cnum[10] + s.charAt(1);
                    }
                }
                console.log(s)
                return s;
            },
        },
    }
</script>

<style lang="less">
    .c-patent-title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #f1f1f1;
        text-indent: 2em;
    }
    .c-patent-main{
        width: 100%;
        padding: 20px 0;
        .c-patent-list{
            width: 100%;
            // height: 40px;
            overflow: hidden;
            line-height: 40px;
            .c-patent-name{
                width: 20%;
                height: 100%;
                float: left;
                text-align: right;
            }
            .c-patent-text{
                float: left;
                width: 79%;
                height: 100%;
                margin-left: 1%;
            }
            .c-list-title{
                width: 20%;
                text-align: right;
                font-weight: bold;
                font-size: 14px;
                margin-top: 10px;
            }
            .c-list-main{
                width: 100%;
                padding: 0;
            }
        }
    }
    .c-form-item-label{
        width: 200px;
    }
    .c-form-item-content{
        float: left;
        margin-left: 10px;
    }
</style>