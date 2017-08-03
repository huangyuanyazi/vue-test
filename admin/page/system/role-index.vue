<template>
    <div class="c-role-index">
        <div class="c-header">
            <div class="c-left">
                <el-button type="primary" size="small" class="c-button" @click="create"><i class="fa fa-plus"></i>新增角色</el-button>
            </div>
        </div>
        <div class="c-main">
            <el-table :data="roles" class="c-grid">
                <el-table-column fixed type="selection" width="46"></el-table-column>
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="type_name" label="类型" width="180">
                    <template scope="scope">
                        {{types[scope.row.type]}}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <!--
                        <el-button type="text" @click="view(scope.row.id)" size="small">查看</el-button>
                        -->
                        <el-button type="text" @click="modify(scope.row.id)" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="c-grid-footer">
                <div class="c-left">
                    <!--
                    <span class="c-label">批量操作</span>
                    <el-button size="small"><i class="fa fa-remove"></i>删除</el-button>
                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TqRoleIndex',
        data () {
            return {
                roles: null,
                types: {1: '后台角色', 2: '店铺角色'}
            }
        },
        activated () {
            this.search()
        },
        methods: {
            search () {
                let loading = this.$loading({ target: '.c-main' })
                this.$http.get('/roles').then(rolesRes => {
                    this.roles = rolesRes.data
                    loading.close()
                }).catch(rolesErr => {
                    //console.log(rolesErr.response)
                })
            },
            create () {
                this.$router.push('/system/role/create')
            },
            view (id) {

            },
            modify (id) {
                this.$router.push({ path: '/system/role/update', query: { id }})
            }
        }
    }
</script>