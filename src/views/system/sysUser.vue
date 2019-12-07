<template>
    <div>
        <!--操作-->
        <div class="margin-bottom-18">
            <el-row>
                <el-col :span="12">
                    <el-button v-model="dialogTitle" type="primary" @click="onAddData">{{ title.addTxt }}</el-button>
                </el-col>
                <el-col :span="12" align="right">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
                        <el-form-item>
                            <el-input v-model="formInline.name" clearable placeholder="请输入用户姓名"
                                      v-on:keyup.enter.native="onQuery"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
        >
            <el-table-column
                prop="loginName"
                min-width="130"
                label="登录名"
            />
            <el-table-column
                prop="name"
                label="用户姓名"
                min-width="150"
            />
            <!--<el-table-column-->
            <!--prop="password"-->
            <!--label="密码"-->
            <!--/>-->
            <el-table-column
                prop="state"
                label="状态"
                align="center"
                min-width="110"
            >
                <template slot-scope="scope">
                    <span class="stateTrue" v-if="scope.row.state==1">启用</span>
                    <span class="stateFalse" v-if="scope.row.state==0">停用</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="loginTime"
                label="最后登录时间"
                min-width="160"
            />
            <el-table-column
                prop="loginIp"
                label="最后IP"
                min-width="150"
            />
            <el-table-column
                label="设置"
                align="center"
                min-width="150">
                <template slot-scope="scope">
                    <el-button type="default" size="mini" @click="onShowRole(scope.row.id)">{{ title.roleTxt }}
                    </el-button>
                    <el-button type="default" size="mini" @click="onShowModule(scope.row.id)">{{ title.moduleTxt }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
                fixed="right"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button v-model="dialogTitle" type="text" size="small" @click="onEditData(scope.row.id)">{{
                        title.editTxt }}
                    </el-button>
                    <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="margin-top-10 s1-right">
            <el-pagination
                background
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page=" pageIndex"
                :page-sizes="pagingNum"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage"
            >
            </el-pagination>
        </div>
        <sysUserLog :show-dlog="showDlog" ref="sysUserLog" :dialog-title="dialogTitle" @onSysUserLog="getData"
                    :log-id="logId"/>
        <sysUserRoleLog
            :sysUserRoleLog="sysUserRoleLog"
            ref="sysUserRoleLog"
            :dialog-title="dialogTitle"
            :log-id="logId"
            @onSysUserRoleLog="getData">
        </sysUserRoleLog>
        <sysUserModuleLog
            :sysUserModuleLog="sysUserModuleLog"
            ref="sysUserModuleLog"
            :dialog-title="dialogTitle"
            :log-id="logId"
            @onSysUserModuleLog="getData">
        </sysUserModuleLog>
    </div>
</template>

<script>
    // 新增，删除，编辑
    import sysUserLog from './components/sysUser-dialog'
    import sysUserRoleLog from './components/sysUser-role-dialog'
    import sysUserModuleLog from './components/sysUser-module-dialog'
    //引入混入对象
    import addAndDel from '@/views/mixin/addAndDel.js'
    //ajax
    import {moduleAxios} from '@/api/system/module.js'
    import { userDelete, userList } from '../../api/system/module'
    export default {
        name: 'user',
        components: {
            sysUserLog,
            sysUserRoleLog,
            sysUserModuleLog
        },
        mixins: [addAndDel],
        data () {
            return {
                tableData: [],
                sysUserRoleLog: false,
                sysUserModuleLog: false,
                dataForm: [],
                formInline: {
                    name: ''
                },
                selID: [],
                selDisable: false
            }
        },
        methods: {
            // 获取数据
            getTableData () {
                this.loading = true
                userList( {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    name: this.formInline.name
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                        this.loading = false
                    }
                })
            },
            // 查询
            onQuery () {
                this.getTableData();
            },
            //  删除
            onDeleteData (id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   userDelete({
                        id: id
                    }).then(res => {
                        if (res.data.status === 200) {
                            this.loading = false;
                            this.getTableData();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //点击角色
            onShowRole (id) {
                this.dialogTitle = this.title.roleTxt;
                this.logId = id;
                this.sysUserRoleLog = true;
            },
            //点击模块
            onShowModule (id) {
                this.dialogTitle = this.title.moduleTxt;
                this.logId = id;
                this.selDisable = true;
                this.sysUserModuleLog = true;
            },

        }
    }
</script>

<style scoped lang="scss">

</style>
