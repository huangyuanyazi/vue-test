<template>
    <div class="c-article-edit">
        <div class="c-header">
            <div class="c-left">
                <span>{{0 == id ? "新增" : "修改"}}文章</span>
                <el-button size="small" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" :model="article" label-width="80px">
                        <el-form-item label="所属分类">
                            <el-select v-model="article.article_category_id" placeholder="请选择分类">
                                <el-option v-for="category of categories" :label="category.name" :value="category.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="article.title"></el-input>
                        </el-form-item>
                        <el-form-item label="正文内容" class="c-editor-wrap">
                            <!--
                            <el-input type="textarea" v-model="article.content"></el-input>
                            -->

                            <tq-editor v-model="article.content" image-upload-url="11111"></tq-editor>
                        </el-form-item>
                        <el-form-item label="关键词">
                            <el-input v-model="keywords"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="save">保存提交</el-button>
                            <el-button @click="cancel">取消</el-button>
                            <el-button @click="validate">执行验证</el-button>
                            <el-button @click="editorHtml">查看编辑器HTML</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    //import Validation from "validation/libs/validation"
    export default {
        data () {
            return {
                id: 0,
                article: {
                    article_category_id: "",
                    content: "dsdsfd"
                },
                categories: [],
                keywords: "",

                //editIndex: 0
                /*
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: "no" },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: "no" }
                    ]
                }
                */
            }
        },
        watch: {

        },
        mounted () {
            let loading = this.$loading({ target: ".c-main" })
            let vm = this
            /*
             toolbar: [
             [{"font": ["宋体", false, "仿宋", "楷体", "Georgia", "Helvetica"]}, {"size": ["10px", false, "14px", "16px", "24px", "32px"]}],
             ["bold", "italic", "underline", "strike"],
             [{"color": []}, {"background": []}],
             [{"script": "sub"}, {"script": "super"}],
             [{"header": 1}, {"header": 2}],
             ["blockquote", "code-block"],
             [{"list": "ordered"}, {"list": "bullet"}],
             [{"indent": "-1"}, {"indent": "+1"}],
             [{"direction": "rtl"}, {"align": []}],
             ["link", "image", "video"],
             ["formula"],
             ["clean"]
             ]
             */
            co(function* () {
                vm.categories = yield vm.$http.get("/article-categories").then(response => {
                     return response.data
                })
                if (vm.$route.params.id > 0) {
                    vm.id = vm.$route.params.id
                    vm.article = yield vm.$http.get("/articles/" + vm.id).then(response => {
                        return response.data
                    })
                    vm.keywords = JSON.parse(vm.article.keywords).toString().replace(/,/g, " ")
                }
            }).then(function () {
                loading.close()
            })
        },
        methods: {
            save () {
                /*
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                return false
                */
                this.article.keywords = JSON.stringify(this.keywords.split(" "))
                if(this.id > 0) {
                    this.$http.put("/articles/" + this.id, this.article).then(response => {
                        this.$router.go(-1)
                    })
                } else {
                    this.$http.post("/articles", this.article).then(response => {
                        this.$router.go(-1)
                    })
                }
            },
            cancel () {
                this.$router.go(-1)
            },
            validate () {
                /*
                let vData = {
                    article_category_id: "2",
                    title: "这是一个标题",
                    content: "<p>内容对对对</p>",
                    keywords: "好的"
                }
                let vLabels = {
                    article_category_id: "文章分类",
                    title: "标题",
                    content: "正文",
                    keywords: "关键词"
                }

                let v = new Validation("Article", null, vData, vLabels)

                co(v.validate()).then(result => {
                    console.log(result)
                }).catch(error => {
                    console.log(error)
                })
                 */
            },
            editorHtml () {
                console.log(this.article.content)
            }
        }
    }
</script>

<style>



</style>