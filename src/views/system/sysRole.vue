<template>
  <div>
    <div class="margin-bottom-18">
      <el-row>
        <el-col :span="12">
          <el-button v-model="dialogTitle" type="primary" @click="onAddData">{{ title.addTxt }}</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :inline="true" :model="formInline" @submit.native.prevent>
            <el-form-item>
              <el-input
                v-model="formInline.name"
                placeholder="请输入角色编码或名称"
                clearable
                @keyup.enter.native="onSearch"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="roleData"
          border
          size="small"
          style="width:100%"
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="编码" />
          <el-table-column prop="sortNum" label="排序" align="center" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="permissSettings" label="设置" align="center" min-width="60">
            <template slot-scope="scope">
              <!--<el-button type="default" size="small" @click="onShowUser(scope.row.id)" >用户</el-button>-->
              <el-button type="default" size="small" @click="onShowModule(scope.row.id)">模块</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="roleOperation" label="操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="onEditData(scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="margin-top-10 s1-right">
      <el-pagination
        background=""
        :current-page=" pageIndex"
        :page-sizes="pagingNum"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
      />
    </div>
    <sys-role-log
      :show-dlog="showDlog"
      :log-id="logId"
      :dialog-title="dialogTitle"
      @onSysRoleLog="getData"
    />
    <sysRoleModuleLog
      :sys-role-module-log="sysRoleModuleLog"
      :log-id="logId"
      :dialog-title="dialogTitle"
      @onSysRoleModuleLog="getData"
    />
    <sys-role-user-log v-if="sysRoleUserLog" ref="sysRoleUserLog" :dialog-title="dialogTitle" />
  </div>
</template>

<script>
    // 新增，删除，编辑
    import sysRoleLog from './components/sysRole-dialog.vue'
    import sysRoleModuleLog from './components/sysRole-module-dialog'
    import sysRoleUserLog from './components/sysRole-user-dialog.vue'
    // ajax
    import { moduleAxios } from '@/api/system/module.js'
    // 引入混入
    import addAndDel from '@/views/mixin/addAndDel.js'
    import { roleDelete, roleList } from '../../api/system/module'
    export default {
        name: 'SysRole',
        components: {
            sysRoleLog,
            sysRoleModuleLog,
            sysRoleUserLog
        },
        mixins: [addAndDel],
        data() {
            return {
                sysRoleModuleLog: false,
                sysRoleUserLog: false,
                roleData: [],
                formInline: {
                    name: ''
                }
            }
        },
        //  mounted拿到数据可以操作dom，created拿到数据不可以操作dom
        created() {
            this.getTableData()
        },
        methods: {
            // roleData获取数据
            getTableData() {
                this.loading = true
                roleList({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }).then(res => {
                    if (res.data.status === 200) {
                        this.roleData = res.data.res
                        this.totalPage = res.data.count
                        this.loading = false
                    }
                })
            },
            // 删除
            onDeleteData(id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    roleDelete({ id: id }).then(res => {
                        if (res.data.status === 200) {
                            this.getTableData()
                            this.$message({
                                type: 'success',
                                message: '刪除成功！'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 搜索
            onSearch() {
                roleList({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    name: this.formInline.name,
                    code: this.formInline.code
                }).then(res => {
                    if (res.data.status === 200) {
                        this.roleData = res.data.res
                        this.totalPage = res.data.count
                    }
                })
            },
            // 点击模块
            onShowModule(id) {
                this.dialogTitle = this.title.moduleTxt
                this.sysRoleModuleLog = true
                this.logId = id
            }
        }
    }
</script>

<style scoped>
    .butTabSpace {
        top: -5px
    }
</style>
