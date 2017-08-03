<template>
    <div class="c-user-menu-edit">
        <div class="c-header">
            <div class="c-left">
                <span class="c-title">分配权限</span>
            </div>
            <div class="c-right">
                <el-button size="small" class="c-button" @click="cancel"><i class="fa fa-chevron-left"></i>返回列表</el-button>
            </div>
        </div>
        <div class="c-main">
            <div class="c-form">
                <div class="c-form-content">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="所属角色">
                            <el-select v-model="roleIds" multiple @change="changeRole" @visible-change="visibleRoleChange" @remove-tag="removeRoleTag" placeholder="请选择">
                                <el-option v-for="role in roles" :key="role.id" :label="role.description" :value="role.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="界面权限">
                            <el-tree ref="menuTree" :data="menus" node-key="name" :props="menuProps" :default-expand-all="true" show-checkbox :check-strictly="false"></el-tree>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="save">保存提交</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    let Menu = require('../../library/menu')

    export default {
        name: 'TqAdminAuthEdit',
        data () {
            return {
                userId: 0,
                roleIds: [],
                //menuIds: [],
                menuNames: [],
                roles: [],
                menus: [],
                menuNameMap: {},
                menuProps: {
                    children: 'children',
                    label: 'description'
                },
                changeRoleValid: false
            }
        },
        watch: {
            menuNames (val) {
                this.$refs.menuTree.setCheckedKeys(val)
            }
        },
        mounted () {
            this.userId = this.$route.query.user_id

            this.$http.get('/roles').then(rolesRes => {
                this.roles = rolesRes.data
                return this.$http.get('/role-assignments', {
                    params: {
                        user_id: this.userId
                    }
                })
            }).then(assignmentsRes => {
                let roleAssignments = assignmentsRes.data
                if (roleAssignments.length > 0) {
                    for (let roleAssignment of roleAssignments)
                        this.roleIds.push(roleAssignment.role_id)
                }
            })

            let menuIdMap = {}
            this.$http.get('/menus/flat').then(menusRes => {
                let menu = new Menu(menusRes.data)
                this.menus = menu.getTree()
                menuIdMap = menu.getMap('id')
                this.menuNameMap = menu.getMap('name')
                return this.$http.get('/menu-assignments', {
                    params: {
                        user_id: this.userId
                    }
                })
            }).then(assignmentsRes => {
                let menuNames = []
                let menuAssignments = assignmentsRes.data
                if (menuAssignments.length > 0) {
                    for (let menuAssignment of menuAssignments) {
                        if (menuIdMap[menuAssignment.menu_id])
                            menuNames.push(menuIdMap[menuAssignment.menu_id].name)
                    }
                    this.menuNames = menuNames
                }
            })
        },
        methods: {
            save () {
                let checkedKeys = this.$refs.menuTree.getCheckedKeys()
                let menuIds = []
                for (let checkedKey of checkedKeys) {
                    if (4 === checkedKey.split('/').length) {
                        menuIds.push(this.menuNameMap[checkedKey].id)
                    }
                }
                this.$http.post('/menu-assignments/batch', {
                    user_id: this.userId,
                    menu_ids: menuIds
                }).then(menuRes => {
                    console.log(menuRes.data)
                    return this.$http.post('/role-assignments/batch', {
                        user_id: this.userId,
                        role_ids: this.roleIds
                    })
                }).then(roleRes => {
                    console.log(roleRes.data)
                    this.$router.go(-1)
                })
            },
            visibleRoleChange (valid) {
                this.changeRoleValid = valid
            },
            removeRoleTag (tag) {
                this.changeRoleValid = true
            },
            changeRole (val) {
                if (this.changeRoleValid) {
                    this.$http.get('/roles', {
                        params: {
                            id: '(' + val.join() + ')'
                        }
                    }).then(rolesRes => {
                        let menuNames = []
                        for (let role of rolesRes.data) {
                            if (role.menu_names) {
                                for (let menuName of role.menu_names) {
                                    if (-1 === menuNames.indexOf(menuName))
                                        menuNames.push(menuName)
                                }
                            }
                        }
                        this.menuNames = menuNames
                    })
                }
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>