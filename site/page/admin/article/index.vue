<template>
    <div class="c-article-index">
        <el-tabs v-model="activeName" v-if="true">
            <el-tab-pane label="TAB-1" name="first"></el-tab-pane>
            <el-tab-pane label="TAB-2" name="second"></el-tab-pane>
            <el-tab-pane label="TAB-3" name="third"></el-tab-pane>
            <el-tab-pane label="TAB-4" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" @click="create"><i class="fa fa-plus"></i>新增文章</el-button>
            </div>
            <div class="c-right">
                <el-form :inline="true" :model="searcher">
                    <el-form-item>
                        <el-input v-model="searcher.title" size="small" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searcher.category_id" size="small" placeholder="分类">
                            <el-option v-for="category of categories" :label="category.name" :value="category.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="small"><i class="fa fa-search"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="articles" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="article_category_name" label="分类" width="180"></el-table-column>
                <el-table-column prop="title" label="标题" ></el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template scope="scope">
                        {{scope.row.created_at | date-format}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="view" size="small">查看</el-button>
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                </div>
                <div class="c-right">

                    <el-pagination @current-change="changePage" :current-page="currentPage" :page-size="perPage" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searcher: {},
                categories: [],
                articles: [],
                currentPage: 0,
                perPage: 0,
                total: 0,
                activeName: {}
            }
        },
        mounted () {
            this.search(this.$route.params.page)
            //this.$nextTick(function () { })
        },
        beforeRouteUpdate (to, from, next) {
            this.search(to.params.page)
            next()
        },
        methods: {
            search (page) {
                if(!page)
                    page = 1
                this.currentPage = parseInt(page)
                let loading = this.$loading({ target: ".c-main" })
                let vm = this
                co(function* () {
                    if(0 == vm.categories.length) {
                        vm.categories = yield vm.$http.get(config.api.url + "/article-categories").then(response => {
                            return response.data
                        })
                    }
                    let categoryNames = new Map()
                    for (let category of vm.categories) {
                        categoryNames.set(category.id, category.name)
                    }
                    let listData = yield vm.$http.get("/articles", {params: {"page": page}}).then(response => {
                        vm.perPage = parseInt(response.request.getResponseHeader("X-Pagination-Per-Page"))
                        vm.total = parseInt(response.request.getResponseHeader("X-Pagination-Total-Count"))
                        return response.data
                    })
                    let articleData = []
                    for (let article of listData) {
                        article.article_category_name = categoryNames.get(article.article_category_id)
                        articleData.push(article)
                    }
                    vm.articles = articleData
                }).then(() => {
                    loading.close()
                })
            },
            create () {
                this.$router.push("/article/edit")
            },
            view () {
                console.log("查看文章详情")
            },
            modify (id) {
                this.$router.push("/article/edit/" + id)
            },
            changePage (page) {
                this.$router.push("/article/index/" + page)
            }
        }
    }
</script>