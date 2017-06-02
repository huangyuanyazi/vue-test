<template>
    <div class="c-article-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" @click="create"><i class="fa fa-plus"></i>新增顶级</el-button>
            </div>
            <div class="c-right">

            </div>
        </div>
        <div class="c-main">
            <el-tree :data="categories" :props="defaultProps" :expand-on-click-node="false" :renderContent="renderContent" class="c-tree"></el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                categories: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        mounted () {

        },
        methods: {
            create () {
                console.log("添加节点")
            },
            renderContent (h, { node, data, store }) {

                return h("span", {"class":"el-tree-node__label-1", style:"vertical-align:middle"}, [
                    h("span", node.label),
                    h("span", {style:"float:right"}, [
                        h("el-button", {attrs: {size: "small"}, on: {click: this.clickHandler}}, "新增子级"),
                        h("el-button", {attrs: {size: "small"}, style:"margin-right:10px"}, "删除")
                    ])
                ])
            },
            handleNodeClick(data) {
                console.log(data);
            },
            clickHandler () {
                console.log("添加子节点")
            }
        }
    }
</script>