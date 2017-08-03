/**
 * 专利查询登录
 * Created by Wangxy on 2017/6/13.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import httpRequest from 'library/http-request'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import 'asset/style/login.less'

Vue.use(ElementUI)

const vm = new Vue({
    el: '#app',
    
    data: {
        ruleForm: {
            username: '',
            mobile: '',
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 35, message: '长度在 2 到 15 个字符', trigger: 'blur' }
            ],
            mobile: [
                
                // { required: true, message: '请输入手机号码', trigger: 'blur' },
                // { type: 'number', message: '手机号码必须为11位的数字', trigger: 'blur' }
            ],
        }
    },
    created(){
         this.rules.mobile[0]={validator:this.checkMobile, required: true, trigger: 'blur' }
    },
    methods: {
        login() {
            httpRequest.post(config.patent.url + '/login', {
                username: this.ruleForm.username,
                mobile: this.ruleForm.mobile
            }).then(loginRes => {
                location.href = '/'
            }).catch(loginErr => {
                this.errors = loginErr.response.data
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.open();
                    this.login();
                }else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        open() {
            this.$alert('登录成功', '登录', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        },
        checkMobile(rule, value, callback){
            var regPhone=/^1[34578]\d{9}$/;
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }
            console.log(value)
            setTimeout(() => {
                
                if (regPhone.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入11位手机号码'));
                  
                }
                
            }, 1000);
            
        }
    }
})